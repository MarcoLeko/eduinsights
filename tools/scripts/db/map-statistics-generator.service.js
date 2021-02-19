const fs = require("fs");
const fetch = require("node-fetch");
const path = require("path");
const chalk = require("chalk");
const UNESCOSubscriptionKey = process.env.UNESCO_DEVELOPER_API_KEY;
const log = console.log;

function getUnescoStatisticsEntityByIndex(i, json) {
  return Object.values(json.dataSets[0].series)[i].observations["0"][0];
}

function ensureDirectory(path) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
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
  fetchUnescoCodeList: async function () {
    const responseCodeList = await fetch(
      "https://api.uis.unesco.org/sdmx/codelist/all/all/latest?locale=en&format=sdmx-json&subscription-key=" +
        UNESCOSubscriptionKey
    );
    return responseCodeList.json();
  },

  fetchGeoCountriesPolygons: async function () {
    const responseCountriesGeoJson = await fetch(
      "https://datahub.io/core/geo-countries/r/countries.geojson"
    );
    return responseCountriesGeoJson.json();
  },

  fetchUnescoStatisticWithUrl: async function (url) {
    const responseUnescoStatistics = await fetch(url + UNESCOSubscriptionKey);

    return responseUnescoStatistics.json();
  },

  appendFileToOutputDirPath: function (filename = "") {
    const pathToAppend = path.join(__dirname, "output", filename);
    ensureDirectory(pathToAppend);
    return pathToAppend;
  },
  appendFileToTempDirPath: function (filename = "") {
    const pathToAppend = path.join(__dirname, "temp", filename);
    ensureDirectory(pathToAppend);
    return pathToAppend;
  },
  matchUnescoCountriesWithGeoJson: function (
    countriesGeoJson,
    availableCountriesStatistics,
    unescoStatisticsJson,
    resultArrayWithCountryMatches,
    unescoRegions
  ) {
    for (const geoJsonCountry of countriesGeoJson.objects.countries
      .geometries) {
      let observationValue;

      for (const [
        index,
        statisticsCountry,
      ] of availableCountriesStatistics.values.entries()) {
        if (geoJsonCountry.properties.code === statisticsCountry.id) {
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
            !countriesGeoJson.objects.countries.geometries.some(
              (country) => country.properties.code === statisticsCountry.id
            )
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

      resultArrayWithCountryMatches.push({
        type: geoJsonCountry.type,
        arcs: geoJsonCountry.arcs,
        properties: {
          name: geoJsonCountry.properties.name,
          id: geoJsonCountry.properties.code,
          value: observationValue ? Number(observationValue).toFixed(2) : null,
        },
      });
    }
  },
  getUnit: function (statistic) {
    const unit = statistic.structure.dimensions.series.find(
      (item) => item.id === "UNIT_MEASURE"
    );
    return unit.values[0].name;
  },
  matchUnescoRegionsWithGeoJson: function (
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
                ].properties.value = value ? Number(value).toFixed(2) : null;

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
