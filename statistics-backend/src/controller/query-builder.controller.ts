import { Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { StatisticGeneratorService } from '../application/statistic-generator.service';
import { FilterStructure } from '../domain/filter-structure';
import { FilterService } from '../application/filter.service';

@Controller('api/v1/query')
export class QueryBuilderController {
  constructor(
    private queryBuilderService: StatisticGeneratorService,
    private filterService: FilterService,
  ) {}

  @Post('/filter')
  async getDataStructureByCategoryId(
    @Body() clientBody: Array<string>,
  ): Promise<FilterStructure> {
    return this.filterService.getFilter(clientBody);
  }

  @Post('/filter/validate')
  async validateClientFilter(
    @Body() clientBody: { [key: string]: string },
  ): Promise<any> {
    return this.filterService.validateFilter(clientBody);
  }

  @Post('/categories/statistic')
  async getStatisticFromQuery(
    @Body() clientBody: { [key: string]: string },
  ): Promise<any> {
    const geoData = await this.queryBuilderService.getAggregatedStatisticGeoData(
      clientBody,
    );

    if (!geoData) {
      throw new NotFoundException('Geo data could not be fetched not found');
    }

    return geoData;
  }
}
