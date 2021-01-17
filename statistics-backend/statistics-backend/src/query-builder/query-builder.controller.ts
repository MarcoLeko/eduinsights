import { Controller, Get } from '@nestjs/common';
import { QueryBuilderService } from './query-builder.service';
import { DataflowCategories } from './dataflow-categories.domain';

@Controller('api/v1/query')
export class QueryBuilderController {
  constructor(private readonly queryBuilderService: QueryBuilderService) {}

  @Get('/')
  async getMapStatisticsList(): Promise<DataflowCategories[]> {
    return this.queryBuilderService.getUISDataflow();
  }
}
