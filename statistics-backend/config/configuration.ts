import environment, { Environment } from './environment';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

const envConfig = dotenv.parse(fs.readFileSync('../.env'));

const CONFIG_PRODUCTION = {
  env: environment,
  PATH_TO_STATIC_FILES: 'web/build',
  PORT: envConfig.PORT,
  DB_USERNAME: envConfig.DB_USERNAME,
  DB_PASSWORD: envConfig.DB_PASSWORD,
};

const CONFIG_DEVELOPMENT = Object.assign({}, CONFIG_PRODUCTION, {
  PATH_TO_STATIC_FILES: '../web/build',
});

const config =
  environment === Environment.development
    ? CONFIG_DEVELOPMENT
    : CONFIG_PRODUCTION;

export default () => ({
  port: parseInt(config.PORT, 10) || 3000,
  database: {
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
  },
});
