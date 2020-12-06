import { Test, TestingModule } from '@nestjs/testing';
import { MapStatisticsController } from './map-statistics.controller';
import { MapStatisticsService } from './map-statistics.service';

describe('AppController', () => {
  let mapStatisticsController: MapStatisticsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MapStatisticsController],
      providers: [MapStatisticsService],
    }).compile();

    mapStatisticsController = app.get<MapStatisticsController>(
      MapStatisticsController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(mapStatisticsController.getMapStatistics()).toBe('Hello World!');
    });
  });
});
