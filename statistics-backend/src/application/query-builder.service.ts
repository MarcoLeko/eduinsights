import { HttpService, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataStructureForFilteredCategory } from '../domain/data-structure-for-filtered-category';
import { Statistic } from '../domain/statistic';
import { ClientQueryFilterDto } from '../controller/client-query-filter.dto';
import { UnescoHierarchicalCodeListRepository } from '../infrastructure/unesco-hierarchical-code-list.repository';
import { GeoCountriesRepository } from '../infrastructure/geo-countries.repository';
import { UisClient } from '../infrastructure/client/uis.client';

// TODO: Refactor this! It does not follow the DDD approach and is hard to extend on business logic requirements

@Injectable()
export class QueryBuilderService {
  private readonly logger = new Logger(QueryBuilderService.name);

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    private uisClient: UisClient,
    private countriesRepository: GeoCountriesRepository,
    private unescoHierarchicalCodeListRepository: UnescoHierarchicalCodeListRepository,
  ) {}

  async getDataStructureForFilteredCategory(clientFilter: Array<string>) {
    const url = DataStructureForFilteredCategory.getDataStructureByCategoryIdUrl(
      clientFilter,
    );

    const response = await this.uisClient.get(url);
    return response.data;
  }

  async validateFilter(filter: ClientQueryFilterDto) {
    const url = Statistic.getStatisticDataUrl(filter);

    try {
      const response = await this.uisClient.get(url);
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
      const geoJson = await this.countriesRepository.getCountriesGeoJson();
      const hierarchicalCodeList = await this.unescoHierarchicalCodeListRepository.getHierarchicalCodeList();
      const response = await this.uisClient.get(url);

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
        hierarchicalCodeList,
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
