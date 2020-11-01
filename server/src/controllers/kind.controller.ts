import * as express from 'express';
import { Request, Response, IRouter } from 'express'
import IControllerBase from './../interfaces/IControllerBase.interface'
import {Kind, KindInterface} from "../models/kind.model";
import {UpdateOptions} from "sequelize";
import {AuthPermission} from "../middleware/permissions.middleware";

class KindController implements IControllerBase {
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes(): IRouter {
        this.router.get('/directory/kind', this.get);
        this.router.post('/directory/kind', AuthPermission, this.post);
        this.router.get('/directory/kind/:id', this.getById);
        this.router.put('/directory/kind/:id', AuthPermission, this.put);
        this.router.delete('/directory/kind/:id', AuthPermission, this.delete);
        return this.router;
    }

    get = async (req: Request, res: Response) => {
        try {
            const furs: Array<Kind> = await Kind.findAll<Kind>();
            res.status(200).json(furs)
        } catch (err) {
            res.status(500).json(err);
        }
    }

    getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (id) {
            try {
                const fur: Kind = await Kind.findOne<Kind>({ where: { id, } });
                res.status(201).json(fur);
            } catch (err) {
                res.status(500).json(err)
            }
        }
        res.status(400).json({ error: 'Укажите корректный id'});
    }

    post = async (req: Request, res: Response) => {
        const params: KindInterface = req.body;
        if (params && params.value) {
            try {
                const fur: Kind = await Kind.create<Kind>(params);
                res.status(201).json(fur);
            } catch (err) {
                res.status(500).json(err)
            }
        }
        res.status(400).json({ error: 'Не правильные данные'});
    }

    put = async (req: Request, res: Response) => {
        const { id } = req.params;
        const params: KindInterface = req.body;
        const update: UpdateOptions = {
            where: { id },
            limit: 1,
        }
        if (id && params && params.value) {
            try {
                await Kind.update<Kind>(params, update);
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
                await Kind.destroy<Kind>({ where: {id}});
                res.status(201).json({data: 'success'})
            } catch (err) {
                res.status(500).json(err)
            }
        }
        res.status(400).json({ error: 'Не правильные данные'});
    }
}

export default KindController
