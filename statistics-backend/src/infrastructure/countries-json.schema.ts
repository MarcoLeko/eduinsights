import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  CountriesGeoDataObjects,
  CountriesGeoDataObjectsGeometries,
} from '../domain/countries-geo-data';

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
  objects: CountriesGeoDataObjects;
  @Prop()
  arcs: Array<Array<number>>;
  @Prop()
  amountOfCountries: number;
  @Prop()
  bbox: Array<number>;
  @Prop()
  type: 'Topology';
}

export const CountriesJsonSchema = SchemaFactory.createForClass(
  CountriesJson,
).set('collection', 'geoData');
