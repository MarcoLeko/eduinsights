const environment: Environment = process.env.NODE_ENV as Environment;

export enum Environment {
    local = 'local',
    development = 'development',
    production = 'production'
}

export default environment;
