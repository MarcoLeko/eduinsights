import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CountriesJsonDocument = CountriesJson & Document;

@Schema()
export class CountriesJson {
  @Prop()
  key: string;
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
  bbox: [];
  @Prop()
  type: 'Topology';
}

export const CountriesJsonSchema = SchemaFactory.createForClass(
  CountriesJson,
).set('collection', 'geoData');
