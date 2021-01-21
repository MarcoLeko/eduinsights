import { Controller, Get } from '@nestjs/common';
import { QueryBuilderService } from '../application/query-builder.service';
import { DataflowCategories } from '../domain/dataflow-categories.domain';

@Controller('api/v1/query')
export class QueryBuilderController {
  constructor(private readonly queryBuilderService: QueryBuilderService) {}

  @Get('/')
  async getUISCategories(): Promise<DataflowCategories[]> {
    return this.queryBuilderService.getUISDataflow();
  }

  @Get('/data-structure/')
  async getDataStructureByCategoryId(): Promise<any> {
    return this.queryBuilderService.getUISDataStructureForCategory();
  }
}
