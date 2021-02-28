import { Document } from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PreparedStatisticsExampleDocument = PreparedStatisticsExample &
  Document;

@Schema()
export class PreparedStatisticsDataWithoutGeoJson {
  @Prop()
  key: string;
  @Prop()
  description: string;
  @Prop()
  unit: string;
  @Prop()
  amountOfCountries: number;
}

@Schema()
export class PreparedStatisticsExample extends PreparedStatisticsDataWithoutGeoJson {
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

export const PreparedStatisticsExampleSchema = SchemaFactory.createForClass(
  PreparedStatisticsExample,
).set('collection', 'examples');
