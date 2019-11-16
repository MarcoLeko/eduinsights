import 'reflect-metadata';
import {injectable} from 'inversify';
import Https from 'https';
import SocketIO from 'socket.io';

@injectable()
export default class SocketServer {

    public io: SocketIO.Server;

    public connectToStaticServer(params: Https.Server) {
        this.io = SocketIO(params);
    }


    public setUpSocketIOHandlers() {
        this.io.on('connection', this.handleClientConnection.bind(this));
    }

    private handleClientConnection(socket: SocketIO.Socket) {
        console.log('a user connected');
        socket.on('disconnect', () => console.log('user disconnected'));
    }
}
