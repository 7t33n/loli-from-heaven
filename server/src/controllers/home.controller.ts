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
        this.router.get('/404', this.error404)
        return this.router;
    }

    get = async (req: Request, res: Response) => {
		res.json({ api: 'work' });
    }

    error404 = async (req: Request, res: Response) => {
        res.status(404).send('Not Found');
    }
}

export default HomeController
