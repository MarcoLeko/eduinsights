import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import {
  PreparedStatistic,
  PreparedStatisticDocument,
} from './schema/prepared-statistic.schema';
import {
  PreparedStatisticList,
  PreparedStatisticListDocument,
} from './schema/prepared-statistic-list.schema';
import { PreparedStatisticRepositoryInterface } from '../domain/interface/prepared-statistic-repository.interface';

@Injectable()
export class PreparedStatisticRepository
  implements PreparedStatisticRepositoryInterface {
  constructor(
    @InjectModel(PreparedStatistic.name)
    private readonly preparedStatisticModel: Model<PreparedStatisticDocument>,
    @InjectModel(PreparedStatisticList.name)
    private readonly preparedStatisticListModel: Model<PreparedStatisticListDocument>,
  ) {}

  public async getPreparedStatisticsById(key: string) {
    return this.preparedStatisticModel.findOne({ key }).exec();
  }

  public async getPreparedStatisticsList() {
    return this.preparedStatisticListModel.findOne({ key: 'list' }).exec();
  }
}
