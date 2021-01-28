import { Body, Controller, Get, Post } from '@nestjs/common';
import { QueryBuilderService } from '../application/query-builder.service';
import { ClientQueryFilterDto } from './client-query-filter.dto';

@Controller('api/v1/query')
export class QueryBuilderController {
  constructor(private readonly queryBuilderService: QueryBuilderService) {}

  @Get('/categories/data-structure/')
  async getDataStructureByCategoryId(): Promise<Array<unknown>> {
    return this.queryBuilderService.getDataStructureForFilteredCategory();
  }

  @Post('/categories/data-structure/validate')
  async validateClientFilter(
    @Body() clientBody: ClientQueryFilterDto,
  ): Promise<any> {
    return this.queryBuilderService.getStatisticsFromClientFilter(clientBody);
  }

  @Post('/categories/statistic')
  async getStatisticFromQuery(
    @Body() clientBody: ClientQueryFilterDto,
  ): Promise<any> {
    return this.queryBuilderService.getAggregatedStatisticGeoData(clientBody);
  }
}
