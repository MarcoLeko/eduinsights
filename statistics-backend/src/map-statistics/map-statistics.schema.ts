import { Document } from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';

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
  @Prop()
  evaluationType: string;
  @Prop()
  amountOfCountries: number;
  @Prop()
  evaluation: Array<{ key: string; value: Array<number> }>;
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
  @Prop(
    raw({
      countries: {
        type: { type: String },
        geometries: { type: Array },
      },
    }),
  )
  objects: Record<string, any>;
  @Prop()
  arcs: [];
  @Prop()
  type: 'Topology';
}

export const MapStatisticsSchema = SchemaFactory.createForClass(
  MapStatistics,
).set('collection', 'mapStatistics');
export const MapStatisticsListSchema = SchemaFactory.createForClass(
  MapStatisticsList,
).set('collection', 'mapStatisticsList');
