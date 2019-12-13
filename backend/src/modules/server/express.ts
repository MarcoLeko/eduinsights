import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import Http from 'http';
import express from 'express';
import {joinDir} from '../utils/paths';
import {TYPES} from '../../di-config/types';
import MongoDBClient from '../db/mongo-db-client';
import CredentialHelper from '../db/credential-helper';
import {User, UserToken} from '../../types/types';
import cors from 'cors';
import session from 'express-session';
import connectStore from 'connect-mongo';
import isProduction from '../utils/environment';
import cookieParser = require('cookie-parser');
import EmailCreator from "../email-manager/email-creator";

@injectable()
export default class Express {

    private static COOKIE_SETTINGS = {
        sameSite: true,
        secure: isProduction,
        maxAge: 365 * 24 * 60 * 60 * 1000, // defaults to one year
    };

    private static readonly PORT: any = process.env.PORT;
    public app: express.Application;
    public server: Http.Server;
    private MongoStore = connectStore(session);

    constructor(
        @inject(TYPES.MONGO_DB_CLIENT) private mongoDBClient: MongoDBClient,
        @inject(TYPES.EMAIL_CREATOR) private emailCreator: EmailCreator
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
        this.app.use(cors({credentials: true, origin: 'http://localhost:4200', optionsSuccessStatus: 200}));
        this.app.use(session({
            name: 'sid',
            secret: process.env.SESSION_SECRET as string,
            saveUninitialized: false,
            resave: false,
            // @ts-ignore
            store: new this.MongoStore({client: this.mongoDBClient.mongoClient, dbName: 'users'}),
            cookie: Express.COOKIE_SETTINGS
        }));
        this.app.use(express.static(joinDir(isProduction ? 'build/web/build' : '../web/build')));
    }

    private setUpRoutes() {
        this.app.get('/charities', async (request: any, response: any) => {
            response.send(await this.mongoDBClient.getCollectionOfCharities());
        });

        this.app.get('/statistics/:type', async (request: any, response: any) => {
            const kindOfStatistics = request.params.type;
            try {
                const data = await this.mongoDBClient.getStatisticsCollection(kindOfStatistics);
                response.send(data);
            } catch (e) {
                response.statusMessage = 'Could not fetch Internet-statistics';
                response.status(500).end();
            }
        });

        this.app.get('/check/logged-in', async (request: any, response: any) => {
            const sessionId = request.cookies.sid;
            const uid = request.session?.user?.uid;

            if (sessionId && uid && await this.mongoDBClient.validatedSession(uid, sessionId)) {
                const user = await this.mongoDBClient.findUserByID(uid);
                const {firstName, lastName, avatarColor, email, emailVerified} = user as User;
                response.status(200).json({isAuthenticated: Boolean(user), firstName, lastName, avatarColor, email, emailVerified});
            } else {
                response.clearCookie('sid');
                request.session.destroy();
                response.status(200).end();
            }
        });

        this.app.post('/login', async (request: any, response: any) => {
            try {
                const {email, password} = request.body;
                const user = await this.mongoDBClient.findUserByEmail(email);

                if (!user) {
                    response.statusMessage = 'Incorrect email or password.';
                    response.status(401).end();
                } else {
                    const truthy = await CredentialHelper.compare(password, user.password);
                    if (truthy) {
                        const {firstName, lastName, avatarColor, email} = user;

                        Object.assign(
                            request.session,
                            {user: {uid: user._id}}
                        );

                        response.status(200).json({isAuthenticated: Boolean(user), firstName, lastName, avatarColor, email});
                    } else {
                        response.statusMessage = 'Incorrect email or password.';
                        response.status(401).end();
                    }
                }
            } catch (e) {
                response.statusMessage = 'Internal error please try again.';
                console.log(e);
                response.status(500).end();
            }

        });

        this.app.post('/register', (request: any, response: any) => {
                const {firstName, lastName, avatarColor, email, password}: User = request.body;
                this.mongoDBClient.addUser({firstName, lastName, avatarColor, email, password, emailVerified: false} as User)
                    .then(({insertedId}) => {
                        Object.assign(request.session, {user: {uid: insertedId}});
                        response.status(200).json({isAuthenticated: Boolean(insertedId), firstName, lastName, avatarColor, email, emailVerified: false});
                        return insertedId;
                    })
                    .catch(() => {
                        response.statusMessage = 'User already registered.';
                        response.status(401).end();
                    })
                    .then((uid) => this.emailCreator.sendEmailVerificationLink({email, uid,  firstName}))
                    .catch((e) => {
                        console.log(e);
                        response.statusMessage = 'Could not send verification Email.';
                        response.status(407).end();
                    });
        });

        this.app.post('/validate-token', async (request: any, response: any) => {
            const {token}: UserToken = request.body;
            const uid = request.session?.user?.uid;

            // TODO: validate token here and send response accordingly
        });

        this.app.delete('/logout', ({session, cookies}: any, response: any) => {
            if (session.user) {
                response.clearCookie('sid');
                session.destroy();
                response.status(200).json({authenticated: false});
            } else {
                response.statusMessage = 'Not logged in.';
                response.status(409).end();
            }
        });
    }
}
