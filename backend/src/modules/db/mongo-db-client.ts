import mongodb, {Db} from 'mongodb';
import {injectable} from 'inversify';

@injectable()
export default class MongoDBClient {
    private mongoDBclient : mongodb.MongoClient;

    connect(params: string, options: any) {

        this.mongoDBclient.connect(params, options)
            .then((db: Db) => {
                console.log('Connection to db was successful.');
                db.collection('sample_airbnb.listingsAndReviews')
            })
            .catch((e:Error) => console.log('Could not connect to database' + e));
    }

}
