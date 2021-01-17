import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import configuration from '../config/configuration';
import { DatabaseModule } from './database.module';
import { MapStatisticsModule } from './map-statistics/map-statistics.module';
import { QueryBuilderModule } from './query-builder/query-builder.module';

@Module({
  imports: [
    DatabaseModule,
    MapStatisticsModule,
    QueryBuilderModule,
    ConfigModule.forRoot({
      envFilePath: ['../.env'],
      load: [configuration],
    }),
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => [
        {
          rootPath: join(__dirname, configService.get('pathToStaticFiles')),
        },
      ],
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
