import { CategoryFilterValue } from './category-filter-value';

export class DataStructureForFilteredCategory {
  // Currently only dynamic queries from EDU_NON_FINANCE category are supported
  public static SUPPORTED_CATEGORY_ID = 'EDU_NON_FINANCE';
  constructor(private categoryFilterValues: CategoryFilterValue) {}

  public static getDataStructureByCategoryIdUrl() {
    return `https://api.uis.unesco.org/sdmx/datastructure/UNESCO/${DataStructureForFilteredCategory.SUPPORTED_CATEGORY_ID}/latest/?format=sdmx-json&detail=full&references=none&locale=en`;
  }

  public static create(
    categoryFilterValues: CategoryFilterValue,
  ): DataStructureForFilteredCategory {
    return new DataStructureForFilteredCategory(categoryFilterValues);
  }

  public getCategoryFilterValues() {
    return this.categoryFilterValues;
  }
}
