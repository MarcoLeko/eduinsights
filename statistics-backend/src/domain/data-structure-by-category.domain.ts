export class DataStructureByCategoryDomain {
  constructor(private id: string, private description: string) {}

  public static getDataStructureByCategoryIdUrl(categoryId: string) {
    return `https://api.uis.unesco.org/sdmx/datastructure/all/${categoryId}/latest/?format=sdmx-json&detail=full&references=none&locale=en`;
  }
}
