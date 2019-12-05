import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import Https from 'https';
import fs from 'fs';
import express from 'express';
import {joinDir} from '../utils/paths';
import {TYPES} from '../../di-config/types';
import MongoDBClient from '../db/mongo-db-client';
import CredentialHelper from '../db/credential-helper';
import {User} from '../../types/types';
import cors from 'cors';
import session from 'express-session';
import connectStore from 'connect-mongo';
import isProduction from '../utils/environment';
import cookieParser = require('cookie-parser');

@injectable()
export default class Express {

    private static COOKIE_SETTINGS = {
        sameSite: true,
        secure: isProduction,
        maxAge: 2 * 60 * 60 * 1000,
    };

    private static readonly PORT: any = process.env.PORT;
    public app: express.Application;
    public server: Https.Server;
    private MongoStore = connectStore(session);

    constructor(
        @inject(TYPES.MONGO_DB_CLIENT) private mongoDBClient: MongoDBClient
    ) {
        this.app = express();
        this.createServer();
    }

    public init() {
        this.setUpMiddleware();
        this.setUpRoutes();
        this.server.listen(Express.PORT, '0.0.0.0', () => {
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

    private setUpMiddleware() {
        this.app.disable('x-powered-by');
        this.app.use(cookieParser());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(session({
            name: 'sid',
            secret: process.env.SESSION_SECRET as string,
            saveUninitialized: false,
            resave: false,
            store: new this.MongoStore({
                client: this.mongoDBClient.mongoClient,
                // @ts-ignore
                dbName: 'users',
            }),
            cookie: Express.COOKIE_SETTINGS
        }));
        this.app.use(express.static(joinDir(isProduction ? 'build/web/build' : '../web/build')));
        this.app.use(cors({
            credentials: true,
            origin: 'http://localhost:4200',
            optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
        }));
        this.app.use(express.static(joinDir('../web/build')));
    }

    private setUpRoutes() {
        this.app.get('/charities', async (request, response) => {
            response.send(await this.mongoDBClient.getCollectionOfCharities());
        });

        this.app.get('/statistics/:type', async (request, response) => {
            const kindOfStatistics = (<any>request.params).type;
            response.send(await this.mongoDBClient.getStatisticsCollection(kindOfStatistics));
        });

        this.app.post('/login', async (request:any , response: any) => {
            const {email, password} = request.body;
            this.mongoDBClient.findUser(email).then((user) => {
                if (!user) {
                    response.status(401).json({error: 'Incorrect email or password'});
                } else {
                    CredentialHelper.compare(password, user.password).then((truthy) => {
                        if (truthy) {
                        const { firstName, lastName, avatarColor, email} = user;
                            Object.assign(request.session, {user: {uid: user._id}});
                            console.log(request.session);
                            response.status(200).json({
                                isAuthenticated: true, firstName, lastName, avatarColor, email
                            });
                        } else {
                            response.status(401).json({error: 'Incorrect email or password'});
                        }
                    })
                        .catch(() => response.status(500).json({error: 'Internal error please try again'}));
                }
                response.status(200).json('Successfully logged in!');
            })
                .catch(() => response.status(500).json({error: 'Internal error please try again'}));
        });

        this.app.post('/register', (request: any, response: any) => {
            const {firstName, lastName, avatarColor, email, password}: User = request.body;
            this.mongoDBClient.addUser({firstName, lastName, avatarColor, email, password} as User)
                .then(({insertedId}) => {
                    Object.assign(request.session, {user: {uid: insertedId}});
                    console.log(request.session);
                    response.status(200).json({
                        isAuthenticated: true, firstName, lastName, avatarColor, email});
                })
                .catch((e) => {
                    response.status(400).send('User already registered.');
                    console.log(e);
                });
        });
        this.app.delete('/logout', ({session}: any, response: any) => {
            if(session.user) {
                session.destroy();
                response.clearCookie('sid');
            } else {
                response.status(200).send('Not logged in.');
            }
        })
    }

    public sessionValidator(request: any, response: any, next: Function) {
        const sessionId = request.cookies.sid;
        if (sessionId && !request.session.user) {
            response.clearCookie('sid');
        } else if (request.session.user && request.cookies.sid && this.mongoDBClient.compareSessionIds(request.session.user.uid, sessionId)) {
            next();
        } else {
            response.status(200).json({isAuthenticated: false});

        }
    }
}
