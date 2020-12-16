import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  MapStatistics,
  MapStatisticsDocument,
  MapStatisticsList,
  MapStatisticsListDocument,
} from './map-statistics.schema';

@Injectable()
export class MapStatisticsService {
  constructor(
    @InjectModel(MapStatistics.name)
    private readonly mapStatisticsModel: Model<MapStatisticsDocument>,
    @InjectModel(MapStatisticsList.name)
    private readonly mapStatisticsListModel: Model<MapStatisticsListDocument>,
  ) {}

  getMapStatisticsById(key: string): Promise<MapStatisticsDocument> {
    return this.mapStatisticsModel.findOne({ key }).exec();
  }

  getMapStatisticsList(): Promise<MapStatisticsListDocument> {
    return this.mapStatisticsListModel.findOne({ key: 'list' }).exec();
  }
}
