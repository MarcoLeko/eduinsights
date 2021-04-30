import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UisClient {
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
