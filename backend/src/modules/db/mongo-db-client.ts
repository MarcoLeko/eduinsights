import {MongoClient, MongoClientOptions} from 'mongodb';
import {injectable} from 'inversify';
import {User} from "../../types/types";

@injectable()
export default class MongoDBClient {
    private static readonly userName: string = process.env.DB_USERNAME || '';
    private static readonly password: string = process.env.DB_PASSWORD || '';
    private uri: string = `mongodb+srv://${MongoDBClient.userName}:${MongoDBClient.password}@help-educate-vj2pu.mongodb.net/test?retryWrites=true&w=majority`;

    private mongoClient: MongoClient = new MongoClient(this.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as MongoClientOptions);

    private connectionManager: MongoClient;

    public connect(): Promise<MongoClient | void> {
        return this.mongoClient.connect()
            .then((mongoClient: MongoClient) => this.connectionManager = mongoClient)
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
                        '_id': false
                    }
                });
                return cursor.next();
            default:
                return this.connectionManager.db('map-statistics').collection('internet-access').find({}).next();
        }
    }

    public postNewUser(email: string, password: string) {
        return this.connectionManager.db('users').collection<User>('email').insertOne({
            email, password
        })
    }
}
