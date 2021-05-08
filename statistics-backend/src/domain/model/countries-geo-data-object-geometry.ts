export interface CountriesGeoDataObjectsGeometry {
  type: string;
  arcs: Array<Array<number>>;
  properties: { name: string; code: string };
}
