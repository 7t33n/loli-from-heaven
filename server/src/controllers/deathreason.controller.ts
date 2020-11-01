import * as express from 'express';
import { Request, Response, IRouter } from 'express'
import IControllerBase from './../interfaces/IControllerBase.interface'
import { deathReason, deathReasonInterface } from "../models/deathreason.model";
import {UpdateOptions} from "sequelize";
import {AuthPermission} from "../middleware/permissions.middleware";

class DeathReasonController implements IControllerBase {
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes(): IRouter {
        this.router.get('/directory/deathreason', this.get);
        this.router.post('/directory/deathreason', AuthPermission, this.post);
        this.router.get('/directory/deathreason/:id', this.getById);
        this.router.put('/directory/deathreason/:id', AuthPermission, this.put);
        this.router.delete('/directory/deathreason/:id', AuthPermission, this.delete);
        return this.router;
    }

    get = async (req: Request, res: Response) => {
        try {
            const deaths: Array<deathReason> = await deathReason.findAll<deathReason>();
            res.status(200).json(deaths)
        } catch (err) {
            res.status(500).json(err);
        }
    }

    getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (id) {
            try {
                const death: deathReason = await deathReason.findOne<deathReason>({ where: { id, } });
                res.status(201).json(death);
            } catch (err) {
                res.status(500).json(err)
            }
        }
        res.status(400).json({ error: 'Укажите корректный id'});
    }

    post = async (req: Request, res: Response) => {
        const params: deathReasonInterface = req.body;
        if (params && params.value) {
            try {
                const death: deathReason = await deathReason.create<deathReason>(params);
                res.status(201).json(death);
            } catch (err) {
                res.status(500).json(err)
            }
        }
        res.status(400).json({ error: 'Не правильные данные'});
    }

    put = async (req: Request, res: Response) => {
        const { id } = req.params;
        const params: deathReasonInterface = req.body;
        const update: UpdateOptions = {
            where: { id },
            limit: 1,
        }
        if (id && params && params.value) {
            try {
                await deathReason.update<deathReason>(params, update);
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
                await deathReason.destroy<deathReason>({ where: {id}});
                res.status(201).json({data: 'success'})
            } catch (err) {
                res.status(500).json(err)
            }
        }
        res.status(400).json({ error: 'Не правильные данные'});
    }
}

export default DeathReasonController
