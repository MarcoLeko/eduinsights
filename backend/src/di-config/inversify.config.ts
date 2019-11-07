import {Container} from 'inversify';
import {TYPES} from './types';
import Express from '../modules/server/express';
import SocketServer from '../modules/server/socket-server';

const dependencyContainer = new Container();

dependencyContainer.bind(TYPES.EXPRESS).to(Express);
dependencyContainer.bind(TYPES.SOCKET_SERVER).to(SocketServer);

export default dependencyContainer;
