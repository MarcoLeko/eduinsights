import { Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { StatisticGeneratorService } from '../application/statistic-generator.service';

@Controller('api/v1/dynamic-statistics')
export class DynamicStatisticsController {
  constructor(
    private readonly statisticGeneratorService: StatisticGeneratorService,
  ) {}

  @Post('/categories/statistic')
  async getStatisticFromQuery(
    @Body() clientBody: { [key: string]: string },
  ): Promise<any> {
    const geoData = await this.statisticGeneratorService.getAggregatedStatisticGeoData(
      clientBody,
    );

    if (!geoData) {
      throw new NotFoundException('Geo data could not be fetched not found');
    }

    return geoData;
  }
}
