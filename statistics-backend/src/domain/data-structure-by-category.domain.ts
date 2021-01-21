export class DataStructureByCategoryDomain {
  constructor(private id: string, private description: string) {}

  public static getDataStructureByCategoryIdUrl() {
    return `https://api.uis.unesco.org/sdmx/datastructure/all/EDU_NON_FINANCE/latest/?format=sdmx-json&detail=full&references=none&locale=en`;
  }
}
