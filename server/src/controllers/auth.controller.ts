import * as express from 'express';
import { Request, Response, IRouter } from 'express'
import IControllerBase from './../interfaces/IControllerBase.interface'

class AuthController implements IControllerBase {
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes(): IRouter {
        this.router.get('/signin', this.signin)
        this.router.get('/signup', this.signup)
        return this.router;
    }

    signin = async (req: Request, res: Response) => {
        res.json({ signin: 'work' });
    }

    signup = async (req: Request, res: Response) => {
        res.json({ signup: 'work' });
    }
}

export default AuthController
