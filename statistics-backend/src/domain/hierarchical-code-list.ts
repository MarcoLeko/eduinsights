export interface HierarchicalCodeList {
  id: string;
  urn: string;
  agencyId: string;
  version: string;
  isFinal: boolean;
  names: Array<any>;
  codelistRef: Array<any>;
  hierarchies: Array<any>;
}
