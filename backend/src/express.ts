import "reflect-metadata";
import { injectable} from "inversify";

@injectable()
export default class Express {

    start(): void {
        console.log('Server started!')
    }
}
