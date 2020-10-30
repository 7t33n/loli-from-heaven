import * as express from 'express';
import { Request, Response, IRouter } from 'express'
import IControllerBase from './../interfaces/IControllerBase.interface'

class AuthController implements IControllerBase {
    public paths = ['/']
    public router = express.Router()
    public users
    private requester

    constructor() {
        this.initRoutes()
    }

    public initRoutes(): IRouter {
        this.router.post('/', this.get)
        return this.router;
    }

    get = async (req: Request, res: Response) => {
		res.json({ api: 'work' });
    }
}

export default AuthController