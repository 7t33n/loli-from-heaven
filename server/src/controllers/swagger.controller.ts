import * as express from 'express';
import { IRouter } from 'express'
import IControllerBase from './../interfaces/IControllerBase.interface';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../mock/swagger.json';

class SwaggerController implements IControllerBase {
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes(): IRouter {
        this.router.use('/doc', swaggerUi.serve);
        this.router.get('/doc', swaggerUi.setup(swaggerDocument));
        return this.router;
    }
}

export default SwaggerController
