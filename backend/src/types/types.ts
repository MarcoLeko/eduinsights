import MongoDBClient from "../modules/db/mongo-db-client";

export interface User extends UserCredentials {
    _id: string,
    firstName: string,
    lastName: string,
    avatarColor: string,
    emailVerified: boolean
}

export interface UserCredentials {
    email: string,
    password: string
}

export interface UserValidationToken {
    _id: string,
    expireAt: Date,
    uid: string,
    token: string,
}

export type MongoDBClientProvider = () => Promise<MongoDBClient>;
