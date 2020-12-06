import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import configuration from '../config/configuration';
import { DatabaseModule } from './database.module';
import { MapStatisticsModule } from './map-statistics/map-statistics.module';

@Module({
  imports: [
    DatabaseModule,
    MapStatisticsModule,
    ConfigModule.forRoot({
      envFilePath: ['../.env'],
      load: [configuration],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../..', 'web/build'),
    }),
  ],
})
export class AppModule {}
