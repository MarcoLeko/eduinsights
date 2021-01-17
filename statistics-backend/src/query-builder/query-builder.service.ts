import { HttpService, Injectable } from '@nestjs/common';
import * as convert from 'xml-js';
import { DataflowCategories } from './dataflow-categories.domain';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class QueryBuilderService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  private async uisClient(url): Promise<any> {
    const response = await this.httpService.get(url).toPromise();

    return JSON.parse(
      convert.xml2json(response.data, { compact: true, spaces: 4 }),
    );
  }

  async getUISDataflow(): Promise<DataflowCategories[]> {
    const url =
      DataflowCategories.DATAFLOW_URL +
      '&subscription-key=' +
      this.configService.get('unescoApiKey');

    const response = await this.uisClient(url);
    return this.createDataflowCategories(response);
  }

  private createDataflowCategories(response): DataflowCategories[] {
    return response['mes:Structure']['mes:Structures']['str:Dataflows'][
      'str:Dataflow'
    ].map((item) => {
      const id = item['_attributes'].id;
      const description = item['com:Name']['_text'];

      return DataflowCategories.create({ id, description });
    });
  }
}
