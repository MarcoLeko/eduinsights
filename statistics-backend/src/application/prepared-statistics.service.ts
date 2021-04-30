import { Inject, Injectable } from '@nestjs/common';
import { PreparedStatisticRepositoryInterface } from '../domain/prepared-statistic-repository.interface';

@Injectable()
export class PreparedStatisticsService {
  constructor(
    @Inject('PreparedStatisticRepositoryInterface')
    private preparedStatisticRepositoryInterface: PreparedStatisticRepositoryInterface,
  ) {}

  getPreparedStatisticsById(key: string) {
    return this.preparedStatisticRepositoryInterface.getPreparedStatisticsById(
      key,
    );
  }

  getPreparedStatisticsList() {
    return this.preparedStatisticRepositoryInterface.getPreparedStatisticsList();
  }
}
