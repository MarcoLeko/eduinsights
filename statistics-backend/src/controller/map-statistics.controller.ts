import { Controller, Get, Param } from '@nestjs/common';
import { MapStatisticsService } from '../application/map-statistics.service';
import {
  MapStatisticsDocument,
  MapStatisticsListDocument,
} from '../infrastructure/map-statistics.schema';

@Controller('api/v1/map-statistics')
export class MapStatisticsController {
  constructor(private readonly mapStatisticsService: MapStatisticsService) {}

  @Get('/list')
  async getMapStatisticsList(): Promise<MapStatisticsListDocument> {
    return this.mapStatisticsService.getMapStatisticsList();
  }

  @Get('/:id')
  async getMapStatistics(
    @Param('id') id: string,
  ): Promise<MapStatisticsDocument> {
    return this.mapStatisticsService.getMapStatisticsById(id);
  }
}
