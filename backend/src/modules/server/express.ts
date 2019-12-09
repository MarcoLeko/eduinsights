import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import Http from 'http';
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
        maxAge: 24 * 60 * 60 * 1000, // defaults to one day
    };

    private static readonly PORT: any = process.env.PORT;
    public app: express.Application;
    public server: Http.Server;
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
        this.server = new Http.Server(this.app);
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
            // @ts-ignore
            store: new this.MongoStore({client: this.mongoDBClient.mongoClient, dbName: 'users',}),
            cookie: Express.COOKIE_SETTINGS
        }));
        this.app.use(express.static(joinDir(isProduction ? 'build/web/build' : '../web/build')));
        this.app.use(cors({credentials: true, origin: 'http://localhost:4200', optionsSuccessStatus: 200}));
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

        this.app.get('/check/logged-in', (request: any, response: any) => {
            const sessionId = request.cookies.sid;
            const uid = request.session?.user?.uid;
            if (sessionId && uid && this.mongoDBClient.compareSessionIds(uid, sessionId)) {
                this.mongoDBClient.findUserByID(request.session.user.uid).then(user => {
                    response.status(200).json({isAuthenticated: true, ...user});
                });
            } else {
                response.clearCookie('sid');
                request.session.destroy();
                response.status(440).json({isAuthenticated: false});
            }
        });

        this.app.post('/login', async (request: any, response: any) => {
            if (request.session && request.cookies.sid) {
                response.status(200).json({message: 'User already logged in.'});
            } else {
                const {email, password} = request.body;
                this.mongoDBClient.findUserByEmail(email).then((user) => {
                    if (!user) {
                        response.status(401).json({message: 'Incorrect email or password'});
                    } else {
                        CredentialHelper.compare(password, user.password).then(async (truthy) => {
                            if (truthy) {
                                const {firstName, lastName, avatarColor, email, persistLogin} = user;

                                if (request.body.persistLogin !== persistLogin) {
                                    await this.mongoDBClient.updateUser(email, {persistLogin: request.body.persistLogin})
                                        .catch((e: any) => console.log(e));
                                }
                                Object.assign(
                                    request.session,
                                    {user: {uid: user._id}},
                                    request.body.persistLogin && {cookie: {expires: false}}
                                );

                                response.status(200).json({
                                    isAuthenticated: true,
                                    firstName,
                                    lastName,
                                    avatarColor,
                                    email
                                });
                            } else {
                                response.status(401).json({message: 'Incorrect email or password'});
                            }
                        })
                            .catch(() => response.status(500).json({message: 'Internal error please try again'}));
                    }
                })
                    .catch(() => response.status(500).json({message: 'Internal error please try again'}));
            }
        });

        this.app.post('/register', (request: any, response: any) => {
            const {firstName, lastName, avatarColor, email, password}: User = request.body;
            this.mongoDBClient.addUser({firstName, lastName, avatarColor, email, password, persistLogin: false} as User)
                .then(({insertedId}) => {
                    Object.assign(request.session, {user: {uid: insertedId}});
                    console.log(request.session);
                    response.status(200).json(<any>{
                        isAuthenticated: true, firstName, lastName, avatarColor, email
                    });
                })
                .catch(() => {
                    response.status(401).json({message: 'User already registered.'});
                });
        });
        this.app.delete('/logout', ({session, cookies}: any, response: any) => {
            if (session.user) {
                response.clearCookie('sid');
                session.destroy();
                response.status(200).json({authenticated: false});
            } else {
                response.status(200).json({message: 'Not logged in.'});
            }
        });
    }
}
