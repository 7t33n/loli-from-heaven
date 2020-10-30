import * as express from 'express';
import * as cote from 'cote';
import { Request, Response, IRouter } from 'express'
import IControllerBase from './../interfaces/IControllerBase.interface'

class AuthController implements IControllerBase {
    public paths = ['/']
    public router = express.Router()
    public users
    private requester

    constructor() {
        this.requester = this.initRequester();
        this.initRoutes()
    }

    public initRoutes(): IRouter {
        this.router.post('/', this.get)
        return this.router;
    }

    get = async (req: Request, res: Response) => {
		res.json({ api: 'work' });
    }

    private initRequester = () => (
        new cote.Requester({
            name: 'auth requester'
        })
    );
}

export default AuthController
