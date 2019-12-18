import dependencyContainer from './di-config/inversify.config';
import Express from './modules/server/express';
import {TYPES} from './di-config/types';
import {MongoDBClientProvider} from "./types/types";

/**
 * This is the app entry point, where the object graph is constructed using an inversify container
 * First a connection to the mongo database is created
 * Afterwards the express server starts
 */
const connect = dependencyContainer.get<MongoDBClientProvider>(TYPES.MONGO_DB_CLIENT_PROVIDER);
const app = dependencyContainer.get<Express>(TYPES.EXPRESS);

(async () => {
    await connect();
    await app.start()
})();
