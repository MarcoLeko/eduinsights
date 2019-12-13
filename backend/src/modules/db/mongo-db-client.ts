import {MongoClient, MongoClientOptions, ObjectId, UpdateWriteOpResult} from 'mongodb';
import {injectable} from 'inversify';
import {User} from '../../types/types';
import CredentialHelper from './credential-helper';

@injectable()
export default class MongoDBClient {
    private static readonly userName: string = process.env.DB_USERNAME as string;
    private static readonly password: string = process.env.DB_PASSWORD as string;
    private static readonly URI: string = `mongodb+srv://${MongoDBClient.userName}:${MongoDBClient.password}@help-educate-vj2pu.mongodb.net?retryWrites=true&w=majority`;
    public mongoClient: MongoClient = new MongoClient(MongoDBClient.URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as MongoClientOptions);
    private connectionManager: MongoClient;

    public connect(): Promise<void | string> {
        return this.mongoClient.connect()
            .then((mongoClient: MongoClient) => this.connectionManager = mongoClient)
            .then(() => this.setupDBIndexes())
            .catch((e: Error) => console.log('Could not connect to mongo server: ' + e));
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

    public async addUser({firstName, lastName, avatarColor, email, password, emailVerified}: User) {
        const passwordHashed: string = await CredentialHelper.hash(password);
        return this.connectionManager.db('users').collection<User>('email').insertOne(
            {firstName, lastName, avatarColor, email, emailVerified, password: passwordHashed}
        );
    }

    public async findUserByEmail(email: string) {
        return this.connectionManager.db('users').collection<User>('email').findOne({email});
    }

    public async updateUser(email: string, toUpdate: Partial<User>): Promise<UpdateWriteOpResult> {
        return this.connectionManager.db('users').collection<User>('email').updateOne({email: email}, {'$set': toUpdate});
    }

    public async findUserByID(id: string) {
        return this.connectionManager.db('users').collection<User>('email').findOne({'_id': new ObjectId(id)} as any);
    }

    public async validatedSession(uid: string, sid: string) {
        // An mongoDB-Id is a 12 Bytes long string - The session cookie of a 24 Bytes string
        // A session id is looking like: s%3Avvui1vsldkCor7CE-E0aU8Fmpg_z-f4c.3c43w5lavEdUmfjvzkubCXxy7VctVp4XaBhs7sj11%2F0
        // A db-id is composed of the letter between s:(urlEncoded: s%3A) - string - .
        const mappedId = sid.replace(decodeURIComponent('s%3A'), '').split('.')[0];
        const user: any = await this.connectionManager.db('users').collection<User>('sessions').findOne({"_id": mappedId});
        return user && uid === JSON.parse(user.session).user.uid;
    }

    private setupDBIndexes() {
        return this.connectionManager.db('users').collection('email').createIndex({'email': 1} as Object, {unique: true});
    }
}
