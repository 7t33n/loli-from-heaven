import * as axios from 'axios';
import * as express from 'express';
import { Request, Response, IRouter } from 'express'
import IControllerBase from './../interfaces/IControllerBase.interface'
import * as shelterData from './../mock/shelter.json';

class ShelterController implements IControllerBase {
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes(): IRouter {
        this.router.get('/shelters', this.get)
        this.router.get('/shelters/:id', this.getById)
        return this.router;
    }

    get = async (req: Request, res: Response) => {
        res.json(shelterData);
    }

    getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const response = shelterData.find((item) => (item.ID === parseInt(id, 10)));
        res.json(response);
    }
}

export default ShelterController
