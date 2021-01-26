import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataStructureForFilteredCategory } from '../domain/data-structure-for-filtered-category';
import { CategoryFilterValue } from '../domain/category-filter-value';

@Injectable()
export class QueryBuilderService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getCategoryFilterValues(filterCategoryValue: string): Promise<any> {
    const codeListUrl =
      CategoryFilterValue.getCategoryFilterUrl(filterCategoryValue) +
      '&subscription-key=' +
      this.configService.get('unescoApiKey');

    const response = await this.uisClient(codeListUrl);

    return response.data.Codelist.map((code) =>
      CategoryFilterValue.create({
        id: code.id,
        name: code.names[0].value,
        items: code.items.map((item) => ({
          id: item.id,
          name: item.names[0].value,
        })),
      }),
    );
  }

  async getDataStructureForFilteredCategory() {
    const url =
      DataStructureForFilteredCategory.getDataStructureByCategoryIdUrl() +
      '&subscription-key=' +
      this.configService.get('unescoApiKey');

    const response = await this.uisClient(url);
    const categoryFilterList = response.data.DataStructure[0].dimensionList.dimensions.map(
      (dimension) => {
        const filterCategoryString =
          dimension.representation.representation || '';
        const filterCategoryId = filterCategoryString.substring(
          filterCategoryString.lastIndexOf('CL_'),
          filterCategoryString.lastIndexOf('('),
        );

        return filterCategoryId;
      },
    );

    const filterCategoryValuesPromises = categoryFilterList
      .filter(Boolean)
      .map((categoryFilter) => this.getCategoryFilterValues(categoryFilter));

    return Promise.all(filterCategoryValuesPromises);
  }

  private async uisClient(url): Promise<any> {
    return this.httpService.get(url).toPromise();
  }
}
