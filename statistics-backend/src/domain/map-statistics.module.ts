import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MapStatistics,
  MapStatisticsList,
  MapStatisticsListSchema,
  MapStatisticsSchema,
} from '../infrastructure/map-statistics.schema';
import { MapStatisticsController } from '../controller/map-statistics.controller';
import { MapStatisticsService } from '../application/map-statistics.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MapStatistics.name, schema: MapStatisticsSchema },
      { name: MapStatisticsList.name, schema: MapStatisticsListSchema },
    ]),
  ],
  controllers: [MapStatisticsController],
  providers: [MapStatisticsService],
})
export class MapStatisticsModule {}
