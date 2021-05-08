import { Body, Controller, Post } from '@nestjs/common';
import { FilterService } from '../application/filter.service';
import { FilterStructure } from '../domain/model/filter-structure';
import { ClientFilterDto } from './dto/client-filter.dto';

@Controller('api/v1/filter')
export class FilterController {
  constructor(private filterService: FilterService) {}

  @Post('/')
  async getDataStructureByCategoryId(
    @Body() clientBody: ClientFilterDto,
  ): Promise<FilterStructure> {
    return this.filterService.getFilter(clientBody);
  }

  @Post('/validate')
  async validateClientFilter(
    @Body() clientBody: ClientFilterDto,
  ): Promise<any> {
    return this.filterService.validateFilter(clientBody);
  }
}
