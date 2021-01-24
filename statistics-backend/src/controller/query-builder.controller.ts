import { Controller, Get } from '@nestjs/common';
import { QueryBuilderService } from '../application/query-builder.service';
import { CategoryFilter } from '../domain/category-filter';

@Controller('api/v1/query')
export class QueryBuilderController {
  constructor(private readonly queryBuilderService: QueryBuilderService) {}

  @Get('/categories')
  async getUISCategories(): Promise<CategoryFilter[]> {
    return this.queryBuilderService.getCategoryFilter();
  }

  @Get('/categories/data-structure/')
  async getDataStructureByCategoryId(): Promise<any> {
    return this.queryBuilderService.getDataStructureForFilteredCategory();
  }
}
