import { Document } from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PreparedStatisticDocument = PreparedStatistic & Document;

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
export class PreparedStatistic extends PreparedStatisticsDataWithoutGeoJson {
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

export const PreparedStatisticSchema = SchemaFactory.createForClass(
  PreparedStatistic,
).set('collection', 'examples');
