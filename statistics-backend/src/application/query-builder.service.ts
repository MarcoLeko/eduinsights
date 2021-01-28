import { HttpService, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataStructureForFilteredCategory } from '../domain/data-structure-for-filtered-category';
import { CategoryFilterValue } from '../domain/category-filter-value';
import { Statistic } from '../domain/statistic';
import { ClientQueryFilterDto } from '../controller/client-query-filter.dto';

@Injectable()
export class QueryBuilderService {
  private readonly logger = new Logger(QueryBuilderService.name);
  private statisticInstance = new Statistic();

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getCategoryFilterValues(filterCategoryValue: string): Promise<any> {
    const codeListUrl = CategoryFilterValue.getCategoryFilterUrl(
      filterCategoryValue,
    );

    const response = await this.uisClient(codeListUrl);

    return response.data.Codelist.map((code) =>
      CategoryFilterValue.create({
        id: code.id,
        name: code.names[0].value,
        items: code.items.map((item) => ({
          id: item.id,
          name: item.names[0].value,
        })),
      }),
    );
  }

  async getStatisticsFromClientFilter(filter: ClientQueryFilterDto) {
    const url = Statistic.getStatisticData(
      Statistic.createUrlFromFilter(filter),
    );

    try {
      const response = await this.uisClient(url);
      this.statisticInstance.setStatistic(response.data);
      return {
        clientFilterValid: this.validateDimensionsFromStatistic(
          this.statisticInstance.getStatistic(),
        ),
      };
    } catch (e) {
      this.logger.error(e.message);
      return { clientFilterValid: false };
    }
  }

  async getDataStructureForFilteredCategory() {
    const url = DataStructureForFilteredCategory.getDataStructureByCategoryIdUrl();

    const response = await this.uisClient(url);
    const categoryFilterList = response.data.DataStructure[0].dimensionList.dimensions.map(
      (dimension) => {
        const filterCategoryString =
          dimension.representation.representation || '';
        const filterCategoryId = filterCategoryString.substring(
          filterCategoryString.lastIndexOf('CL_'),
          filterCategoryString.lastIndexOf('('),
        );

        return filterCategoryId;
      },
    );

    const filterCategoryValuesPromises = categoryFilterList
      .filter(Boolean)
      .map((categoryFilter) => this.getCategoryFilterValues(categoryFilter));

    return Promise.all(filterCategoryValuesPromises);
  }

  private async uisClient(url): Promise<any> {
    const urlWithSubscriptionKey =
      url + '&subscription-key=' + this.configService.get('unescoApiKey');

    return this.httpService.get(urlWithSubscriptionKey).toPromise();
  }

  private validateDimensionsFromStatistic(statistics) {
    const availableCountriesStatistics = statistics.structure.dimensions.series.find(
      (data) => data.id === 'REF_AREA',
    );

    if (
      availableCountriesStatistics.values.length !==
      Object.keys(statistics.dataSets[0].series).length
    ) {
      this.logger.warn(
        'There are more Observations than REF_AREA countries - multi dimension observations are currently not supported',
      );

      return false;
    }

    return true;
  }
}
