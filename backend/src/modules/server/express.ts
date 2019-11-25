import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import Https from 'https';
import fs from 'fs';
import express from 'express';
import {joinDir} from '../utils/paths';
import {TYPES} from '../../di-config/types';
import SocketServer from './socket-server';
import MongoDBClient from '../db/mongo-db-client';
import bodyParser from 'body-parser';

@injectable()
export default class Express {

    private static readonly PORT: any = process.env.PORT;
    public app: express.Application;
    public server: Https.Server;

    constructor(
        @inject(TYPES.SOCKET_SERVER) private socketServer: SocketServer,
        @inject(TYPES.MONGO_DB_CLIENT) private mongoDBClient: MongoDBClient
    ) {
        this.app = express();
        this.createServer();
        this.socketServer.connectToStaticServer(this.server);
    }

    public init() {
        this.configureMiddleware();
        this.setUpMiddleware();
        this.setUpRoutes();
        this.server.listen(Express.PORT, '0.0.0.0', () => {
            this.socketServer.setUpSocketIOHandlers();
            this.mongoDBClient.connect().then(() =>
                console.log(`Server successfully started on port: ${Express.PORT}`));
        });


    }

    private createServer() {
        const httpsOptions = {
            key: fs.readFileSync(joinDir('/ssl/key.pem')),
            cert: fs.readFileSync(joinDir('/ssl/cert.pem'))
        };

        this.server = new Https.Server(httpsOptions, this.app);
    }

    private configureMiddleware() {
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', 'https://localhost:4200');
            next();
        });
    }

    private setUpMiddleware() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));

        this.app.use(express.static(joinDir('../web/build')));
    }

    private setUpRoutes() {
        this.app.get('/charities', async (request, response) => {
            response.send(await this.mongoDBClient.getCollectionOfCharities())
        });

        this.app.get('/statistics/:type', async (request, response) => {
            const kindOfStatistics = (<any>request.params).type;
            response.send(await this.mongoDBClient.getStatisticsCollection(kindOfStatistics))
        });

        this.app.post('/register', async (request, response) => {
            const {email, password} = request.body;
            this.mongoDBClient.addUser(email, password)
                .then(() => response.status(200).send("Successfully logged in!"))
                .catch(e => response.status(400).send("Login failed." + e))
        });
    }
}
