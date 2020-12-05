import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { MapStatisticsController } from './map-statistics/map-statistics.controller';
import { MapStatisticsService } from './map-statistics/map-statistics.service';
import { DatabaseModule } from './db/database.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: ['../../.env'],
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'web/build'),
    }),
  ],
  controllers: [MapStatisticsController],
  providers: [MapStatisticsService],
})
export class AppModule {}
