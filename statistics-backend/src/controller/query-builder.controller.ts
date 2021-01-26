import { Controller, Get } from '@nestjs/common';
import { QueryBuilderService } from '../application/query-builder.service';

@Controller('api/v1/query')
export class QueryBuilderController {
  constructor(private readonly queryBuilderService: QueryBuilderService) {}

  @Get('/categories/data-structure/')
  async getDataStructureByCategoryId(): Promise<any> {
    return this.queryBuilderService.getDataStructureForFilteredCategory();
  }
}
