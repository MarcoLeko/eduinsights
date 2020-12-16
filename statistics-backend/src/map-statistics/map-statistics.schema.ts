import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type MapStatisticsDocument = MapStatistics & Document;
export type MapStatisticsListDocument = MapStatisticsList & Document;

@Schema()
class MapStatisticsMetaData {
  @Prop()
  key: string;
  @Prop()
  description: string;
  @Prop()
  startYear: number;
  @Prop()
  endYear: number;
}

@Schema()
export class MapStatisticsList {
  @Prop()
  key: string;
  @Prop()
  statistics: Array<MapStatisticsMetaData>;
}

@Schema()
export class MapStatistics extends MapStatisticsMetaData {
  @Prop()
  features: [];
}

export const MapStatisticsSchema = SchemaFactory.createForClass(
  MapStatistics,
).set('collection', 'mapStatistics');
export const MapStatisticsListSchema = SchemaFactory.createForClass(
  MapStatisticsList,
).set('collection', 'mapStatisticsList');
