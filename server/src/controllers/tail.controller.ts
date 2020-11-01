import * as express from 'express';
import { Request, Response, IRouter } from 'express'
import IControllerBase from './../interfaces/IControllerBase.interface'
import {Tail, TailInterface} from "../models/tail.model";
import {UpdateOptions} from "sequelize";
import {AuthPermission} from "../middleware/permissions.middleware";

class EarsController implements IControllerBase {
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes(): IRouter {
        this.router.get('/directory/tail', this.get);
        this.router.post('/directory/tail', AuthPermission, this.post);
        this.router.get('/directory/tail/:id', this.getById);
        this.router.put('/directory/tail/:id', AuthPermission, this.put);
        this.router.delete('/directory/tail/:id', AuthPermission, this.delete);
        return this.router;
    }

    get = async (req: Request, res: Response) => {
        try {
            const tails: Array<Tail> = await Tail.findAll<Tail>();
            res.status(200).json(tails)
        } catch (err) {
            res.status(500).json(err);
        }
    }

    getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (id) {
            try {
                const tail: Tail = await Tail.findOne<Tail>({ where: { id, } });
                res.status(201).json(tail);
            } catch (err) {
                res.status(500).json(err)
            }
        }
        res.status(400).json({ error: 'Укажите корректный id'});
    }

    post = async (req: Request, res: Response) => {
        const params: TailInterface = req.body;
        if (params && params.value) {
            try {
                const tail: Tail = await Tail.create<Tail>(params);
                res.status(201).json(tail);
            } catch (err) {
                res.status(500).json(err)
            }
        }
        res.status(400).json({ error: 'Не правильные данные'});
    }

    put = async (req: Request, res: Response) => {
        const { id } = req.params;
        const params: TailInterface = req.body;
        const update: UpdateOptions = {
            where: { id },
            limit: 1,
        }
        if (id && params && params.value) {
            try {
                await Tail.update<Tail>(params, update);
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
                await Tail.destroy<Tail>({ where: {id}});
                res.status(201).json({data: 'success'})
            } catch (err) {
                res.status(500).json(err)
            }
        }
        res.status(400).json({ error: 'Не правильные данные'});
    }
}

export default EarsController
