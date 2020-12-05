import environment, {
  Environment,
} from '../../backend/src/modules/utils/environment';
import { Logger } from '@nestjs/common';

const logger = new Logger('Configuration');

const CONFIG_PRODUCTION = {
  env: environment,
  PATH_TO_STATIC_FILES: 'web/build',
  PORT: process.env.PORT,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
};

const CONFIG_LOCAL = Object.assign({}, CONFIG_PRODUCTION, {
  PATH_TO_STATIC_FILES: '../web/build',
});

const config =
  environment === Environment.local
    ? CONFIG_LOCAL
    : environment === Environment.production && CONFIG_PRODUCTION;

export default () => {
  return {
    port: parseInt(config.PORT, 10) || 3000,
    database: {
      username: config.DB_USERNAME,
      password: config.DB_PASSWORD,
    },
  };
};
