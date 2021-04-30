import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PreparedStatisticsDataWithoutGeoJson } from './prepared-statistic.schema';

export type PreparedStatisticListDocument = PreparedStatisticList & Document;

@Schema()
export class PreparedStatisticList {
  @Prop()
  key: string;
  @Prop()
  statistics: Array<PreparedStatisticsDataWithoutGeoJson>;
}

export const PreparedStatisticListSchema = SchemaFactory.createForClass(
  PreparedStatisticList,
).set('collection', 'examplesList');
