export class DataflowCategories {
  public static DATAFLOW_URL =
    'https://api.uis.unesco.org/sdmx/dataflow/UNESCO/all/latest/?format=sdmx-2.1&detail=full&references=none&locale=en';
  constructor(private id: string, private description: string) {}

  getId(): string {
    return this.id;
  }

  getDescription(): string {
    return this.description;
  }

  public static create({ id, description }): DataflowCategories {
    return new DataflowCategories(id, description);
  }
}
