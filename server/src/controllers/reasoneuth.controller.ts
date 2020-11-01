import * as express from 'express';
import { Request, Response, IRouter } from 'express'
import IControllerBase from './../interfaces/IControllerBase.interface'
import { Reasoneuth, ReasoneuthInterface } from "../models/reasoneuth.model";
import {AuthPermission} from "../middleware/permissions.middleware";
import {UpdateOptions} from "sequelize";

class ReasoneuthController implements IControllerBase {
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes(): IRouter {
        this.router.get('/directory/reasoneuth', this.get);
        this.router.post('/directory/reasoneuth', AuthPermission, this.post);
        this.router.get('/directory/reasoneuth/:id', this.getById);
        this.router.put('/directory/reasoneuth/:id', AuthPermission, this.put);
        this.router.delete('/directory/reasoneuth/:id', AuthPermission, this.delete);
        return this.router;
    }

    get = async (req: Request, res: Response) => {
        try {
            const reasoneuths: Array<Reasoneuth> = await Reasoneuth.findAll<Reasoneuth>();
            res.status(200).json(reasoneuths)
        } catch (err) {
            res.status(500).json(err);
        }
    }

    getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (id) {
            try {
                const reasoneuth: Reasoneuth = await Reasoneuth.findOne<Reasoneuth>({ where: { id, } });
                res.status(201).json(reasoneuth);
            } catch (err) {
                res.status(500).json(err)
            }
        }
        res.status(400).json({ error: 'Укажите корректный id'});
    }

    post = async (req: Request, res: Response) => {
        const params: ReasoneuthInterface = req.body;
        if (params) {
            try {
                const reasoneuth: Reasoneuth = await Reasoneuth.create<Reasoneuth>(params);
                res.status(201).json(reasoneuth);
            } catch (err) {
                res.status(500).json(err)
            }
        }
        res.status(400).json({ error: 'Не правильные данные'});
    }

    put = async (req: Request, res: Response) => {
        const { id } = req.params;
        const params: ReasoneuthInterface = req.body;
        const update: UpdateOptions = {
            where: { id },
            limit: 1,
        }
        if (id && params) {
            try {
                await Reasoneuth.update<Reasoneuth>(params, update);
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
                await Reasoneuth.destroy<Reasoneuth>({ where: {id}});
                res.status(201).json({data: 'success'})
            } catch (err) {
                res.status(500).json(err)
            }
        }
        res.status(400).json({ error: 'Не правильные данные'});
    }
}

export default ReasoneuthController
