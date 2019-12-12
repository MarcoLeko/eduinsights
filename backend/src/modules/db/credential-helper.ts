import {injectable} from 'inversify';
import bcrypt from 'bcryptjs';

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
}
