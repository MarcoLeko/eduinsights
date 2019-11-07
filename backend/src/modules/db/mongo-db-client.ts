import {MongoClient, MongoClientOptions} from 'mongodb';
import {injectable} from 'inversify';

@injectable()
export default class MongoDBClient {
    private static readonly userName: string = process.env.DB_USERNAME || '';
    private static readonly password: string = process.env.DB_PASSWORD || '';
    private uri: string = `mongodb+srv://${MongoDBClient.userName}:${MongoDBClient.password}@help-educate-vj2pu.mongodb.net/test?ssl=true&&retryWrites=true&w=majority`;

    private mongoClient: MongoClient = new MongoClient(this.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as MongoClientOptions);

    public connect(): Promise<void> {
        return this.mongoClient.connect()
            .then((mongoClient: MongoClient) => {
                console.log('Connection to db was successful.');
                mongoClient.db('sample_geospatial').collection('shipwrecks').find().toArray()
                    .then(result => console.log(JSON.stringify(result)))
                    .catch(e => console.log('Could not fetch collection due to: ', e))
                    .then(() => mongoClient.close());

            }).catch((e: Error) => console.log('Could not connect to database ' + e));
    }

}
