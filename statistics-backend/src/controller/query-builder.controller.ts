import { Body, Controller, Get, Post } from '@nestjs/common';
import { QueryBuilderService } from '../application/query-builder.service';
import { DataflowCategories } from '../domain/dataflow-categories.domain';
import { DataStructureByCategoryDto } from './data-structure-by-category.dto';

@Controller('api/v1/query')
export class QueryBuilderController {
  constructor(private readonly queryBuilderService: QueryBuilderService) {}

  @Get('/')
  async getUISCategories(): Promise<DataflowCategories[]> {
    return this.queryBuilderService.getUISDataflow();
  }

  @Post('/data-structure/')
  async getDataStructureByCategoryId(
    @Body() uisDataStructureCategoryDto: DataStructureByCategoryDto,
  ): Promise<any> {
    return this.queryBuilderService.getUISDataStructureForCategory(
      uisDataStructureCategoryDto.id,
    );
  }
}
