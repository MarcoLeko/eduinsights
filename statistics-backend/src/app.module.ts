import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import configuration from '../config/configuration';
import { CountriesDatabaseModule } from './modules/countries-database.module';
import { MapStatisticsModule } from './modules/map-statistics.module';
import { QueryBuilderModule } from './modules/query-builder.module';
import { StatisticsDatabaseModule } from './modules/statistics-database.module';

@Module({
  imports: [
    CountriesDatabaseModule,
    StatisticsDatabaseModule,
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
