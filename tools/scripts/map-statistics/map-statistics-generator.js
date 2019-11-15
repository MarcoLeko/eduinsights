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
        unsecoHierarchicalCodeListJSON = JSON.parse(fs.readFileSync(path.join(__dirname, 'hierarchical-codelist.json'), 'utf8')),
        availableCountriesStatistics = unsecoStatisticsJSON.structure.dimensions.series.find(data => data.id === "REF_AREA"),
        resApiFromCountryCodeToName = 'https://restcountries.eu/rest/v2/alpha?codes=',
        notMatchingCountries = [],
        unescoRegions = new Map(),
        unescoCountries = [],
        log = console.log;


    availableCountriesStatistics.values.forEach(statisticsCountries =>

        countriesGeoJSON.features.forEach(geoJSONCountries => {
            if (geoJSONCountries.properties.ADMIN === statisticsCountries.name) {
                unescoCountries.push(statisticsCountries.name);
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

        for (const list of unsecoHierarchicalCodeListJSON.HierarchicalCodelist) {

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

    function getUnsecoStatisticsEntityByIndex(i) {
        return unsecoStatisticsJSON.dataSets[0].series[`0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:${i}`].observations['0'][0];
    }

    const resultArrayWithCountryMatches = unescoCountries.reduce((acc, curr, i) => {
        for (const geo of countriesGeoJSON.features) {
            if (geo.properties.ADMIN === curr) {
                const value = getUnsecoStatisticsEntityByIndex(i);
                const geoJSONIndex = countriesGeoJSON.features.findIndex(obj => obj.properties.ADMIN === curr);
                const {properties} = countriesGeoJSON.features[geoJSONIndex];
                delete properties.ADMIN;
                delete properties["ISO_A3"];
                Object.assign(properties, {name: curr, value});
                acc.push(countriesGeoJSON.features[geoJSONIndex]);
                return acc;
            }
        }
    }, []);

    const resultArrayWithRegionMatches = [];

    for (const [key, value] of unescoRegions.entries()) {
        const statisticIndex = availableCountriesStatistics.values.findIndex(obj => obj.id === key);

        for (const c of value) {
            for (const geo of countriesGeoJSON.features) {
                if (geo.properties.ADMIN === c) {
                    const value = getUnsecoStatisticsEntityByIndex(statisticIndex);
                    const geoJSONIndex = countriesGeoJSON.features.findIndex(obj => obj.properties.ADMIN === c);
                    const {properties} = countriesGeoJSON.features[geoJSONIndex];
                    delete properties.ADMIN;
                    delete properties["ISO_A3"];
                    Object.assign(properties, {name: c, value});
                    resultArrayWithRegionMatches.push(countriesGeoJSON.features[geoJSONIndex]);
                }
            }
        }
    }

    const output = {
        "type": "FeatureCollection",
        "features": resultArrayWithCountryMatches.concat(resultArrayWithRegionMatches)
    };

    if (!fs.existsSync(path.join(__dirname, 'output'))) {
        fs.mkdirSync(path.join(__dirname, 'output'));
    }

    fs.writeFileSync(path.join(__dirname, 'output', 'output.json'), JSON.stringify(output))
})();



