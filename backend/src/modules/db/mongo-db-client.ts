import { MongoClient } from "mongodb";
import { inject, injectable } from "inversify";
import connectorInstance from "./mongo-connector-config";
import { TYPES } from "../../di-config/types";
import environment from "../utils/environment";

@injectable()
export default class MongoDBClient {
  private connectionMiddleware: MongoClient;
  private readonly mongoClient: MongoClient;

  constructor(
    @inject(TYPES.ENVIRONMENTAL_CONFIG) private environmentFactory: Function
  ) {
    const { DB_USERNAME, DB_PASSWORD } = this.environmentFactory(environment);
    this.mongoClient = connectorInstance(DB_USERNAME, DB_PASSWORD);
  }

  get connectionMiddlewareProp(): MongoClient {
    return this.mongoClient;
  }

  public connect(): Promise<void | MongoClient> {
    return this.mongoClient
      .connect()
      .then(
        (mongoClient: MongoClient) => (this.connectionMiddleware = mongoClient)
      )
      .catch((e: Error) =>
        console.log("Could not connect to mongo server: " + e)
      );
  }

  public getCollectionOfCharities() {
    return this.connectionMiddleware
      .db("organizations")
      .collection("charities")
      .find()
      .toArray();
  }

  public getStatisticsCollection(params: string): Promise<unknown> {
    switch (params) {
      case "internet-access":
        const cursor = this.connectionMiddleware
          .db("map-statistics")
          .collection("internet-access")
          .find({}, { projection: { type: true, features: true, _id: false } });

        return cursor.next();
      default:
        return this.connectionMiddleware
          .db("map-statistics")
          .collection("internet-access")
          .find({})
          .next();
    }
  }
}
