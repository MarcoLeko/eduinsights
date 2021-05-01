import { Inject, Injectable, Logger } from '@nestjs/common';
import { UisClientInterface } from '../domain/uis-client.interface';
import { FilterStructureUrlService } from '../domain/filter-structure-url.service';
import { FilterStructure } from '../domain/filter-structure';
import { Statistic } from '../domain/statistic';

// TODO: Refactor this! It does not follow the DDD approach and is hard to extend on business logic requirements

@Injectable()
export class FilterService {
  private readonly logger = new Logger(FilterService.name);

  constructor(
    @Inject('UisClientInterface')
    private uisClientInterface: UisClientInterface,
  ) {}

  async getFilter(clientFilter: Array<string>): Promise<FilterStructure> {
    const url = FilterStructureUrlService.mapClientFilterToQueryUrl(
      clientFilter,
    );
    const response = await this.uisClientInterface.get(url);

    return response.data.structure;
  }

  async validateFilter(filter: { [key: string]: string }) {
    const url = Statistic.getStatisticDataUrl(filter);

    try {
      const response = await this.uisClientInterface.get(url);
      return {
        clientFilterValid: this.isFilterValid(response.data),
      };
    } catch (e) {
      this.logger.error(e.message);
      return { clientFilterValid: false };
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
