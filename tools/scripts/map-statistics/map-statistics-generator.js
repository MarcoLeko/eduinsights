'use strict';
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

(async function () {
    const unsecoStatisticsJSON = JSON.parse(fs.readFileSync(path.join(__dirname, 'proportion-primary-school-access-internet-2018.json'), 'utf8')),
        contriesGeoJSON = JSON.parse(fs.readFileSync(path.join(__dirname, 'countries.geojson'), 'utf8')),
        unsecoRegionsJSON = JSON.parse(fs.readFileSync(path.join(__dirname, 'regions.json'), 'utf8')),
        availableCountriesStatistics = unsecoStatisticsJSON.structure.dimensions.series.find(data => data.id === "REF_AREA"),
        finalMappedCountries = [],
        notMatchingCountries = [],
        unescoRegions = [],
        log = console.log;


    availableCountriesStatistics.values.forEach(statisticsCountries =>

        contriesGeoJSON.features.forEach(geoJSONCountries => {
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
                    unescoRegions.push(unR.id);
                }
            })

    });
    unescoRegions.forEach(c => log(`Found matching unseco regions: ${chalk.yellow.bold(c)}`));
})();



