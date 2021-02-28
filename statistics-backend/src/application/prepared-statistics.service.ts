import { Injectable } from '@nestjs/common';
import { PreparedStatisticsExampleRepository } from '../infrastructure/prepared-statistics-example.repository';
import { PreparedStatisticsExampleListRepository } from '../infrastructure/prepared-statistics-example-list.repository';

@Injectable()
export class PreparedStatisticsService {
  constructor(
    private preparedStatisticsExampleRepository: PreparedStatisticsExampleRepository,
    private preparedStatisticsExampleListRepository: PreparedStatisticsExampleListRepository,
  ) {}

  getPreparedStatisticsById(key: string) {
    return this.preparedStatisticsExampleRepository.getPreparedStatisticsExampleByKey(
      key,
    );
  }

  getPreparedStatisticsList() {
    return this.preparedStatisticsExampleListRepository.getPreparedStatisticsExamplesList();
  }
}
