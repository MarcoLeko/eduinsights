import { HttpService, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataStructureForFilteredCategory } from '../domain/data-structure-for-filtered-category';
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

  async getDataStructureForFilteredCategory(clientFilter: Array<string>) {
    const url = DataStructureForFilteredCategory.getDataStructureByCategoryIdUrl(
      clientFilter,
    );

    const response = await this.uisClient(url);
    return response.data;
  }

  async validateFilter(filter: ClientQueryFilterDto) {
    const url = Statistic.getStatisticDataUrl(filter);

    try {
      const response = await this.uisClient(url);
      return {
        clientFilterValid: this.isFilterValid(response.data),
      };
    } catch (e) {
      this.logger.error(e.message);
      return { clientFilterValid: false };
    }
  }

  async getAggregatedStatisticGeoData(
    filter: ClientQueryFilterDto,
  ): Promise<any> {
    const url = Statistic.getStatisticDataUrl(filter);

    try {
      const unescoRegions = new Map();
      const resultArrayWithCountryMatches = [];
      const geoJson = await this.countriesJsonModel
        .findOne({ key: 'geoJson' })
        .exec();
      const response = await this.uisClient(url);
      const hierarchicalcodeList = await this.uisClient(
        'https://api.uis.unesco.org/sdmx/hierarchicalcodelist/UNESCO/latest?locale=en&format=sdmx-json',
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
        hierarchicalcodeList.data,
        availableCountriesStatistics,
        response.data,
        geoJson,
        resultArrayWithCountryMatches,
        unescoRegions,
      );

      const description = response.data.structure.dimensions.series.find(
        (item) => item.id === 'STAT_UNIT',
      ).values[0].name;

      return {
        key: geoJson.key,
        description,
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
      this.logger.error(e.message, e.config?.url);
      return null;
    }
  }

  private async uisClient(url): Promise<any> {
    const urlWithSubscriptionKey =
      url + '&subscription-key=' + this.configService.get('unescoApiKey');

    return this.httpService
      .get(urlWithSubscriptionKey, {
        headers: {
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        },
      })
      .toPromise();
  }

  private isFilterValid(statistics) {
    const availableCountriesStatistics = Statistic.getAvailableCountryStatistic(
      statistics,
    );

    if (
      availableCountriesStatistics.values.length !==
      Object.keys(statistics.dataSets[0].series).length
    ) {
      this.logger.warn(
        'There are more Observations than REF_AREA countries - multi dimension observations are not supported',
      );

      return Boolean(availableCountriesStatistics.values.length);
    }

    return true;
  }
}
