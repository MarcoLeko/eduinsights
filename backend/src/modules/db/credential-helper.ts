import {injectable} from "inversify";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
@injectable()
export default class CredentialHelper {

    private static readonly BCRYPT_SALT_ROUNDS = 9;

    public static hash(input: string): Promise<string> {
        return bcrypt.hash(input, CredentialHelper.BCRYPT_SALT_ROUNDS)
            .catch(e => {
                throw new Error(e);
            });
    }

    public static compare(first: string, hash: string): Promise<boolean> {
        return bcrypt.compare(first, hash)
            .catch(e => {
                throw new Error(e);
            });
    }

    public static compareJWT(token: string, secretOrPublicKey: string) {
    return new Promise<string | Object>((resolve, reject) => {
        jwt.verify(token, secretOrPublicKey, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded)
            }
        });
    })
    }

    public static JWTSign(payload: Object, key: string) {
        return jwt.sign(payload, key, {
            expiresIn: '365d'
        });
    }
}