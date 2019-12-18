import {inject, injectable} from 'inversify';
import AbstractRoutes from './abstract-routes';
import {User, UserValidationToken} from '../../../types/types';
import CredentialHelper from '../../db/credential-helper';
import {TYPES} from '../../../di-config/types';
import MongoDBClient from '../../db/mongo-db-client';
import EmailCreator from '../../email-manager/email-creator';

@injectable()
export default class AuthRoutes extends AbstractRoutes {

    public ROUTE_PARAMS: string = '/auth';

    constructor(@inject(TYPES.MONGO_DB_CLIENT) public mongoDBClient: MongoDBClient,
                @inject(TYPES.EMAIL_CREATOR) public emailCreator: EmailCreator) {
        super();
    }

    private async checkLoggedIn(request: any, response: any) {
        const sessionId = request.cookies.sid;
        const uid = request.session?.user?.uid;

        if (sessionId && uid && await this.mongoDBClient.validatedSession(uid, sessionId)) {
            const user = await this.mongoDBClient.findUserByID(uid);
            const {firstName, lastName, avatarColor, email, emailVerified} = user as User;
            response.status(200)
                .send({isAuthenticated: Boolean(user), firstName, lastName, avatarColor, email, emailVerified});
        } else {
            response.clearCookie('sid');
            request.session.destroy();
            response.status(200)
                .end();
        }
    }

    private async login(request: any, response: any) {
        try {
            const {email, password} = request.body;
            const user = await this.mongoDBClient.findUserByEmail(email);

            if (!user) {
                response.statusMessage = 'Incorrect email or password.';
                response.status(401)
                    .end();
            } else {
                const truthy = await CredentialHelper.compare(password, user.password);
                if (truthy) {
                    const {firstName, lastName, avatarColor, email, emailVerified}: User = user;

                    Object.assign(request.session, {user: {uid: user._id}});

                    response.status(200)
                        .send({isAuthenticated: Boolean(user), firstName, lastName, avatarColor, email, emailVerified});
                } else {
                    response.statusMessage = 'Incorrect email or password.';
                    response.status(401)
                        .end();
                }
            }
        } catch (e) {
            response.statusMessage = 'Internal error please try again.';
            console.log(e);
            response.status(500)
                .end();
        }
    }

    private async register(request: any, response: any) {
        const {firstName, lastName, avatarColor, email, password}: User = request.body;
        this.mongoDBClient.addUser({firstName, lastName, avatarColor, email, password, emailVerified: false} as User)
            .then(({insertedId}: any) => {
                Object.assign(request.session, {user: {uid: insertedId}});
                response.status(200)
                    .send({isAuthenticated: Boolean(insertedId), firstName, lastName, avatarColor, email, emailVerified: false});
                return insertedId;
            })
            .catch(() => {
                response.statusMessage = 'User already registered.';
                response.status(401)
                    .end();
            })
            .then(async (uid: string) => {
                const {expireAt, token}: Partial<UserValidationToken> = await this.emailCreator.sendEmailVerificationLink({email, firstName});
                return this.mongoDBClient.addEmailVerificationToken({uid, token, expireAt} as UserValidationToken);
            })
            .catch((e: Error) => {
                console.log(e);
                response.statusMessage = 'Could not send verification Email.';
                response.status(407)
                    .end();
            });
    }

    private async validateToken(request: any, response: any) {
        const {token}: UserValidationToken = request.body;
        const uid = request.session?.user?.uid;

        const user = await this.mongoDBClient.validateEmailToken(uid, token);

        if (user) {
            await this.mongoDBClient.updateUser(uid, {emailVerified: Boolean(user)})
        }

        response.status(200)
            .send(await this.mongoDBClient.findUserByID(uid));
    }

    private async logout({session}: any, response: any) {
        if (session.user) {
            response.clearCookie('sid');
            session.destroy();
            response.status(200)
                .send({authenticated: false});
        } else {
            response.statusMessage = 'Not logged in.';
            response.status(409)
                .end();
        }
    }

    public async sendValidationEmail(request: any, response: any) {
        const uid = request.session?.user?.uid;
        const user = await this.mongoDBClient.findUserByID(uid);

        if (user) {
            try {
                const {email, firstName}: User = user;
                const {expireAt, token}: Partial<UserValidationToken> = await this.emailCreator.sendEmailVerificationLink({email, firstName});
                await this.mongoDBClient.addEmailVerificationToken({uid, token, expireAt} as UserValidationToken);
                response.status(200)
                    .send({message: 'Successfully send verification email.'});
            } catch (e) {
                response.statusMessage = 'Could not send verification email.';
                response.status(500)
                    .end();
            }
        } else {
            response.statusMessage = 'Please Login first.';
            response.status(401)
                .end();
        }

    }

    protected createEndpoints() {
        this.router.get('/check/logged-in', this.checkLoggedIn.bind(this));
        this.router.get('/send-validation-email', this.sendValidationEmail.bind(this));
        this.router.post('/login', this.login.bind(this));
        this.router.post('/register', this.register.bind(this));
        this.router.post('/validate-token', this.validateToken.bind(this));
        this.router.delete('/logout', this.logout.bind(this));
    }
}
