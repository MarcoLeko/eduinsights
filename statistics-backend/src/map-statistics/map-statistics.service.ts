import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { MapStatistics, MapStatisticsDocument } from './map-statistics.schema';

@Injectable()
export class MapStatisticsService {
  constructor(
    @InjectModel(MapStatistics.name)
    private readonly mapStatisticsModel: Model<MapStatisticsDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  getMapStatisticsById(type: string): Promise<MapStatisticsDocument[]> {
    return this.mapStatisticsModel.find({ type }).exec();
  }
}
