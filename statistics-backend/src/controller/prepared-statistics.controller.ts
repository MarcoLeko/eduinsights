import { Controller, Get, Param } from '@nestjs/common';
import { PreparedStatisticsService } from '../application/prepared-statistics.service';

@Controller('api/v1/prepared-statistics')
export class PreparedStatisticsController {
  constructor(
    private readonly preparedStatisticsService: PreparedStatisticsService,
  ) {}

  @Get('/list')
  async getPreparedStatisticsList() {
    return this.preparedStatisticsService.getPreparedStatisticsList();
  }

  @Get('/:id')
  async getPreparedStatisticsById(@Param('id') id: string) {
    return this.preparedStatisticsService.getPreparedStatisticsById(id);
  }
}
