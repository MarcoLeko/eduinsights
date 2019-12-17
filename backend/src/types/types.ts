import MongoDBClient from "../modules/db/mongo-db-client";

export interface User extends UserCredential {
    _id: string,
    firstName: string,
    lastName: string,
    avatarColor: string,
    emailVerified: boolean
}

export interface UserCredential {
    email: string,
    password: string
}

export interface UserToken {
    _id: string,
    expireAt: Date,
    uid: string,
    token: string,
}

export type MongoDBClientProvider = () => Promise<MongoDBClient>;
