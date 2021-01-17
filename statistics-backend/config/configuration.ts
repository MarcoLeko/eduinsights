import environment, { Environment } from './environment';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

let envConfig;
try {
  envConfig = dotenv.parse(fs.readFileSync('../.env'));
} catch {
  envConfig = {
    DB_USERNAME: process.env.DB_USERNAME,
    PORT: process.env.PORT,
    DB_PASSWORD: process.env.DB_PASSWORD,
    UNESCO_DEVELOPER_API_KEY: process.env.UNESCO_DEVELOPER_API_KEY,
  };
}

const CONFIG_PRODUCTION = {
  env: environment,
  PATH_TO_STATIC_FILES: '../build',
  PORT: envConfig.PORT,
  DB_USERNAME: envConfig.DB_USERNAME,
  DB_PASSWORD: envConfig.DB_PASSWORD,
  UNESCO_DEVELOPER_API_KEY: envConfig.UNESCO_DEVELOPER_API_KEY,
};

const CONFIG_DEVELOPMENT = Object.assign({}, CONFIG_PRODUCTION, {
  PATH_TO_STATIC_FILES: '../../../statistics-frontend/build',
});

const config =
  environment === Environment.development
    ? CONFIG_DEVELOPMENT
    : CONFIG_PRODUCTION;

export default () => ({
  port: parseInt(config.PORT, 10) || 3000,
  pathToStaticFiles: config.PATH_TO_STATIC_FILES,
  unescoApiKey: config.UNESCO_DEVELOPER_API_KEY,
  database: {
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
  },
});
