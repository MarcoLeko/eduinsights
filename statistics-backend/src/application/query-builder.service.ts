import { HttpService, Injectable } from '@nestjs/common';
import * as convert from 'xml-js';
import { ConfigService } from '@nestjs/config';
import { DataflowCategories } from '../domain/dataflow-categories.domain';
import { DataStructureByCategoryDomain } from '../domain/data-structure-by-category.domain';

@Injectable()
export class QueryBuilderService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getUISCodeList(): Promise<any> {
    const url =
      'https://api.uis.unesco.org/sdmx/codelist/UNESCO/all/latest/?format=sdmx-json&detail=full&references=none&prettyPrint=true&locale=en' +
      '&subscription-key=' +
      this.configService.get('unescoApiKey');

    const response = await this.uisClient(url);
    return response.data;
  }

  async getUISDataflow(): Promise<DataflowCategories[]> {
    const url =
      DataflowCategories.DATAFLOW_URL +
      '&subscription-key=' +
      this.configService.get('unescoApiKey');

    const response = await this.uisClient(url);
    return this.createDataflowCategories(response);
  }

  async getUISDataStructureForCategory() {
    const url =
      DataStructureByCategoryDomain.getDataStructureByCategoryIdUrl() +
      '&subscription-key=' +
      this.configService.get('unescoApiKey');

    const response = await this.uisClient(url);
    return response.data;
  }

  private async uisClient(url): Promise<any> {
    return this.httpService.get(url).toPromise();
  }

  private createDataflowCategories(response): DataflowCategories[] {
    const json = JSON.parse(
      convert.xml2json(response.data, { compact: true, spaces: 4 }),
    );

    return json['mes:Structure']['mes:Structures']['str:Dataflows'][
      'str:Dataflow'
    ]
      .filter((item) => item['_attributes'].id === 'EDU_NON_FINANCE')
      .map((item) => {
        const id = item['_attributes'].id;
        const description = item['com:Name']['_text'];

        return DataflowCategories.create({ id, description });
      });
  }
}
