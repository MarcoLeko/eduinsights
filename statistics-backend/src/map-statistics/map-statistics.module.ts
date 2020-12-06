import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MapStatisticsController } from './map-statistics.controller';
import { MapStatisticsService } from './map-statistics.service';
import { MapStatistics, MapStatisticsSchema } from './map-statistics.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MapStatistics.name, schema: MapStatisticsSchema },
    ]),
  ],
  controllers: [MapStatisticsController],
  providers: [MapStatisticsService],
})
export class MapStatisticsModule {}
