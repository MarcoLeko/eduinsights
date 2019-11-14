'use strict';
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const fetch = require("node-fetch");
const HttpsProxyAgent = require('https-proxy-agent');

(async function () {
    const unsecoStatisticsJSON = JSON.parse(fs.readFileSync(path.join(__dirname, 'proportion-primary-school-access-internet-2018.json'), 'utf8')),
        countriesGeoJSON = JSON.parse(fs.readFileSync(path.join(__dirname, 'countries.geojson'), 'utf8')),
        unsecoRegionsJSON = JSON.parse(fs.readFileSync(path.join(__dirname, 'regions.json'), 'utf8')),
        unsecoHierarchicalCodeList = JSON.parse(fs.readFileSync(path.join(__dirname, 'hierarchical-codelist.json'), 'utf8')),
        availableCountriesStatistics = unsecoStatisticsJSON.structure.dimensions.series.find(data => data.id === "REF_AREA"),
        resApiFromCountryCodeToName = 'https://restcountries.eu/rest/v2/alpha?codes=',
        notMatchingCountries = [],
        unescoRegions = new Map(),
        finalMappedCountries = [],
        log = console.log;


    availableCountriesStatistics.values.forEach(statisticsCountries =>

        countriesGeoJSON.features.forEach(geoJSONCountries => {
            if (geoJSONCountries.properties.ADMIN === statisticsCountries.name) {
                finalMappedCountries.push(statisticsCountries.name);
                log(`Found matched contries within geoJSON/statistics sheet: ${chalk.green(geoJSONCountries.properties.ADMIN)}`);
            } else {
                if (!notMatchingCountries.includes(statisticsCountries.name)) {
                    notMatchingCountries.push(statisticsCountries.name);
                }
            }
        })
    );

    notMatchingCountries.forEach(c => {
        log(`Could not found values matched contries within geoJSON/statistics sheet: ${chalk.red.bold(c)}`);
        unsecoRegionsJSON.Codelist[0].items.forEach(unR => {
            if (c === unR.names[0].value && /^[a-z]+_[a-z]+$/i.test(unR.id)) {
                unescoRegions.set(unR.id, []);
            }
        })

    });

    for (const r of unescoRegions.keys()) {
        for (const list of unsecoHierarchicalCodeList.HierarchicalCodelist) {
            for (const entity of list.hierarchies) {
                if (r === entity.id) {
                    for (const sub of entity.codes[0].codes) {
                        try {
                            const response = await fetch(resApiFromCountryCodeToName + sub.id, {agent: new HttpsProxyAgent('http://localhost:3128')});
                            const result = await response.json();
                            log(`Id: ${chalk.yellow.bold(sub.id)} Name: ${chalk.magenta(result[0].name)}`);
                            unescoRegions.get(r).push(result[0].name);
                        } catch (e) {
                            log(`Could not fetch country name for id: ${chalk.red.bold(sub.id)} ` + e);

                        }
                    }
                }
            }
        }
    }

    console.log(unescoRegions)
})();



