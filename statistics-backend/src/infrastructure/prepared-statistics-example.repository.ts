import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import {
  PreparedStatisticsExample,
  PreparedStatisticsExampleDocument,
} from './schema/prepared-statistics-example.schema';

@Injectable()
export class PreparedStatisticsExampleRepository {
  constructor(
    @InjectModel(PreparedStatisticsExample.name)
    private readonly preparedStatisticsExamplesListModel: Model<PreparedStatisticsExampleDocument>,
  ) {}

  public async getPreparedStatisticsExampleByKey(key: string) {
    return this.preparedStatisticsExamplesListModel.findOne({ key }).exec();
  }
}
