import { HttpModule, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from '../../config/configuration';
import { QueryBuilderController } from '../controller/query-builder.controller';
import { QueryBuilderService } from '../application/query-builder.service';
import { UnescoHierarchicalCodeListRepository } from '../infrastructure/unesco-hierarchical-code-list.repository';
import {
  geoDataConnectionName,
  preparedStatisticsConnectionName,
} from './connentions';
import {
  UnescoHierarchicalCodeList,
  UnescoHierarchicalCodeListSchema,
} from '../infrastructure/schema/unesco-hierarchical-code-list.schema';
import { PreparedStatisticsDatabaseModule } from './prepared-statistics-database.module';
import { GeoDataDatabaseModule } from './geo-data-database.module';
import {
  Countries,
  CountriesSchema,
} from '../infrastructure/schema/countries.schema';
import { PreparedStatisticsController } from '../controller/prepared-statistics.controller';
import { PreparedStatisticsService } from '../application/prepared-statistics.service';
import { UisClient } from '../infrastructure/client/uis.client';
import { GeoCountriesRepository } from '../infrastructure/geo-countries.repository';
import {
  PreparedStatistic,
  PreparedStatisticSchema,
} from '../infrastructure/schema/prepared-statistic.schema';
import {
  PreparedStatisticList,
  PreparedStatisticListSchema,
} from '../infrastructure/schema/prepared-statistic-list.schema';
import { PreparedStatisticRepository } from '../infrastructure/prepared-statistic.repository';

@Module({
  imports: [
    HttpModule,
    GeoDataDatabaseModule,
    PreparedStatisticsDatabaseModule,
    MongooseModule.forFeature(
      [
        {
          name: PreparedStatistic.name,
          schema: PreparedStatisticSchema,
        },
        {
          name: PreparedStatisticList.name,
          schema: PreparedStatisticListSchema,
        },
      ],
      preparedStatisticsConnectionName,
    ),
    MongooseModule.forFeature(
      [
        { name: Countries.name, schema: CountriesSchema },
        {
          name: UnescoHierarchicalCodeList.name,
          schema: UnescoHierarchicalCodeListSchema,
        },
      ],
      geoDataConnectionName,
    ),
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
  controllers: [QueryBuilderController, PreparedStatisticsController],
  providers: [
    QueryBuilderService,
    ConfigService,
    PreparedStatisticsService,
    GeoCountriesRepository,
    UnescoHierarchicalCodeListRepository,
    {
      provide: 'PreparedStatisticRepositoryInterface',
      useClass: PreparedStatisticRepository,
    },
    {
      provide: 'UisClientInterface',
      useClass: UisClient,
    },
  ],
})
export class AppModule {}
