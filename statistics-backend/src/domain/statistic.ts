import { DataStructureForFilteredCategory } from './data-structure-for-filtered-category';
import { ClientQueryFilterDto } from '../controller/client-query-filter.dto';

export class Statistic {
  private static URL_STATISTIC_PREFIX = `https://api.uis.unesco.org/sdmx/data/UNESCO,${DataStructureForFilteredCategory.SUPPORTED_CATEGORY_ID},3.0/`;
  private static URL_STATISTIC_SUFFIX =
    '?startPeriod=2018&endPeriod=2018&format=sdmx-json&locale=en';

  public static getStatisticData(filter: string) {
    return (
      Statistic.URL_STATISTIC_PREFIX + filter + Statistic.URL_STATISTIC_SUFFIX
    );
  }

  public static createUrlFromFilter(filter: ClientQueryFilterDto) {
    return filter.reduce((prev, curr) => {
      prev += Object.values(curr)[0] ? Object.values(curr)[0] : '.';
      return prev;
    }, '');
  }
}
