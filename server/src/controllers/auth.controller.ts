import * as express from 'express';
import * as cote from 'cote';
import { Request, Response, IRouter } from 'express'
import IControllerBase from './../interfaces/IControllerBase.interface'

class AuthController implements IControllerBase {
    public paths = ['/signin', '/update', '/signout']
    public router = express.Router()
    public users
    private requester

    constructor() {
        this.requester = this.initRequester();
        this.initRoutes()
    }

    public initRoutes(): IRouter {
        this.router.post('/signin', this.post)
        return this.router;
    }

    post = async (req: Request, res: Response) => {
        console.log('send to signin');
        const response = await this.requester.send({
            type: 'signin',
            data: {
                username: '1',
                password: '1',
            }
        });
        console.log(response);
    }

    private initRequester = () => (
        new cote.Requester({
            name: 'auth requester'
        })
    );
}

export default AuthController
