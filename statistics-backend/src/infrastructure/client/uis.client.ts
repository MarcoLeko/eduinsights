import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UisClientInterface } from '../../domain/uis-client.interface';

@Injectable()
export class UisClient implements UisClientInterface {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  public async get(url: string) {
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
