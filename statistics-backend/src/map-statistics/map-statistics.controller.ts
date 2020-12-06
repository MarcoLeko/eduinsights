import { Body, Controller, Post } from '@nestjs/common';
import { MapStatisticsService } from './map-statistics.service';
import { MapStatisticsDocument } from './map-statistics.schema';
import { MapStatisticsDto } from './map-statistics.dto';

@Controller('api/v1/map-statistics')
export class MapStatisticsController {
  constructor(private readonly mapStatisticsService: MapStatisticsService) {}

  @Post()
  async getMapStatistics(
    @Body() clientMapStatisticsDto: MapStatisticsDto,
  ): Promise<MapStatisticsDocument[]> {
    return this.mapStatisticsService.getMapStatisticsById(
      clientMapStatisticsDto.id,
    );
  }
}
