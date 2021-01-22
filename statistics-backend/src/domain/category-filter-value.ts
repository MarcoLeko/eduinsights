import { FilterItem } from './filter-item';

export class CategoryFilterValue {
  constructor(
    private id: string,
    private name: string,
    private items: FilterItem[],
  ) {}
  public static getCategoryFilterUrl(id: string) {
    return `https://api.uis.unesco.org/sdmx/codelist/UNESCO/${id}/latest/?format=sdmx-json&detail=full&references=none&locale=en`;
  }

  public static create({ id, items, name }): CategoryFilterValue {
    return new CategoryFilterValue(id, name, items);
  }
}
