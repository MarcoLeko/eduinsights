import dependencyContainer from './di-config/inversify.config';
import MongoDBClient from './modules/db/mongo-db-client';
import Express from './modules/server/express';
import {TYPES} from './di-config/types';

const app = dependencyContainer.get<Express>(TYPES.EXPRESS);

(async () => app.start())();
