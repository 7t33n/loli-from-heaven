import * as express from 'express';
import { Request, Response, IRouter } from 'express'
import IControllerBase from './../interfaces/IControllerBase.interface'

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
                url: '/pages/1/',
            },
        ])
    };

    getPageById = async (req: Request, res: Response) => {
        const { id } = req.params;
        // @ts-ignore
        if (id === '1') {
            res.json({
                id: 1,
                name: 'Животные',
                items: [
                    {
                        id: 101,
                        can: ['UPDATE', 'DELETE'],
                        fields: {
                            name: {
                                key: 'name',
                                value: 'Имя животного',
                            },
                            year: {
                                key: 'year',
                                value: 'Возраст, год',
                            }
                        }
                    }
                ],
            })
        } else {
            res.status(404).send('Not Found');
        }
    };
}

export default AdminController
