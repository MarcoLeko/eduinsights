export interface CountriesGeoDataObjectsGeometries {
  type: string;
  arcs: Array<Array<number>>;
  properties: { name: string; code: string };
}
export interface CountriesGeoDataObjects {
  countries: {
    type: string;
    geometries: Array<CountriesGeoDataObjectsGeometries>;
  };
}

export interface CountriesGeoData {
  key: string;
  arcs: Array<Array<number>>;
  objects: CountriesGeoDataObjects;
  amountOfCountries: number;
  bbox: Array<number>;
  type: 'Topology';
}
