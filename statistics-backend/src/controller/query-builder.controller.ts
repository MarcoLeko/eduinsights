import { Body, Controller, Post } from '@nestjs/common';
import { QueryBuilderService } from '../application/query-builder.service';
import { ClientQueryFilterDto } from './client-query-filter.dto';

@Controller('api/v1/query')
export class QueryBuilderController {
  constructor(private readonly queryBuilderService: QueryBuilderService) {}

  @Post('/categories/data-structure/')
  async getDataStructureByCategoryId(
    @Body() clientBody: Array<string>,
  ): Promise<Array<unknown>> {
    return this.queryBuilderService.getDataStructureForFilteredCategory(
      clientBody,
    );
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
