import { Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { QueryBuilderService } from '../application/query-builder.service';
import { ClientQueryFilterDto } from './client-query-filter.dto';
import { FilterStructure } from '../domain/filter-structure';

@Controller('api/v1/query')
export class QueryBuilderController {
  constructor(private readonly queryBuilderService: QueryBuilderService) {}

  @Post('/filter')
  async getDataStructureByCategoryId(
    @Body() clientBody: Array<string>,
  ): Promise<FilterStructure> {
    return this.queryBuilderService.getFilter(clientBody);
  }

  @Post('/filter/validate')
  async validateClientFilter(
    @Body() clientBody: ClientQueryFilterDto,
  ): Promise<any> {
    return this.queryBuilderService.validateFilter(clientBody);
  }

  @Post('/categories/statistic')
  async getStatisticFromQuery(
    @Body() clientBody: ClientQueryFilterDto,
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
