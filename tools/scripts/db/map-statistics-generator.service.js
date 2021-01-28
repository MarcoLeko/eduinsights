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
  fetchEnhancedCountryInformation: async function fetchEnhancedCountryInformation(
    countryCode
  ) {
    const responseExtendedCountryInformation = await fetch(
      "https://restcountries.eu/rest/v2/alpha?codes=" + countryCode
    );
    return responseExtendedCountryInformation.json();
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
  matchUnescoCountriesWithGeoJson: function matchUnescoCountriesWithGeoJson(
    countriesGeoJson,
    availableCountriesStatistics,
    unescoStatisticsJson,
    resultArrayWithCountryMatches,
    unescoRegions
  ) {
    for (const geoJsonCountry of countriesGeoJson.objects.countries
      .geometries) {
      let observationValue;
      const geoJsonCountryCodeAlpha2 = countries.alpha3ToAlpha2(
        geoJsonCountry.properties.ISO_A3
      );

      if (!geoJsonCountryCodeAlpha2) {
        continue;
      }

      const geoJsonObject = {
        type: geoJsonCountry.type,
        arcs: geoJsonCountry.arcs,
        properties: {
          name: geoJsonCountry.properties.ADMIN,
          id: geoJsonCountryCodeAlpha2,
          value: null,
        },
      };
      for (const [
        index,
        statisticsCountry,
      ] of availableCountriesStatistics.values.entries()) {
        const statisticsCountryCodeAlpha3 = countries.alpha2ToAlpha3(
          statisticsCountry.id
        );

        if (geoJsonCountryCodeAlpha2 === statisticsCountry.id) {
          observationValue = getUnescoStatisticsEntityByIndex(
            index,
            unescoStatisticsJson
          );

          log(
            `Found matching geoJson polygon for country: ${chalk.green(
              statisticsCountry.name
            )} with value: ${chalk.green.bold.underline(observationValue)}`
          );
        } else {
          if (
            !unescoRegions.has(statisticsCountry.id) &&
            !countriesGeoJson.objects.countries.geometries.includes(
              statisticsCountryCodeAlpha3
            ) &&
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
      resultArrayWithCountryMatches.push(
        observationValue
          ? {
              ...geoJsonObject,
              properties: {
                ...geoJsonObject.properties,
                value: Math.round(Number(observationValue)),
              },
            }
          : geoJsonObject
      );
    }
  },
  matchUnescoRegionsWithGeoJson: function matchUnescoRegionsWithGeoJson(
    unescoHierarchicalCodeListJson,
    availableCountriesStatistics,
    unescoStatisticsJson,
    countriesGeoJson,
    resultArrayWithCountryMatches,
    unescoRegions
  ) {
    for (const region of unescoRegions.keys()) {
      for (const list of unescoHierarchicalCodeListJson.HierarchicalCodelist) {
        for (const entity of list.hierarchies) {
          if (region === entity.id) {
            for (const countryWithinRegion of entity.codes[0].codes) {
              if (
                resultArrayWithCountryMatches.some(
                  (country) =>
                    countryWithinRegion.id === country.properties.id &&
                    country.properties.value === null
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

                const geoJsonCountryIndex = resultArrayWithCountryMatches.findIndex(
                  (item) => item.properties.id === countryWithinRegion.id
                );

                if (geoJsonCountryIndex < 0) {
                  continue;
                }

                resultArrayWithCountryMatches[
                  geoJsonCountryIndex
                ].properties.value = value;

                log(
                  `Found matching geoJson polygon for country: ${chalk.blue(
                    resultArrayWithCountryMatches[geoJsonCountryIndex]
                      .properties.name
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
