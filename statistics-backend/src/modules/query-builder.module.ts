import { HttpModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CountriesJson,
  CountriesJsonSchema,
} from '../infrastructure/countries-json.schema';
import { countriesConnectionName } from '../infrastructure/connentions';
import { QueryBuilderController } from '../controller/query-builder.controller';
import { QueryBuilderService } from '../application/query-builder.service';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature(
      [{ name: CountriesJson.name, schema: CountriesJsonSchema }],
      countriesConnectionName,
    ),
  ],
  controllers: [QueryBuilderController],
  providers: [QueryBuilderService, ConfigService],
})
export class QueryBuilderModule {}
