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

  getMapStatisticsById(type: string): Promise<MapStatisticsDocument[]> {
    return this.mapStatisticsModel.find({ type }).exec();
  }

  // TODO: get actual db collection
  // Check why collections like: DROP_OUT_RATE_OF_PRIMARY_EDUCATION_FEMALE_2018_201 has everywhere 0 set
  getMapStatisticsList(): Promise<MapStatisticsListDocument[]> {
    return {
      type: 'list',
      statistics: [
        'DROP_OUT_RATE_OF_PRIMARY_EDUCATION_FEMALE_2018_2018',
        'DROP_OUT_RATE_OF_PRIMARY_EDUCATION_MALE_2018_2018',
        'DROP_OUT_RATE_OF_PRIMARY_EDUCATION_TOTAL_2018_2018',
        'GROSS_ENROLMENT_RATE_FOR_PRIMARY_EDUCATION_2018_2018',
        'PERCENTAGE_OF_GRADUATES_BACHELORS_FEMALE_2018_2018',
        'PERCENTAGE_OF_GRADUATES_BACHELORS_TOTAL_2018_2018',
        'PERCENTAGE_OF_GRADUATES_DOCTORAL_FEMALE_2018_2018',
        'PERCENTAGE_OF_GRADUATES_DOCTORAL_TOTAL_2018_2018',
        'PROPORTION_OF_PRIMARY_SCHOOLS_INTERNET_ACCESS_2018_2018',
      ],
    } as any;

    // return this.mapStatisticsListModel.find({}).exec();
  }
}
