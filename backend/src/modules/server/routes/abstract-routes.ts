import express from 'express';
import {injectable} from 'inversify';

@injectable()
export default abstract class AbstractRoutes {
    abstract ROUTE_PARAMS: string;
    public router = express.Router();

   protected abstract createEndpoints(): void;

    public getRoutes() {
        this.createEndpoints();
        return this.router;
    }
}
