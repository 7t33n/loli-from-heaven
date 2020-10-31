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
        // @ts-ignore
        if (id === '1') {
            res.json({
                id: 1,
                name: 'Животные',
                can: ['UPDATE', 'DELETE'],
                importStatus: {
                    file: 'example_import_data.xlsx',
                    url: '/api/v1/animals/upload/',
                },
                fields: {
                    name: 'Имя животного',
                    year: 'Возраст, год',
                },
                items: [
                    {
                        id: 101,
                        name: 'Тут будет кличка животного',
                        year: 'Тут будет возраст животного',
                    }
                ],
            })
        } else if (id === '2') {
            res.json({
                id: 1,
                name: 'Звери ебаные',
                can: ['UPDATE'],
                importStatus: null,
                fields: {
                    name: 'Зверь',
                },
                items: [
                    {
                        id: 102,
                        name: 'Тут будет кличка зверя',
                    }
                ],
            })
        } else {
            res.status(404).send('Not Found');
        }
    };
}

export default AdminController
