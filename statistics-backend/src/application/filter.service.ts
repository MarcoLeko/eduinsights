import { Inject, Injectable, Logger } from '@nestjs/common';
import { FilterStructure } from '../domain/model/filter-structure';
import { UisClientInterface } from '../domain/interface/uis-client.interface';
import { Filter } from '../domain/filter';
import { ClientFilterDto } from '../controller/dto/client-filter.dto';

@Injectable()
export class FilterService {
  private readonly logger = new Logger(FilterService.name);

  constructor(
    @Inject('UisClientInterface')
    private uisClientInterface: UisClientInterface,
  ) {}

  async getFilter(clientFilter: ClientFilterDto): Promise<FilterStructure> {
    const response = await this.uisClientInterface.getFilterStructureByClientFilter(
      clientFilter,
    );

    return response.data.structure;
  }

  async validateFilter(filter: ClientFilterDto) {
    try {
      const response = await this.uisClientInterface.getStatisticByClientFilter(
        filter,
      );
      return {
        isFilterValid: Filter.validate(response.data),
      };
    } catch (e) {
      this.logger.error(e.message);
      return { isFilterValid: false };
    }
  }
}
