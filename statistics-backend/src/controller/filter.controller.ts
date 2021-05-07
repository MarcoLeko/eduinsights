import { Body, Controller, Post } from '@nestjs/common';
import { FilterStructure } from '../domain/filter-structure';
import { FilterService } from '../application/filter.service';

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
