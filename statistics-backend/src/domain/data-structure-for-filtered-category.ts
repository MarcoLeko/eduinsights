import { CategoryFilter } from './category-filter';
import { CategoryFilterValue } from './category-filter-value';

export class DataStructureForFilteredCategory {
  constructor(private categoryFilterValues: Array<CategoryFilterValue>) {}

  public static getDataStructureByCategoryIdUrl(id: string) {
    return `https://api.uis.unesco.org/sdmx/datastructure/UNESCO/${id}/latest/?format=sdmx-json&detail=full&references=none&locale=en`;
  }

  public static create(
    categoryFilterValues: Array<CategoryFilterValue>,
  ): DataStructureForFilteredCategory {
    return new DataStructureForFilteredCategory(categoryFilterValues);
  }

  public getCategoryFilterValues() {
    return this.categoryFilterValues;
  }
}
