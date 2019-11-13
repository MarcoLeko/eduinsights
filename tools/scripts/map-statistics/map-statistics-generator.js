'use strict';
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

(async function () {
    const json = JSON.parse(fs.readFileSync(path.join(__dirname, 'proportion-primary-school-access-internet-2018.json'), 'utf8')),
        contriesGeoJSON = JSON.parse(fs.readFileSync(path.join(__dirname, 'countries.geojson'), 'utf8')),
        availableCountriesStatistics = json.structure.dimensions.series.find(data => data.id === "REF_AREA"),
        log = console.log;



    availableCountriesStatistics.values.forEach(c => log(chalk.blue(c.name)))

})();



