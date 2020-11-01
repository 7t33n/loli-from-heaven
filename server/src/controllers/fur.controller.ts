import * as express from 'express';
import { Request, Response, IRouter } from 'express'
import IControllerBase from './../interfaces/IControllerBase.interface'
import {Fur, FurInterface} from "../models/fur.model";
import {UpdateOptions} from "sequelize";
import {AuthPermission} from "../middleware/permissions.middleware";
import {Kind} from "../models/kind.model";

class FurController implements IControllerBase {
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes(): IRouter {
        this.router.get('/directory/fur', this.get);
        this.router.post('/directory/fur', AuthPermission, this.post);
        this.router.get('/directory/fur/:id', this.getById);
        this.router.put('/directory/fur/:id', AuthPermission, this.put);
        this.router.delete('/directory/fur/:id', AuthPermission, this.delete);
        return this.router;
    }

    get = async (req: Request, res: Response) => {
        try {
            const fur: Array<Fur> = await Fur.findAll<Fur>();
            res.status(200).json(fur)
        } catch (err) {
            res.status(500).json(err);
        }
    }

    getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (id) {
            try {
                const fur: Fur = await Fur.findOne<Fur>({ where: { id, } });
                res.status(201).json(fur);
            } catch (err) {
                res.status(500).json(err)
            }
        }
        res.status(400).json({ error: 'Укажите корректный id'});
    }

    post = async (req: Request, res: Response) => {
        const params: FurInterface = req.body;
        if (params && params.value && params.KindId) {
            try {
                const fur: Fur = await Fur.create<Fur>(params);
                res.status(201).json(fur);
            } catch (err) {
                res.status(500).json(err)
            }
        }
        res.status(400).json({ error: 'Не правильные данные'});
    }

    put = async (req: Request, res: Response) => {
        const { id } = req.params;
        const params: FurInterface = req.body;
        const update: UpdateOptions = {
            where: { id },
            limit: 1,
        }
        if (id && params && params.value && params.KindId) {
            try {
                await Fur.update<Fur>(params, update);
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
                await Fur.destroy<Fur>({ where: {id}});
                res.status(201).json({data: 'success'})
            } catch (err) {
                res.status(500).json(err)
            }
        }
        res.status(400).json({ error: 'Не правильные данные'});
    }
}

export default FurController
