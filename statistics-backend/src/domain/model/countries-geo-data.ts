import { CountriesGeoDataObject } from './countries-geo-data-object';

export interface CountriesGeoData {
  key: string;
  arcs: Array<Array<number>>;
  objects: CountriesGeoDataObject;
  amountOfCountries: number;
  bbox: Array<number>;
  type: 'Topology';
}
