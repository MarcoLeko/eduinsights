import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientFilterDto } from '../../controller/dto/client-filter.dto';
import { ClientFilterUrlMapper } from '../mapper/client-filter-url.mapper';
import { UisClientInterface } from '../../domain/interface/uis-client.interface';

@Injectable()
export class UisClient implements UisClientInterface {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  public async getStatisticByClientFilter(filter: ClientFilterDto) {
    const urlPrefix =
      'https://api.uis.unesco.org/sdmx/data/UNESCO,EDU_NON_FINANCE,3.0/';
    const urlSuffix = '&format=sdmx-json&locale=en';

    const url = `${urlPrefix}${ClientFilterUrlMapper.mapClientFilterToQueryUrl(
      filter,
    )}${urlSuffix}`;

    return this.get(url);
  }

  public async getFilterStructureByClientFilter(filter: ClientFilterDto) {
    const urlPrefix =
      'https://api.uis.unesco.org/sdmx/data/UNESCO,EDU_NON_FINANCE,3.0/';
    const urlSuffix =
      '&dimensionAtObservation=AllDimensions&detail=structureOnly';

    const url = `${urlPrefix}${ClientFilterUrlMapper.mapClientFilterToQueryUrl(
      filter,
    )}${urlSuffix}`;

    return this.get(url);
  }

  private async get(url: string) {
    const urlWithSubscriptionKey =
      url + '&subscription-key=' + this.configService.get('unescoApiKey');

    return this.httpService
      .get(urlWithSubscriptionKey, {
        headers: {
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        },
      })
      .toPromise();
  }
}
