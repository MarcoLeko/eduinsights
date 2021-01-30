import { HttpService, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataStructureForFilteredCategory } from '../domain/data-structure-for-filtered-category';
import { CategoryFilterValue } from '../domain/category-filter-value';
import { Statistic } from '../domain/statistic';
import { ClientQueryFilterDto } from '../controller/client-query-filter.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CountriesJson,
  CountriesJsonDocument,
} from '../infrastructure/countries-json.schema';

@Injectable()
export class QueryBuilderService {
  private readonly logger = new Logger(QueryBuilderService.name);

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    @InjectModel(CountriesJson.name)
    private readonly countriesJsonModel: Model<CountriesJsonDocument>,
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

    const filterCategoryValuesPromises = [...new Set(categoryFilterList)]
      .filter(Boolean)
      .map((categoryFilter: string) =>
        this.getCategoryFilterValues(categoryFilter),
      );

    return Promise.all(filterCategoryValuesPromises);
  }

  async getStatisticsFromClientFilter(filter: ClientQueryFilterDto) {
    const url = Statistic.getStatisticData(
      Statistic.createUrlFromFilter(filter),
    );

    try {
      const response = await this.uisClient(url);
      return {
        clientFilterValid: this.validateDimensionsFromStatistic(response.data),
      };
    } catch (e) {
      this.logger.error(e.message);
      return { clientFilterValid: false };
    }
  }

  async getAggregatedStatisticGeoData(
    filter: ClientQueryFilterDto,
  ): Promise<any> {
    const url = Statistic.getStatisticData(
      Statistic.createUrlFromFilter(filter),
    );

    try {
      const unescoRegions = new Map();
      const resultArrayWithCountryMatches = [];
      const geoJson = await this.countriesJsonModel
        .findOne({ key: 'geoJson' })
        .exec();
      const response = await this.uisClient(url);
      const codeList = await this.uisClient(
        'https://api.uis.unesco.org/sdmx/codelist/UNESCO/all/latest?locale=en&format=sdmx-json',
      );
      const availableCountriesStatistics = Statistic.getAvailableCountryStatistic(
        response.data,
      );
      Statistic.matchUnescoCountriesWithGeoJson(
        geoJson,
        availableCountriesStatistics,
        response.data,
        resultArrayWithCountryMatches,
        unescoRegions,
      );

      Statistic.matchUnescoRegionsWithGeoJson(
        codeList,
        availableCountriesStatistics,
        response.data,
        geoJson,
        resultArrayWithCountryMatches,
        unescoRegions,
      );
      return {
        key: geoJson.key,
        description: response.data.structure.name,
        unit: Statistic.getUnit(response.data),
        type: geoJson.type,
        arcs: geoJson.arcs,
        amountOfCountries: resultArrayWithCountryMatches.filter(
          (item) => item.properties.value !== null,
        ).length,
        objects: {
          countries: {
            bbox: geoJson.bbox,
            type: geoJson.objects.countries.type,
            geometries: resultArrayWithCountryMatches,
          },
        },
      };
    } catch (e) {
      this.logger.error(e.message);
      return e;
    }
  }

  private async uisClient(url): Promise<any> {
    const urlWithSubscriptionKey =
      url + '&subscription-key=' + this.configService.get('unescoApiKey');

    return this.httpService.get(urlWithSubscriptionKey).toPromise();
  }

  private validateDimensionsFromStatistic(statistics) {
    const availableCountriesStatistics = Statistic.getAvailableCountryStatistic(
      statistics,
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
