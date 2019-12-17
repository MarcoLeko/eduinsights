import {MongoClient, MongoClientOptions} from "mongodb";

export default function connectorInstance(): MongoClient {
    const userName: string = process.env.DB_USERNAME as string;
    const password: string = process.env.DB_PASSWORD as string;
    const URI: string = `mongodb://127.0.0.1:27017`;
    // const URI: string = `mongodb+srv://${userName}:${password}@help-educate-vj2pu.mongodb.net?retryWrites=true&w=majority`;
    return new MongoClient(URI, {
        useNewUrlParser:    true,
        useUnifiedTopology: true
    } as MongoClientOptions);

}