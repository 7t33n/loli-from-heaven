import * as express from 'express';
import { Request, Response, IRouter } from 'express'
import IControllerBase from './../interfaces/IControllerBase.interface';
import * as adminUI from './../mock/admin-ui.json';

class AdminController implements IControllerBase {
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes(): IRouter {
        this.router.get('/admin/pages', this.getPages);
        this.router.get('/admin/pages/:id', this.getPageById);
        return this.router;
    }

    getPages = async (req: Request, res: Response) => {
        res.json([
            {
                id: 1,
                name: 'Животные',
                can: ['UPDATE', 'DELETE'],
                url: '/pages/1/',
            },
            {
                id: 1,
                name: 'Зверь',
                can: ['UPDATE'],
                url: '/pages/2/',
            },
        ])
    };

    getPageById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const response = adminUI.find((item) => (item.id === parseInt(id, 10)));
        if (response) {
            res.json(response);
        }
        res.status(404).send('Not Found');
    };
}

export default AdminController
