import { HttpModule, Module } from '@nestjs/common';
import { QueryBuilderService } from './query-builder.service';
import { QueryBuilderController } from './query-builder.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [HttpModule],
  controllers: [QueryBuilderController],
  providers: [QueryBuilderService, ConfigService],
})
export class QueryBuilderModule {}
