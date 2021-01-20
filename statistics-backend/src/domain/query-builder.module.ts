import { HttpModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QueryBuilderController } from '../controller/query-builder.controller';
import { QueryBuilderService } from '../application/query-builder.service';

@Module({
  imports: [HttpModule],
  controllers: [QueryBuilderController],
  providers: [QueryBuilderService, ConfigService],
})
export class QueryBuilderModule {}
