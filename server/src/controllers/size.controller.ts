import * as express from 'express';
import { Request, Response, IRouter } from 'express'
import IControllerBase from './../interfaces/IControllerBase.interface'
import {Size, SizeInterface} from "../models/size.model";
import {UpdateOptions} from "sequelize";
import {AuthPermission} from "../middleware/permissions.middleware";

class SizeController implements IControllerBase {
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes(): IRouter {
        this.router.get('/directory/size', this.get);
        this.router.post('/directory/size', AuthPermission, this.post);
        this.router.get('/directory/size/:id', this.getById);
        this.router.put('/directory/size/:id', AuthPermission, this.put);
        this.router.delete('/directory/size/:id', AuthPermission, this.delete);
        return this.router;
    }

    get = async (req: Request, res: Response) => {
        try {
            const Sizes: Array<Size> = await Size.findAll<Size>();
            res.status(200).json(Sizes)
        } catch (err) {
            res.status(500).json(err);
        }
    }

    getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (id) {
            try {
                const size: Size = await Size.findOne<Size>({ where: { id, } });
                res.status(201).json(size);
            } catch (err) {
                res.status(500).json(err)
            }
        }
        res.status(400).json({ error: 'Укажите корректный id'});
    }

    post = async (req: Request, res: Response) => {
        const params: SizeInterface = req.body;
        if (params && params.value) {
            try {
                const size: Size = await Size.create<Size>(params);
                res.status(201).json(size);
            } catch (err) {
                res.status(500).json(err)
            }
        }
        res.status(400).json({ error: 'Не правильные данные'});
    }

    put = async (req: Request, res: Response) => {
        const { id } = req.params;
        const params: SizeInterface = req.body;
        const update: UpdateOptions = {
            where: { id },
            limit: 1,
        }
        if (id && params && params.value) {
            try {
                await Size.update<Size>(params, update);
                res.status(201).json({data: 'success'})
            } catch (err) {
                res.status(500).json(err)
            }
        }
        res.status(400).json({ error: 'Не правильные данные'});
    }

    delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (id) {
            try {
                await Size.destroy<Size>({ where: {id}});
                res.status(201).json({data: 'success'})
            } catch (err) {
                res.status(500).json(err)
            }
        }
        res.status(400).json({ error: 'Не правильные данные'});
    }
}

export default SizeController
