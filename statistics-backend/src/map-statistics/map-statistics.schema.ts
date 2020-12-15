import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type MapStatisticsDocument = MapStatistics & Document;
export type MapStatisticsListDocument = MapStatisticsList & Document;

@Schema()
export class MapStatisticsList {
  @Prop()
  type: string;
  @Prop()
  statistics: [];
}

@Schema()
export class MapStatistics {
  @Prop()
  type: string;
  @Prop()
  features: [];
}

export const MapStatisticsSchema = SchemaFactory.createForClass(MapStatistics);
export const MapStatisticsListSchema = SchemaFactory.createForClass(
  MapStatisticsList,
);
