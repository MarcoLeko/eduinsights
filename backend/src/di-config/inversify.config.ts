import {Container} from 'inversify';
import {TYPES} from './types';
import Express from '../express';

const dependencyContainer = new Container();

dependencyContainer.bind(TYPES.EXPRESS).to(Express);

export default dependencyContainer;
