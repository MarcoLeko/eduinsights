export class AggregatedStatisticWithGeoData {
  public static composeCountryWithStatistic(country, observationValue) {
    return {
      type: country.type,
      arcs: country.arcs,
      properties: {
        name: country.properties.name,
        id: country.properties.code,
        value: observationValue ? Number(observationValue).toFixed(2) : null,
      },
    };
  }
}
