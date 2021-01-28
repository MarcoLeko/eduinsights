import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { statisticsConnectionName } from '../infrastructure/connentions';
import { MapStatisticsController } from '../controller/map-statistics.controller';
import { MapStatisticsService } from '../application/map-statistics.service';
import {
  MapStatistics,
  MapStatisticsList,
  MapStatisticsListSchema,
  MapStatisticsSchema,
} from '../infrastructure/map-statistics.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: MapStatistics.name, schema: MapStatisticsSchema },
        { name: MapStatisticsList.name, schema: MapStatisticsListSchema },
      ],
      statisticsConnectionName,
    ),
  ],
  controllers: [MapStatisticsController],
  providers: [MapStatisticsService],
})
export class MapStatisticsModule {}
