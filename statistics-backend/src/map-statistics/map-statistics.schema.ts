import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type MapStatisticsDocument = MapStatistics & Document;

@Schema()
export class MapStatistics {
  @Prop()
  id: string;
  @Prop()
  type: string;
  @Prop()
  features: [];
}

export const MapStatisticsSchema = SchemaFactory.createForClass(MapStatistics);
