import { CountriesGeoDataObjectsGeometry } from './countries-geo-data-object-geometry';

export interface CountriesGeoDataObject {
  countries: {
    type: string;
    geometries: Array<CountriesGeoDataObjectsGeometry>;
  };
}
