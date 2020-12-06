import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

export const DatabaseModule = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
      retryAttempts: 5,
      retryDelay: 3000,
      uri: `mongodb+srv://${configService.get(
        'database.username',
      )}:${configService.get(
        'database.password',
      )}@eduinsights.vj2pu.mongodb.net/statistics`,
    }),
  inject: [ConfigService],
});
