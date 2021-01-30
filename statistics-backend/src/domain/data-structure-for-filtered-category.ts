export class DataStructureForFilteredCategory {
  // Currently only dynamic queries from EDU_NON_FINANCE category are supported
  public static SUPPORTED_CATEGORY_ID = 'EDU_NON_FINANCE';

  public static getDataStructureByCategoryIdUrl(
    currentClientFilter: Array<string>,
  ) {
    return `https://api.uis.unesco.org/sdmx/data/UNESCO,${
      DataStructureForFilteredCategory.SUPPORTED_CATEGORY_ID
    },3.0/${currentClientFilter.join(
      '',
    )}?format=sdmx-json&startPeriod=2018&endPeriod=2018&dimensionAtObservation=AllDimensions&detail=structureOnly`;
  }
}
