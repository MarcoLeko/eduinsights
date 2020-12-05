import { Injectable } from '@nestjs/common';

@Injectable()
export class MapStatisticsService {
  constructor() {}

  getInternetAccess(): string {
    return 'Hello internet access!';
  }
}
