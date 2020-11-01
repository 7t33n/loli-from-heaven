import * as express from 'express';
import { Request, Response, IRouter } from 'express'
import IControllerBase from './../interfaces/IControllerBase.interface'
import { Shelter, ShelterInterface } from "../models/shelter.modal";
import {AuthPermission} from "../middleware/permissions.middleware";
import {UpdateOptions} from "sequelize";

class ShelterController implements IControllerBase {
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes(): IRouter {
        this.router.get('/directory/shelter', this.get);
        this.router.post('/directory/shelter', AuthPermission, this.post);
        this.router.get('/directory/shelter/:id', this.getById);
        this.router.put('/directory/shelter/:id', AuthPermission, this.put);
        this.router.delete('/directory/shelter/:id', AuthPermission, this.delete);
        return this.router;
    }

    get = async (req: Request, res: Response) => {
        try {
            const shelters: Array<Shelter> = await Shelter.findAll<Shelter>();
            res.status(200).json(shelters)
        } catch (err) {
            res.status(500).json(err);
        }
    }

    getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (id) {
            try {
                const shelter: Shelter = await Shelter.findOne<Shelter>({ where: { id, } });
                res.status(201).json(shelter);
            } catch (err) {
                res.status(500).json(err)
            }
        }
        res.status(400).json({ error: 'Укажите корректный id'});
    }

    post = async (req: Request, res: Response) => {
        const params: ShelterInterface = req.body;
        if (params) {
            try {
                const shelter: Shelter = await Shelter.create<Shelter>(params);
                res.status(201).json(shelter);
            } catch (err) {
                res.status(500).json(err)
            }
        }
        res.status(400).json({ error: 'Не правильные данные'});
    }

    put = async (req: Request, res: Response) => {
        const { id } = req.params;
        const params: ShelterInterface = req.body;
        const update: UpdateOptions = {
            where: { id },
            limit: 1,
        }
        if (id && params) {
            try {
                await Shelter.update<Shelter>(params, update);
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
                await Shelter.destroy<Shelter>({ where: {id}});
                res.status(201).json({data: 'success'})
            } catch (err) {
                res.status(500).json(err)
            }
        }
        res.status(400).json({ error: 'Не правильные данные'});
    }
}

export default ShelterController
