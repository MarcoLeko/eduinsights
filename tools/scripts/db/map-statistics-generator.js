"use strict";
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const fetch = require("node-fetch");

// Paste the url into line 48 in the fetch argument
// Example statistics url from UNESCO: Get proportion of primary schools with access to internet for pedagogical purposes (%)
// https://api.uis.unesco.org/sdmx/data/SDG4/SCH.PT.L1._T._T._T._T.INST_T._Z._T._Z.NET_PP._T._T._T._Z._Z._Z.?startPeriod=2018&endPeriod=2018&format=sdmx-json&subscription-key=*
(async function () {
  const UNESCOSubscriptionKey = process.env.UNESCO_DEVELOPER_API_KEY,
    outputPath = path.join(__dirname, "output"),
    tempPath = path.join(__dirname, "temp"),
    resApiFromCountryCodeToName =
      "https://restcountries.eu/rest/v2/alpha?codes=",
    notMatchingCountries = [],
    UNESCORegions = new Map(),
    UNESCOCountries = [],
    log = console.log;

  function getUnescoStatisticsEntityByIndex(i, json) {
    return json.dataSets[0].series[`0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:${i}`]
      .observations["0"][0];
  }

  try {
    let UNESCOStatisticsJSON,
      countriesGeoJSON,
      UNESCOCodeListJSON,
      UNESCOHierarchicalCodeListJSON;

    if (!fs.existsSync(tempPath)) {
      fs.mkdirSync(tempPath);
    }

    const responseHierarchicalCodeList = await fetch(
      "https://api.uis.unesco.org/sdmx/hierarchicalcodelist/UNESCO/all/latest?format=sdmx-json&subscription-key=" +
        UNESCOSubscriptionKey
    );
    UNESCOHierarchicalCodeListJSON = await responseHierarchicalCodeList.json();
    fs.writeFileSync(
      path.join(tempPath, "unesco-hierarchical-code-list.json"),
      JSON.stringify(UNESCOHierarchicalCodeListJSON)
    );

    const responseCodeList = await fetch(
      "https://api.uis.unesco.org/sdmx/codelist/UNESCO/CL_AREA/latest?format=sdmx-json&subscription-key=" +
        UNESCOSubscriptionKey
    );
    UNESCOCodeListJSON = await responseCodeList.json();
    fs.writeFileSync(
      path.join(tempPath, "unesco-code-list.json"),
      JSON.stringify(UNESCOCodeListJSON)
    );

    const responseCountriesGeoJSON = await fetch(
      "https://datahub.io/core/geo-countries/r/countries.geojson"
    );
    countriesGeoJSON = await responseCountriesGeoJSON.json();
    fs.writeFileSync(
      path.join(tempPath, "countries.geojson"),
      JSON.stringify(countriesGeoJSON)
    );

    const responseUnescoStatistics = await fetch(
      "https://api.uis.unesco.org/sdmx/data/SDG4/SCH.PT.L1._T._T._T._T.INST_T._Z._T._Z.NET_PP._T._T._T._Z._Z._Z.?startPeriod=2018&endPeriod=2018&format=sdmx-json&subscription-key=" +
        UNESCOSubscriptionKey
    );
    UNESCOStatisticsJSON = await responseUnescoStatistics.json();
    fs.writeFileSync(
      path.join(tempPath, "unesco-statistics.json"),
      JSON.stringify(UNESCOStatisticsJSON)
    );

    const availableCountriesStatistics = UNESCOStatisticsJSON.structure.dimensions.series.find(
      (data) => data.id === "REF_AREA"
    );

    const typeOfEvaluation = UNESCOStatisticsJSON.structure.dimensions.series.find(
      (data) => data.id === "INFRASTR"
    );

    availableCountriesStatistics.values.forEach((statisticsCountries, i) =>
      countriesGeoJSON.features.forEach((geoJSONCountries) => {
        if (geoJSONCountries.properties.ADMIN === statisticsCountries.name) {
          UNESCOCountries.push(statisticsCountries.name);
          log(
            `Found matched contries within geoJSON/statistics sheet: ${chalk.green(
              geoJSONCountries.properties.ADMIN
            )}`
          );
        } else {
          if (
            !notMatchingCountries.includes(statisticsCountries.name) &&
            /^[a-z]+_[a-z]+$/i.test(availableCountriesStatistics.values[i].id)
          ) {
            notMatchingCountries.push(statisticsCountries.name);
          }
        }
      })
    );

    notMatchingCountries.forEach((c) => {
      log(
        `Could not found values matched contries within geoJSON/statistics sheet: ${chalk.red.bold(
          c
        )}`
      );
      UNESCOCodeListJSON.Codelist[0].items.forEach((unR) => {
        if (c === unR.names[0].value) {
          UNESCORegions.set(unR.id, []);
        }
      });
    });

    for (const r of UNESCORegions.keys()) {
      log("UNESCO region is: " + chalk.bold.underline(r));

      for (const list of UNESCOHierarchicalCodeListJSON.HierarchicalCodelist) {
        for (const entity of list.hierarchies) {
          if (r === entity.id) {
            for (const sub of entity.codes[0].codes) {
              try {
                const response = await fetch(
                  resApiFromCountryCodeToName + sub.id
                );
                const result = await response.json();
                log(
                  `Id: ${chalk.yellow.bold(sub.id)} Name: ${chalk.magenta(
                    result[0].name
                  )}`
                );
                UNESCORegions.get(r).push(result[0].name);
              } catch (e) {
                log(
                  `Could not fetch country name for id: ${chalk.red.bold(
                    sub.id
                  )} ` + e
                );
              }
            }
          }
        }
      }
    }

    const resultArrayWithCountryMatches = UNESCOCountries.reduce(
      (acc, curr) => {
        for (const geo of countriesGeoJSON.features) {
          if (geo.properties.ADMIN === curr) {
            const valueIndex = availableCountriesStatistics.values.findIndex(
              (country) => country.name === curr
            );
            const value = Math.round(
              Number(
                getUnescoStatisticsEntityByIndex(
                  valueIndex,
                  UNESCOStatisticsJSON
                )
              )
            );
            const geoJSONIndex = countriesGeoJSON.features.findIndex(
              (obj) => obj.properties.ADMIN === curr
            );
            const { properties } = countriesGeoJSON.features[geoJSONIndex];
            delete properties.ADMIN;
            delete properties["ISO_A3"];
            Object.assign(properties, { name: curr, value });
            acc.push(countriesGeoJSON.features[geoJSONIndex]);
            return acc;
          }
        }
      },
      []
    );

    const resultArrayWithRegionMatches = [];

    for (const [key, value] of UNESCORegions.entries()) {
      const statisticIndex = availableCountriesStatistics.values.findIndex(
        (obj) => obj.id === key
      );

      for (const c of value) {
        for (const geo of countriesGeoJSON.features) {
          // check if the country has its own statistics as it is higher prioritized
          if (geo.properties.ADMIN === c && !UNESCOCountries.includes(c)) {
            const value = Math.round(
              Number(
                getUnescoStatisticsEntityByIndex(
                  statisticIndex,
                  UNESCOStatisticsJSON
                )
              )
            );
            const geoJSONIndex = countriesGeoJSON.features.findIndex(
              (obj) => obj.properties.ADMIN === c
            );
            const { properties } = countriesGeoJSON.features[geoJSONIndex];
            delete properties.ADMIN;
            delete properties["ISO_A3"];
            Object.assign(properties, { name: c, value });
            resultArrayWithRegionMatches.push(
              countriesGeoJSON.features[geoJSONIndex]
            );
          }
        }
      }
    }

    const output = {
      type: "FeatureCollection",
      id: typeOfEvaluation.values[0].name,
      features: resultArrayWithCountryMatches.concat(
        resultArrayWithRegionMatches
      ),
    };

    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath);
    }

    fs.writeFileSync(
      path.join(outputPath, "output.json"),
      JSON.stringify(output)
    );
    log(
      chalk.bold(
        "Outputfile generated at: " + chalk.green.underline(outputPath)
      )
    );
  } catch (e) {
    log(chalk.bold.red("Oooops! An error occured " + e));
    process.exit(1);
  }
})();
