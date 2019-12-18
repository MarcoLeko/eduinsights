import 'reflect-metadata';
import {Container, interfaces} from 'inversify';
import {TYPES} from './types';
import Express from '../modules/server/express';
import MongoDBClient from '../modules/db/mongo-db-client';
import CredentialHelper from "../modules/db/credential-helper";
import EmailCreator from "../modules/email-manager/email-creator";
import CONFIG_DEVELOPMENT from '../../config/env-properties.development';
import CONFIG_PRODUCTION from '../../config/env-properties.production';
import AuthRoutes from '../modules/server/routes/auth-routes';
import ApiRoutes from '../modules/server/routes/api-routes';
import AbstractRoutes from '../modules/server/routes/abstract-routes';
import {MongoDBClientProvider} from "../types/types";

const dependencyContainer = new Container();

dependencyContainer.bind<Express>(TYPES.EXPRESS).to(Express).inSingletonScope();
dependencyContainer.bind<EmailCreator>(TYPES.EMAIL_CREATOR).to(EmailCreator).inSingletonScope();
dependencyContainer.bind<AbstractRoutes>(TYPES.ABSTRACT_ROUTES).to(ApiRoutes).inTransientScope();
dependencyContainer.bind<AbstractRoutes>(TYPES.ABSTRACT_ROUTES).to(AuthRoutes).inTransientScope();
dependencyContainer.bind<MongoDBClient>(TYPES.MONGO_DB_CLIENT).to(MongoDBClient).inSingletonScope();
dependencyContainer.bind<CredentialHelper>(TYPES.HASH_GENERATOR).to(CredentialHelper).inSingletonScope();

dependencyContainer.bind<MongoDBClientProvider>(TYPES.MONGO_DB_CLIENT_PROVIDER)
    .toProvider((context) => () => context.container.get<MongoDBClient>(TYPES.MONGO_DB_CLIENT).connect());

dependencyContainer.bind<Object>(TYPES.ENVIRONMENTAL_CONFIG).toFactory(
    () => (context: interfaces.Context) => context ? CONFIG_DEVELOPMENT : CONFIG_PRODUCTION);

export default dependencyContainer;
