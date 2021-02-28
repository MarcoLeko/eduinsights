import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import {
  PreparedStatisticsExampleList,
  PreparedStatisticsExampleListDocument,
} from './schema/prepared-statistics-example-list.schema';

@Injectable()
export class PreparedStatisticsExampleListRepository {
  constructor(
    @InjectModel(PreparedStatisticsExampleList.name)
    private readonly preparedStatisticsExamplesListModel: Model<PreparedStatisticsExampleListDocument>,
  ) {}

  public async getPreparedStatisticsExamplesList() {
    return this.preparedStatisticsExamplesListModel
      .findOne({ key: 'list' })
      .exec();
  }
}
