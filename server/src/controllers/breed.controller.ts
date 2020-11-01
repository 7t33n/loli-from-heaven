import * as express from 'express';
import { Request, Response, IRouter } from 'express'
import IControllerBase from './../interfaces/IControllerBase.interface'
import {Breed, BreedInterface} from "../models/breed.model";
import {UpdateOptions} from "sequelize";
import {AuthPermission} from "../middleware/permissions.middleware";

class BreedController implements IControllerBase {
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes(): IRouter {
        this.router.get('/directory/breed', this.get);
        this.router.post('/directory/breed', AuthPermission, this.post);
        this.router.get('/directory/breed/:id', this.getById);
        this.router.put('/directory/breed/:id', AuthPermission, this.put);
        this.router.delete('/directory/breed/:id', AuthPermission, this.delete);
        return this.router;
    }

    get = async (req: Request, res: Response) => {
        try {
            const breeds: Array<Breed> = await Breed.findAll<Breed>();
            res.status(200).json(breeds)
        } catch (err) {
            res.status(500).json(err);
        }
    }

    getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (id) {
            try {
                const breed: Breed = await Breed.findOne<Breed>({ where: { id, } });
                res.status(201).json(breed);
            } catch (err) {
                res.status(500).json(err)
            }
        }
        res.status(400).json({ error: 'Укажите корректный id'});
    }

    post = async (req: Request, res: Response) => {
        const params: BreedInterface = req.body;
        if (params && params.value) {
            try {
                const breed: Breed = await Breed.create<Breed>(params);
                res.status(201).json(breed);
            } catch (err) {
                res.status(500).json(err)
            }
        }
        res.status(400).json({ error: 'Не правильные данные'});
    }

    put = async (req: Request, res: Response) => {
        const { id } = req.params;
        const params: BreedInterface = req.body;
        const update: UpdateOptions = {
            where: { id },
            limit: 1,
        }
        if (id && params && params.value) {
            try {
                await Breed.update<Breed>(params, update);
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
                await Breed.destroy<Breed>({ where: {id}});
                res.status(201).json({data: 'success'})
            } catch (err) {
                res.status(500).json(err)
            }
        }
        res.status(400).json({ error: 'Не правильные данные'});
    }
}

export default BreedController
