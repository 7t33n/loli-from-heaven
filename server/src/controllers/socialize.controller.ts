import * as express from 'express';
import { Request, Response, IRouter } from 'express'
import IControllerBase from './../interfaces/IControllerBase.interface'
import {Socialize, SocializeInterface} from "../models/socialize.model";
import {UpdateOptions} from "sequelize";
import {AuthPermission} from "../middleware/permissions.middleware";

class SocializeController implements IControllerBase {
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes(): IRouter {
        this.router.get('/directory/socialize', this.get);
        this.router.post('/directory/socialize', AuthPermission, this.post);
        this.router.get('/directory/socialize/:id', this.getById);
        this.router.put('/directory/socialize/:id', AuthPermission, this.put);
        this.router.delete('/directory/socialize/:id', AuthPermission, this.delete);
        return this.router;
    }

    get = async (req: Request, res: Response) => {
        try {
            const socializes: Array<Socialize> = await Socialize.findAll<Socialize>();
            res.status(200).json(socializes)
        } catch (err) {
            res.status(500).json(err);
        }
    }

    getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (id) {
            try {
                const socialize: Socialize = await Socialize.findOne<Socialize>({ where: { id, } });
                res.status(201).json(socialize);
            } catch (err) {
                res.status(500).json(err)
            }
        }
        res.status(400).json({ error: 'Укажите корректный id'});
    }

    post = async (req: Request, res: Response) => {
        const params: SocializeInterface = req.body;
        if (params && params.value) {
            try {
                const socialize: Socialize = await Socialize.create<Socialize>(params);
                res.status(201).json(socialize);
            } catch (err) {
                res.status(500).json(err)
            }
        }
        res.status(400).json({ error: 'Не правильные данные'});
    }

    put = async (req: Request, res: Response) => {
        const { id } = req.params;
        const params: SocializeInterface = req.body;
        const update: UpdateOptions = {
            where: { id },
            limit: 1,
        }
        if (id && params && params.value) {
            try {
                await Socialize.update<Socialize>(params, update);
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
                await Socialize.destroy<Socialize>({ where: {id}});
                res.status(201).json({data: 'success'})
            } catch (err) {
                res.status(500).json(err)
            }
        }
        res.status(400).json({ error: 'Не правильные данные'});
    }
}

export default SocializeController
