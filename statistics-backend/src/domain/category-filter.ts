export class CategoryFilter {
  // Currently only dynamic queries from EDU_NON_FINANCE category are supported
  public static SUPPORTED_CATEGORY_ID = 'EDU_NON_FINANCE';
  public static DATAFLOW_URL =
    'https://api.uis.unesco.org/sdmx/dataflow/UNESCO/all/latest/?format=sdmx-2.1&detail=full&references=none&locale=en';
  constructor(private id: string, private name: string) {}

  getId(): string {
    return this.id;
  }

  getDescription(): string {
    return this.name;
  }

  public static create({ id, name }): CategoryFilter {
    return new CategoryFilter(id, name);
  }
}
