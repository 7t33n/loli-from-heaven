import * as express from 'express';
import { Request, Response, IRouter } from 'express'
import IControllerBase from './../interfaces/IControllerBase.interface'

class HomeController implements IControllerBase {
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes(): IRouter {
        this.router.get('/', this.get)
        return this.router;
    }

    get = async (req: Request, res: Response) => {
		res.json({ api: 'work' });
    }
}

export default HomeController
