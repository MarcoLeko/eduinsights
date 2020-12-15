const fs = require("fs");
const fetch = require("node-fetch");
const path = require("path");
const countries = require("i18n-iso-countries");
const chalk = require("chalk");
const UNESCOSubscriptionKey = process.env.UNESCO_DEVELOPER_API_KEY;
const log = console.log;

function getUnescoStatisticsEntityByIndex(i, json) {
  return Object.values(json.dataSets[0].series)[i].observations["0"][0];
}

module.exports = {
  writeToFileSync: function writeToFileSync(json, path) {
    fs.writeFileSync(path, JSON.stringify(json));
  },
  fetchUnescoHierarchicalCodeList: async function fetchUnescoHierarchicalCodeList() {
    const responseHierarchicalCodeList = await fetch(
      "https://api.uis.unesco.org/sdmx/hierarchicalcodelist/all/latest?locale=en&format=sdmx-json&subscription-key=" +
        UNESCOSubscriptionKey
    );
    return responseHierarchicalCodeList.json();
  },
  ensureDirectory: function ensureDirectory(path) {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
  },

  fetchUnescoCodeList: async function fetchUnescoCodeList() {
    const responseCodeList = await fetch(
      "https://api.uis.unesco.org/sdmx/codelist/all/all/latest?locale=en&format=sdmx-json&subscription-key=" +
        UNESCOSubscriptionKey
    );
    return responseCodeList.json();
  },

  fetchGeoCountriesPolygons: async function fetchGeoCountriesPolygons() {
    const responseCountriesGeoJSON = await fetch(
      "https://datahub.io/core/geo-countries/r/countries.geojson"
    );
    return responseCountriesGeoJSON.json();
  },

  fetchUnescoStatisticWithUrl: async function fetchUnescoStatisticWithUrl(url) {
    const responseUnescoStatistics = await fetch(url + UNESCOSubscriptionKey);

    return responseUnescoStatistics.json();
  },

  createMapStatisticsOutputPath: function createMapStatisticsOutputPath(
    filename = ""
  ) {
    return path.join(__dirname, "output", filename);
  },
  createMapStatisticsTempPath: function createMapStatisticsTempPath(
    filename = ""
  ) {
    return path.join(__dirname, "temp", filename);
  },
  matchUnescoCountriesWithGeoJsonPolygon: function matchUnescoCountriesWithGeoJsonPolygon(
    countriesGeoJson,
    availableCountriesStatistics,
    unescoStatisticsJson,
    resultArrayWithCountryMatches,
    unescoRegions
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
  },
  matchUnescoRegionsWithGeoJsonPolygon: async function matchUnescoRegionsWithGeoJsonPolygon(
    unescoHierarchicalCodeListJson,
    availableCountriesStatistics,
    unescoStatisticsJson,
    countriesGeoJson,
    resultArrayWithCountryMatches,
    unescoRegions
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

                if (indexOfRegionInUnescoStatistic < 0) {
                  continue;
                }

                const value = getUnescoStatisticsEntityByIndex(
                  indexOfRegionInUnescoStatistic,
                  unescoStatisticsJson
                );

                const geoJsonCountry = countriesGeoJson.features.find(
                  (geoJSONCountry) =>
                    countries.alpha3ToAlpha2(
                      geoJSONCountry.properties.ISO_A3
                    ) === countryWithinRegion.id
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
  },
};
