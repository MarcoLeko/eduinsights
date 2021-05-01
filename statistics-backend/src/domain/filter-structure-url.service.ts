export class FilterStructureUrlService {
  private static readonly CATEGORY_ID = 'EDU_NON_FINANCE';

  public static mapClientFilterToQueryUrl(clientFilter: Array<string>): string {
    let date = 2017;
    const dateIndex = clientFilter.findIndex((item: string) =>
      Date.parse(item),
    );

    if (dateIndex > -1) {
      date = +clientFilter[dateIndex];
      clientFilter[dateIndex] = '.';
    }

    return `https://api.uis.unesco.org/sdmx/data/UNESCO,${
      FilterStructureUrlService.CATEGORY_ID
    },3.0/${clientFilter.join(
      '',
    )}?format=sdmx-json&startPeriod=${date}&endPeriod=${date}&dimensionAtObservation=AllDimensions&detail=structureOnly`;
  }
}
