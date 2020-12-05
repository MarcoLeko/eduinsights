import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

export const DatabaseModule = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    return {
      uri: `mongodb+srv://${configService.get(
        'DATABASE_USER',
      )}:${configService.get(
        'DATABASE_PASSWORD',
      )}@eduinsights.vj2pu.mongodb.net?retryWrites=true&w=majority`,
    };
  },
  inject: [ConfigService],
});
