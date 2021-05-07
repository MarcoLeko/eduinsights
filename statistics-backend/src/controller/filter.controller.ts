import { Body, Controller, Post } from '@nestjs/common';
import { FilterService } from '../application/filter.service';
import { FilterStructure } from '../domain/model/filter-structure';

@Controller('api/v1/filter')
export class FilterController {
  constructor(private filterService: FilterService) {}

  @Post('/')
  async getDataStructureByCategoryId(
    @Body() clientBody: Array<string>,
  ): Promise<FilterStructure> {
    return this.filterService.getFilter(clientBody);
  }

  @Post('/validate')
  async validateClientFilter(
    @Body() clientBody: { [key: string]: string },
  ): Promise<any> {
    return this.filterService.validateFilter(clientBody);
  }
}
