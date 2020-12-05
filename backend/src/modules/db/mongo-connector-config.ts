import { MongoClient, MongoClientOptions } from "mongodb";

export default function connectorInstance(
  username: string,
  password: string
): MongoClient {
  const URI: string = `mongodb+srv://${username}:${password}@eduinsights.vj2pu.mongodb.net?retryWrites=true&w=majority`;
  return new MongoClient(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as MongoClientOptions);
}
