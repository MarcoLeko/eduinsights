"use strict";

const countries = require("i18n-iso-countries");
const chalk = require("chalk");
const path = require("path");
const {
  fetchGeoCountriesPolygons,
  fetchUnescoStatistics,
  writeToFileSync,
  fetchUnescoHierarchicalCodeList,
  ensureDirectory,
} = require("./map-statistics-generator.service");

const outputPath = path.join(__dirname, "output"),
  tempPath = path.join(__dirname, "temp"),
  unescoRegions = new Map(),
  resultArrayWithCountryMatches = [],
  log = console.log;

// Paste the url into line 48 in the fetch argument
// Example statistics url from UNESCO: Get proportion of primary schools with access to internet for pedagogical purposes (%)
// https://api.uis.unesco.org/sdmx/data/SDG4/SCH.PT.L1._T._T._T._T.INST_T._Z._T._Z.NET_PP._T._T._T._Z._Z._Z.?startPeriod=2018&endPeriod=2018&format=sdmx-json&subscription-key=*

function getUnescoStatisticsEntityByIndex(i, json) {
  return json.dataSets[0].series[`0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:${i}`]
    .observations["0"][0];
}

function matchUnescoCountriesWithGeoJsonPolygon(
  countriesGeoJson,
  availableCountriesStatistics,
  unescoStatisticsJson
) {
  for (const geoJsonCountry of countriesGeoJson.features) {
    for (const [
      index,
      statisticsCountry,
    ] of availableCountriesStatistics.values.entries()) {
      const geoJsonCountryCodeAlpha2 = countries.alpha3ToAlpha2(
        geoJsonCountry.properties.ISO_A3
      );
      const statisticsCountryCodeAlpha3 = countries.alpha2ToAlpha3(
        statisticsCountry.id
      );

      if (geoJsonCountryCodeAlpha2 === statisticsCountry.id) {
        const value = getUnescoStatisticsEntityByIndex(
          index,
          unescoStatisticsJson
        );

        resultArrayWithCountryMatches.push({
          type: geoJsonCountry.type,
          properties: {
            name: geoJsonCountry.properties.ADMIN,
            id: statisticsCountry.id,
            value: Math.round(Number(value)),
          },
          geometry: geoJsonCountry.geometry,
        });

        log(
          `Found matching geoJson polygon for country: ${chalk.green(
            statisticsCountry.name
          )} with value: ${chalk.green.bold.underline(value)}`
        );
      } else {
        if (
          !unescoRegions.has(statisticsCountry.id) &&
          !countriesGeoJson.features.includes(statisticsCountryCodeAlpha3) &&
          !statisticsCountryCodeAlpha3
        ) {
          unescoRegions.set(statisticsCountry.id, []);
          log(
            `Could not find GeoJson polygon for area: ${chalk.red.bold(
              statisticsCountry.id
            )}`
          );
        }
      }
    }
  }
}

async function matchUnescoRegionsWithGeoJsonPolygon(
  unescoHierarchicalCodeListJson,
  availableCountriesStatistics,
  unescoStatisticsJson,
  countriesGeoJson
) {
  for await (const region of unescoRegions.keys()) {
    log("UNESCO region is: " + chalk.bold.underline(region));

    for await (const list of unescoHierarchicalCodeListJson.HierarchicalCodelist) {
      for await (const entity of list.hierarchies) {
        if (region === entity.id) {
          for await (const countryWithinRegion of entity.codes[0].codes) {
            if (
              !resultArrayWithCountryMatches.some(
                (country) => countryWithinRegion.id === country.properties.id
              )
            ) {
              const indexOfRegionInUnescoStatistic = availableCountriesStatistics.values.findIndex(
                (statistic) => statistic.id === region
              );

              const value = getUnescoStatisticsEntityByIndex(
                indexOfRegionInUnescoStatistic,
                unescoStatisticsJson
              );

              const geoJsonCountry = countriesGeoJson.features.find(
                (geoJSONCountry) =>
                  countries.alpha3ToAlpha2(geoJSONCountry.properties.ISO_A3) ===
                  countryWithinRegion.id
              );

              if (!geoJsonCountry) {
                continue;
              }

              resultArrayWithCountryMatches.push({
                type: geoJsonCountry.type,
                properties: {
                  name: geoJsonCountry.properties.ADMIN,
                  id: countryWithinRegion.id,
                  value: Math.round(Number(value)),
                },
                geometry: geoJsonCountry.geometry,
              });

              log(
                `Found matching geoJson polygon for country: ${chalk.blue(
                  geoJsonCountry.properties.ADMIN
                )} with value: ${chalk.green.bold.underline(value)}`
              );
            }
          }
        }
      }
    }
  }
}

(async function () {
  try {
    ensureDirectory(tempPath);

    const unescoHierarchicalCodeListJson = await fetchUnescoHierarchicalCodeList();
    writeToFileSync(
      unescoHierarchicalCodeListJson,
      path.join(tempPath, "unesco-hierarchical-code-list.json")
    );

    const countriesGeoJson = await fetchGeoCountriesPolygons();
    writeToFileSync(countriesGeoJson, path.join(tempPath, "countries.geojson"));

    const unescoStatisticsJson = await fetchUnescoStatistics();
    writeToFileSync(
      unescoStatisticsJson,
      path.join(tempPath, "unesco-statistics.json")
    );

    const availableCountriesStatistics = unescoStatisticsJson.structure.dimensions.series.find(
      (data) => data.id === "REF_AREA"
    );

    const typeOfEvaluation = unescoStatisticsJson.structure.dimensions.series.find(
      (data) => data.id === "INFRASTR"
    );

    matchUnescoCountriesWithGeoJsonPolygon(
      countriesGeoJson,
      availableCountriesStatistics,
      unescoStatisticsJson
    );

    log(
      `Total hits of matching countries: ${chalk.bold.green(
        resultArrayWithCountryMatches.length
      )}`
    );

    log(
      `Total hits of not matching countries/areas: ${chalk.bold.red(
        unescoRegions.size
      )}`
    );
    await matchUnescoRegionsWithGeoJsonPolygon(
      unescoHierarchicalCodeListJson,
      availableCountriesStatistics,
      unescoStatisticsJson,
      countriesGeoJson
    );

    const output = {
      type: typeOfEvaluation.values[0].name,
      features: resultArrayWithCountryMatches,
    };

    ensureDirectory(outputPath);
    writeToFileSync(output, path.join(outputPath, "output.json"));

    log(
      chalk.bold(
        `Output file generated at: ${chalk.green.underline(
          outputPath
        )} with: ${chalk.green.underline(
          resultArrayWithCountryMatches.length
        )} countries`
      )
    );
  } catch (e) {
    log(chalk.bold.red("Oooops! An error occured " + e));
    process.exit(1);
  }
})();
