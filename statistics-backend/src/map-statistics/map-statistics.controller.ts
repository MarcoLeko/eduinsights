import { Body, Controller, Get, Post } from '@nestjs/common';
import { MapStatisticsService } from './map-statistics.service';
import {
  MapStatisticsDocument,
  MapStatisticsListDocument,
} from './map-statistics.schema';
import { MapStatisticsDto } from './map-statistics.dto';

// TODO: remove console.log
@Controller('api/v1/map-statistics')
export class MapStatisticsController {
  constructor(private readonly mapStatisticsService: MapStatisticsService) {}

  @Post()
  async getMapStatistics(
    @Body() clientMapStatisticsDto: MapStatisticsDto,
  ): Promise<MapStatisticsDocument[]> {
    console.log('endpoint called by id');
    return this.mapStatisticsService.getMapStatisticsById(
      clientMapStatisticsDto.type,
    );
  }

  @Get('/list')
  async getMapStatisticsList(): Promise<MapStatisticsListDocument[]> {
    console.log('endpoint called list');
    return this.mapStatisticsService.getMapStatisticsList();
  }
}
