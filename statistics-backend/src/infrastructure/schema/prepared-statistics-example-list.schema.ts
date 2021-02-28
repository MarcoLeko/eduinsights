import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PreparedStatisticsDataWithoutGeoJson } from './prepared-statistics-example.schema';

export type PreparedStatisticsExampleListDocument = PreparedStatisticsExampleList &
  Document;

@Schema()
export class PreparedStatisticsExampleList {
  @Prop()
  key: string;
  @Prop()
  statistics: Array<PreparedStatisticsDataWithoutGeoJson>;
}

export const PreparedStatisticsExampleListSchema = SchemaFactory.createForClass(
  PreparedStatisticsExampleList,
).set('collection', 'examplesList');
