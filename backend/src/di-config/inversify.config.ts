import {Container} from 'inversify';
import {TYPES} from './types';
import Express from '../modules/server/express';
import SocketServer from '../modules/server/socket-server';
import MongoDBClient from '../modules/db/mongo-db-client';
import CredentialHelper from "../modules/db/credential-helper";

const dependencyContainer = new Container();

dependencyContainer.bind(TYPES.EXPRESS).to(Express);
dependencyContainer.bind(TYPES.SOCKET_SERVER).to(SocketServer);
dependencyContainer.bind(TYPES.MONGO_DB_CLIENT).to(MongoDBClient);
dependencyContainer.bind(TYPES.HASH_GENERATOR).to(CredentialHelper);

export default dependencyContainer;
