import {injectable} from "inversify";
import bcrypt from 'bcryptjs';

@injectable()
export default class HashGenerator {

    private static readonly BCRYPT_SALT_ROUNDS = 9;

    public static hash(input: string): Promise<string | void> {
        return bcrypt.hash(input, HashGenerator.BCRYPT_SALT_ROUNDS)
            .catch(e => console.log(e))
    }

    public static compare(first: string, hash: string): Promise<boolean | void> {
        return bcrypt.compare(first, hash)
            .catch(e => console.log(e));
    }
}