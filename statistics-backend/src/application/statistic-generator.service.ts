import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UnescoHierarchicalCodeListRepository } from '../infrastructure/unesco-hierarchical-code-list.repository';
import { GeoCountriesRepository } from '../infrastructure/geo-countries.repository';
import { Statistic } from '../domain/statistic';
import { UisClientInterface } from '../domain/interface/uis-client.interface';
import { ClientFilterDto } from '../controller/dto/client-filter.dto';

// TODO: Refactor this! It does not follow the DDD approach and is hard to extend on changing business logic requirements

@Injectable()
export class StatisticGeneratorService {
  private readonly logger = new Logger(StatisticGeneratorService.name);

  constructor(
    private configService: ConfigService,
    @Inject('UisClientInterface')
    private uisClientInterface: UisClientInterface,
    private countriesRepository: GeoCountriesRepository,
    private unescoHierarchicalCodeListRepository: UnescoHierarchicalCodeListRepository,
  ) {}

  async getAggregatedStatisticGeoData(filter: ClientFilterDto): Promise<any> {
    try {
      const unescoRegions = new Map();
      const resultArrayWithCountryMatches = [];
      const geoJson = await this.countriesRepository.getCountriesGeoJson();
      const hierarchicalCodeList = await this.unescoHierarchicalCodeListRepository.getHierarchicalCodeList();
      const response = await this.uisClientInterface.getStatisticByClientFilter(
        filter,
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
}
