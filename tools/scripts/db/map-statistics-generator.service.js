const fs = require("fs");
const fetch = require("node-fetch");
const UNESCOSubscriptionKey = process.env.UNESCO_DEVELOPER_API_KEY;

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

  fetchUnescoStatistics: async function fetchUnescoStatistics() {
    const responseUnescoStatistics = await fetch(
      "https://api.uis.unesco.org/sdmx/data/SDG4/SCH.PT.L1._T._T._T._T.INST_T._Z._T._Z.NET_PP._T._T._T._Z._Z._Z.?startPeriod=2018&endPeriod=2018&format=sdmx-json&subscription-key=" +
        UNESCOSubscriptionKey
    );

    return responseUnescoStatistics.json();
  },
};
