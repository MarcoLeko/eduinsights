import {MongoClient, MongoClientOptions, ObjectId} from 'mongodb';
import {injectable} from 'inversify';
import {User} from '../../types/types';
import CredentialHelper from './credential-helper';

@injectable()
export default class MongoDBClient {
    private static readonly userName: string = process.env.DB_USERNAME as string;
    private static readonly password: string = process.env.DB_PASSWORD as string;
    private static readonly URI: string = `mongodb+srv://${MongoDBClient.userName}:${MongoDBClient.password}@help-educate-vj2pu.mongodb.net?retryWrites=true&w=majority`;

    private connectionManager: MongoClient;
    public mongoClient: MongoClient = new MongoClient(MongoDBClient.URI, {useNewUrlParser: true, useUnifiedTopology: true} as MongoClientOptions);

    public connect(): Promise<void| string> {
        return this.mongoClient.connect()
            .then((mongoClient: MongoClient) => this.connectionManager = mongoClient)
            .then(() => this.setupDBIndexes())
            .catch((e: Error) => console.log('Could not connect to mongo server: ' + e));
    }

    private setupDBIndexes() {
        return this.connectionManager.db('users').collection('email').createIndex( {"email": 1} as Object, {unique: true})
    }

    public getCollectionOfCharities() {
        return this.connectionManager.db('organization').collection('list').find().limit(3).toArray()
            .then((result: any) => console.log(JSON.stringify(result)))
            .catch((e: Error) => console.log('Could not fetch collection due to: ', e));
    }

    public getStatisticsCollection(params: string): Promise<unknown> {
        switch (params) {
            case 'internet-access':
                const cursor = this.connectionManager.db('map-statistics').collection('internet-access').find({}, {
                    projection: {
                        type: true,
                        features: true,
                        _id: false
                    }
                });

                return cursor.next();
            default:
                return this.connectionManager.db('map-statistics').collection('internet-access').find({}).next();
        }
    }

    public async addUser({ firstName, lastName, avatarColor, email, password } : User) {
        const passwordHashed: string = await CredentialHelper.hash(password);
        return this.connectionManager.db('users').collection<User>('email').insertOne(
        { firstName, lastName, avatarColor, email, password: passwordHashed }
        )
    }

    public async findUserByEmail(email: string) {
        return this.connectionManager.db('users').collection<User>('email').findOne({email})
    }

    public async findUserByID(id: string) {
        return this.connectionManager.db('users').collection<User>('email').findOne({"_id": new ObjectId(id)} as any)
    }

    public async compareSessionIds(uid: string, sid: string) {
        const user = await this.connectionManager.db('users').collection<User>('sessions').findOne({uid});
        return user && user._id === sid;
    }
}
