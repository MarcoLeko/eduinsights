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
import { CountriesRepository } from '../infrastructure/countries-repository.service';
import {
  PreparedStatisticsExampleList,
  PreparedStatisticsExampleListSchema,
} from '../infrastructure/schema/prepared-statistics-example-list.schema';
import {
  PreparedStatisticsExample,
  PreparedStatisticsExampleSchema,
} from '../infrastructure/schema/prepared-statistics-example.schema';
import { PreparedStatisticsController } from '../controller/prepared-statistics.controller';
import { PreparedStatisticsService } from '../application/prepared-statistics.service';
import { PreparedStatisticsExampleRepository } from '../infrastructure/prepared-statistics-example.repository';
import { PreparedStatisticsExampleListRepository } from '../infrastructure/prepared-statistics-example-list.repository';

@Module({
  imports: [
    HttpModule,
    GeoDataDatabaseModule,
    PreparedStatisticsDatabaseModule,
    MongooseModule.forFeature(
      [
        {
          name: PreparedStatisticsExample.name,
          schema: PreparedStatisticsExampleSchema,
        },
        {
          name: PreparedStatisticsExampleList.name,
          schema: PreparedStatisticsExampleListSchema,
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
    CountriesRepository,
    UnescoHierarchicalCodeListRepository,
    PreparedStatisticsExampleRepository,
    PreparedStatisticsExampleListRepository,
  ],
})
export class AppModule {}
