import {Container} from 'inversify';
import {TYPES} from './types';
import Express from '../modules/server/express';

const dependencyContainer = new Container();

dependencyContainer.bind(TYPES.EXPRESS).to(Express);

export default dependencyContainer;
