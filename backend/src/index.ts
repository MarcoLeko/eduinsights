import dependencyContainer from './di-config/inversify.config';
import Express from './modules/server/express';
import {TYPES} from './di-config/types';

const app = dependencyContainer.get<Express>(TYPES.EXPRESS);

app.init();
