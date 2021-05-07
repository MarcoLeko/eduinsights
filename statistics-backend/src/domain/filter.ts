import { Statistic } from './statistic';

export class Filter {
  static validate(statistics) {
    const availableCountriesStatistics = Statistic.getAvailableCountryStatistic(
      statistics,
    );

    return Boolean(availableCountriesStatistics.values.length);
  }
}
