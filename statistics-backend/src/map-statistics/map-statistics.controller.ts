import { Controller, Get } from '@nestjs/common';
import { MapStatisticsService } from './map-statistics.service';

@Controller()
export class MapStatisticsController {
  constructor(private readonly mapStatisticsService: MapStatisticsService) {}

  @Get('api/v1/statistics/internet-access')
  getInternetAccessStatistics(): string {
    return this.mapStatisticsService.getInternetAccess();
  }
}
