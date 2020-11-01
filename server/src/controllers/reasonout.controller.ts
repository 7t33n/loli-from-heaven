import * as express from 'express';
import { Request, Response, IRouter } from 'express'
import IControllerBase from './../interfaces/IControllerBase.interface'
import { Reasonout, ReasonoutInterface } from "../models/reasonout.model";
import {AuthPermission} from "../middleware/permissions.middleware";
import {UpdateOptions} from "sequelize";

class ReasonoutController implements IControllerBase {
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes(): IRouter {
        this.router.get('/directory/reasonout', this.get);
        this.router.post('/directory/reasonout', AuthPermission, this.post);
        this.router.get('/directory/reasonout/:id', this.getById);
        this.router.put('/directory/reasonout/:id', AuthPermission, this.put);
        this.router.delete('/directory/reasonout/:id', AuthPermission, this.delete);
        return this.router;
    }

    get = async (req: Request, res: Response) => {
        try {
            const reasonouts: Array<Reasonout> = await Reasonout.findAll<Reasonout>();
            res.status(200).json(reasonouts)
        } catch (err) {
            res.status(500).json(err);
        }
    }

    getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (id) {
            try {
                const reasonout: Reasonout = await Reasonout.findOne<Reasonout>({ where: { id, } });
                res.status(201).json(reasonout);
            } catch (err) {
                res.status(500).json(err)
            }
        }
        res.status(400).json({ error: 'Укажите корректный id'});
    }

    post = async (req: Request, res: Response) => {
        const params: ReasonoutInterface = req.body;
        if (params) {
            try {
                const reasonout: Reasonout = await Reasonout.create<Reasonout>(params);
                res.status(201).json(reasonout);
            } catch (err) {
                res.status(500).json(err)
            }
        }
        res.status(400).json({ error: 'Не правильные данные'});
    }

    put = async (req: Request, res: Response) => {
        const { id } = req.params;
        const params: ReasonoutInterface = req.body;
        const update: UpdateOptions = {
            where: { id },
            limit: 1,
        }
        if (id && params) {
            try {
                await Reasonout.update<Reasonout>(params, update);
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
                await Reasonout.destroy<Reasonout>({ where: {id}});
                res.status(201).json({data: 'success'})
            } catch (err) {
                res.status(500).json(err)
            }
        }
        res.status(400).json({ error: 'Не правильные данные'});
    }
}

export default ReasonoutController
