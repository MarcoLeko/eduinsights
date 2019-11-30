import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import Https from 'https';
import fs from 'fs';
import express from 'express';
import {joinDir} from '../utils/paths';
import {TYPES} from '../../di-config/types';
import MongoDBClient from '../db/mongo-db-client';
import bodyParser from 'body-parser';
import CredentialHelper from "../db/credential-helper";
import cookieParser = require("cookie-parser");
import {User} from '../../types/types';
import cors from 'cors';

@injectable()
export default class Express {

    private static readonly PORT: any = process.env.PORT;
    public app: express.Application;
    public server: Https.Server;

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
        this.app.use(cookieParser());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());
        this.app.use(cors({
            origin: 'http://localhost:4200',
            optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
        }));
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

        this.app.post('/login', async (request, response) => {
            const {email, password} = request.body;
            this.mongoDBClient.findUser(email).then((user) => {
                if (!user) {
                    response.status(401).json({error: 'Incorrect email or password'});
                } else {
                    CredentialHelper.compare(password, user.password).then((truthy) => {
                        if (truthy) {
                            const payload = {email};
                            const token = CredentialHelper.JWTSign(payload, `${email}-${new Date()}`);
                            response.cookie('token', token, {httpOnly: true}).sendStatus(200);
                        } else {
                            response.status(401).json({error: 'Incorrect email or password'});
                        }
                    })
                        .catch(() => response.status(500).json({error: 'Internal error please try again'}))
                }
                response.status(200).send("Successfully logged in!");
            })
                .catch(() => response.status(500).json({error: 'Internal error please try again'}))
        });

        this.app.post('/register', (request, response) => {
            console.log(request.body);
            const { firstName, lastName, avatarColor, email, password }: User = request.body;
            this.mongoDBClient.addUser({ firstName, lastName, avatarColor, email, password } as User)
                .then(() => response.status(200).send("Successfully registered."))
                .catch((e: Error) => response.status(400).send("Registration failed: " + e))
        })
    }

    public withToken(request: any, response: any, next: Function) {
        const token = request.cookies.token;
        if (!token) {
            response.status(401).send('Unauthorized: No token provided');
        } else {
            CredentialHelper.compareJWT(token, 'someObject').then((decoded: any) => {
                request.email = decoded.email;
                next();
            })
        }
    }
}
