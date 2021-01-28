import { Body, Controller, Get, Post } from '@nestjs/common';
import { QueryBuilderService } from '../application/query-builder.service';

@Controller('api/v1/query')
export class QueryBuilderController {
  constructor(private readonly queryBuilderService: QueryBuilderService) {}

  @Get('/categories/data-structure/')
  async getDataStructureByCategoryId(): Promise<Array<unknown>> {
    return this.queryBuilderService.getDataStructureForFilteredCategory();
  }

  @Post('/categories/data-structure/validate')
  async validateClientFilter(@Body() clientBody: any): Promise<any> {
    console.log(clientBody);

    return { clientFilterValid: false };
    // return this.queryBuilderService.getDataStructureForFilteredCategory();
  }
}
