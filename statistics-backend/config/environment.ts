const environment: Environment = process.env.NODE_ENV as Environment;

export enum Environment {
  test = 'test',
  development = 'development',
  production = 'production',
}

export default environment;
