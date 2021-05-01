interface Dimensions {
  observation: Array<Observastion>;
}

interface Observastion {
  id: string;
  name: string;
  keyPosition: number;
  role: unknown;
  values: Array<unknown>;
}

export interface FilterStructure {
  name: string;
  dimensions: Dimensions;
}
