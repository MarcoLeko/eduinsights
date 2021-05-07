import { AggregatedStatisticWithGeoData } from './aggregated-statistic-with-geo-data';

export class Statistic {
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

      for (const [
        index,
        statisticsCountry,
      ] of availableCountriesStatistics.values.entries()) {
        if (geoJsonCountry.properties.code === statisticsCountry.id) {
          observationValue = Statistic.getValueFromStatisticIndex(
            index,
            unescoStatisticsJson,
          );
        } else {
          if (
            !unescoRegions.has(statisticsCountry.id) &&
            !countriesGeoJson.objects.countries.geometries.some(
              (country) => country.properties.code === statisticsCountry.id,
            )
          ) {
            unescoRegions.set(statisticsCountry.id, []);
          }
        }
      }
      resultArrayWithCountryMatches.push(
        AggregatedStatisticWithGeoData.composeCountryWithStatistic(
          geoJsonCountry,
          observationValue,
        ),
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
                ].properties.value = value ? Number(value).toFixed(2) : null;
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
      ? (<any>Object.values(json.dataSets[0].series)[index]).observations[0][0]
      : null;
  }
}
