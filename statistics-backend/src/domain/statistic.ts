import { DataStructureForFilteredCategory } from './data-structure-for-filtered-category';
import { ClientQueryFilterDto } from '../controller/client-query-filter.dto';
import * as countries from 'i18n-iso-countries';

export class Statistic {
  private static URL_STATISTIC_PREFIX = `https://api.uis.unesco.org/sdmx/data/UNESCO,${DataStructureForFilteredCategory.SUPPORTED_CATEGORY_ID},3.0/`;
  private static URL_STATISTIC_SUFFIX = '&format=sdmx-json&locale=en';

  public static getStatisticDataUrl(filter: ClientQueryFilterDto) {
    const filterArgs = Object.keys(filter).reduce((prev, curr) => {
      if (Date.parse(filter[curr])) {
        prev += '.';
      } else {
        prev += filter[curr] ? `${filter[curr]}.` : '.';
      }
      return prev;
    }, '');

    const url =
      Statistic.URL_STATISTIC_PREFIX +
      filterArgs +
      (Date.parse(filter['TIME_PERIOD'])
        ? `?startPeriod=${filter['TIME_PERIOD']}&endPeriod=${filter['TIME_PERIOD']}`
        : '?startPeriod=2015&endPeriod=2018') +
      Statistic.URL_STATISTIC_SUFFIX;

    return url;
  }

  public static matchUnescoCountriesWithGeoJson(
    countriesGeoJson,
    availableCountriesStatistics,
    unescoStatisticsJson,
    resultArrayWithCountryMatches,
    unescoRegions,
  ) {
    for (const geoJsonCountry of countriesGeoJson.objects.countries
      .geometries) {
      let observationValue;
      const geoJsonCountryCodeAlpha2 = countries.alpha3ToAlpha2(
        geoJsonCountry.properties.ISO_A3,
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
          statisticsCountry.id,
        );

        if (geoJsonCountryCodeAlpha2 === statisticsCountry.id) {
          observationValue = Statistic.getValueFromStatisticIndex(
            index,
            unescoStatisticsJson,
          );
        } else {
          if (
            !unescoRegions.has(statisticsCountry.id) &&
            !countriesGeoJson.objects.countries.geometries.includes(
              statisticsCountryCodeAlpha3,
            ) &&
            !statisticsCountryCodeAlpha3
          ) {
            unescoRegions.set(statisticsCountry.id, []);
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
          : geoJsonObject,
      );
    }
  }

  public static matchUnescoRegionsWithGeoJson(
    unescoHierarchicalCodeListJson,
    availableCountriesStatistics,
    unescoStatisticsJson,
    countriesGeoJson,
    resultArrayWithCountryMatches,
    unescoRegions,
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
                    country.properties.value === null,
                )
              ) {
                const indexOfRegionInUnescoStatistic = availableCountriesStatistics.values.findIndex(
                  (statistic) => statistic.id === region,
                );

                if (indexOfRegionInUnescoStatistic < 0) {
                  continue;
                }

                const value = Statistic.getValueFromStatisticIndex(
                  indexOfRegionInUnescoStatistic,
                  unescoStatisticsJson,
                );

                const geoJsonCountryIndex = resultArrayWithCountryMatches.findIndex(
                  (item) => item.properties.id === countryWithinRegion.id,
                );

                if (geoJsonCountryIndex < 0) {
                  continue;
                }

                resultArrayWithCountryMatches[
                  geoJsonCountryIndex
                ].properties.value = value;
              }
            }
          }
        }
      }
    }
  }

  public static getAvailableCountryStatistic(statistic) {
    return statistic.structure.dimensions.series.find(
      (data) => data.id === 'REF_AREA',
    );
  }

  public static getUnit(statistic): string {
    const unit = statistic.structure.dimensions.series.find(
      (item) => item.id === 'UNIT_MEASURE',
    );
    return unit.values[0].name;
  }

  private static getValueFromStatisticIndex(i, json) {
    const index = Object.keys(json.dataSets[0].series).findIndex((key) =>
      key.includes(i),
    );
    return index > -1
      ? (<any>Object.values(json.dataSets[0].series)[index]).observations[
          '0'
        ][0]
      : null;
  }
}
