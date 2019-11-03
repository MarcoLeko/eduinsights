import depencyContainer from './di-config/inversify.config';
import Express from './express';
import {TYPES} from './di-config/types';

const app = depencyContainer.get<Express>(TYPES.EXPRESS);

app.start();
