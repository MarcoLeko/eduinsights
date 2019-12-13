import {Container} from 'inversify';
import {TYPES} from './types';
import Express from '../modules/server/express';
import MongoDBClient from '../modules/db/mongo-db-client';
import CredentialHelper from "../modules/db/credential-helper";
import EmailCreator from "../modules/email-manager/email-creator";

const dependencyContainer = new Container();

dependencyContainer.bind(TYPES.EXPRESS).to(Express);
dependencyContainer.bind(TYPES.MONGO_DB_CLIENT).to(MongoDBClient);
dependencyContainer.bind(TYPES.HASH_GENERATOR).to(CredentialHelper);
dependencyContainer.bind(TYPES.EMAIL_CREATOR).to(EmailCreator);

export default dependencyContainer;
