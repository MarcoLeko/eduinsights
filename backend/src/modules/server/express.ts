import 'reflect-metadata';
import {inject, injectable, multiInject} from 'inversify';
import Http from 'http';
import express from 'express';
import {resolveDir} from '../utils/paths';
import {TYPES} from '../../di-config/types';
import MongoDBClient from '../db/mongo-db-client';
import cors from 'cors';
import session from 'express-session';
import connectStore from 'connect-mongo';
import isProduction from '../utils/environment';
import AbstractRoutes from './routes/abstract-routes';
import cookieParser = require('cookie-parser');

@injectable()
export default class Express {

    private static readonly PORT: any = process.env.PORT;
    public app: express.Application;
    public server: Http.Server;
    private MongoStore = connectStore(session);
    private readonly environmentalProps: any;

    constructor(
        @inject(TYPES.MONGO_DB_CLIENT) private mongoDBClient: MongoDBClient,
        @inject(TYPES.ENVIRONMENTAL_CONFIG) private environmentFactory: Function,
        @multiInject(TYPES.ABSTRACT_ROUTES) private routeManager: AbstractRoutes[]
    ) {
        this.app = express();
        this.server = new Http.Server(this.app);
        this.environmentalProps = this.environmentFactory(isProduction);
    }

    public start() {
        return this.initServer()
            .then(console.log);
    }

    private async initServer() {
        this.createMiddleware();
        this.assignRouteEndpoints();
        return new Promise((resolve) => this.server.listen(Express.PORT, () => resolve(`Server listens on Port ${Express.PORT}`)));
    }

    private createMiddleware() {
        this.app.disable('x-powered-by');
        this.app.use(cookieParser());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(cors({credentials: true, origin: 'http://localhost:4200', optionsSuccessStatus: 200}));
        this.app.use(session({
            name: 'sid',
            secret: process.env.SESSION_SECRET as string,
            saveUninitialized: false,
            resave: false,
            store: new this.MongoStore({client: this.mongoDBClient.connectionMiddlewareProp, dbName: 'users'} as any),
            cookie: {
                sameSite: true,
                secure: this.environmentalProps.SECURE_COOKIE,
                maxAge: 365 * 24 * 60 * 60 * 1000, // defaults to one year
            }
        }));
        this.app.use(express.static(resolveDir(this.environmentalProps.PATH_TO_STATIC_FILES)));
    }

    private assignRouteEndpoints() {
        this.routeManager.map((route: AbstractRoutes) =>
            this.app.use(route.ROUTE_PARAMS, route.getRoutes())
        );
    }
}
