export class DataStructureForFilteredCategory {
  public static SUPPORTED_CATEGORY_ID = 'EDU_NON_FINANCE';

  public static getDataStructureByCategoryIdUrl(
    currentClientFilter: Array<string>,
  ) {
    let date = 2017;
    const dateIndex = currentClientFilter.findIndex((item: string) =>
      Date.parse(item),
    );

    if (dateIndex > -1) {
      date = +currentClientFilter[dateIndex];
      currentClientFilter[dateIndex] = '.';
    }

    return `https://api.uis.unesco.org/sdmx/data/UNESCO,${
      DataStructureForFilteredCategory.SUPPORTED_CATEGORY_ID
    },3.0/${currentClientFilter.join(
      '',
    )}?format=sdmx-json&startPeriod=${date}&endPeriod=${date}&dimensionAtObservation=AllDimensions&detail=structureOnly`;
  }
}
