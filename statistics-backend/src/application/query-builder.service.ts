import { HttpService, Injectable } from '@nestjs/common';
import * as convert from 'xml-js';
import { ConfigService } from '@nestjs/config';
import { CategoryFilter } from '../domain/category-filter';
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

  async getCategoryFilter(): Promise<CategoryFilter[]> {
    const url =
      CategoryFilter.DATAFLOW_URL +
      '&subscription-key=' +
      this.configService.get('unescoApiKey');

    const response = await this.uisClient(url);
    return this.createCategoryFilter(response);
  }

  async getDataStructureForFilteredCategory() {
    const url =
      DataStructureForFilteredCategory.getDataStructureByCategoryIdUrl(
        CategoryFilter.SUPPORTED_CATEGORY_ID,
      ) +
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

    console.log(filterCategoryValuesPromises);
    return Promise.all(filterCategoryValuesPromises);
  }

  private async uisClient(url): Promise<any> {
    return this.httpService.get(url).toPromise();
  }

  private createCategoryFilter(response): CategoryFilter[] {
    const json = JSON.parse(
      convert.xml2json(response.data, { compact: true, spaces: 4 }),
    );

    return json['mes:Structure']['mes:Structures']['str:Dataflows'][
      'str:Dataflow'
    ]
      .filter(
        (item) =>
          item['_attributes'].id === CategoryFilter.SUPPORTED_CATEGORY_ID,
      )
      .map((item) => {
        const id = item['_attributes'].id;
        const name = item['com:Name']['_text'];

        return CategoryFilter.create({ id, name });
      });
  }
}
