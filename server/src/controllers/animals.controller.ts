import * as express from 'express';
import { Request, Response, IRouter } from 'express'
import IControllerBase from './../interfaces/IControllerBase.interface'
import {IMPORT_QUEUE} from "../const/queue";
import { Animal, AnimalInterface } from "../models/animal.model";
import {AuthPermission} from "../middleware/permissions.middleware";
import {UpdateOptions} from "sequelize";
import {Kind} from "../models/kind.model";
import {Size} from "../models/size.model";

class AnimalsController implements IControllerBase {
    public router = express.Router()
    public cron: any

    constructor(cron) {
        this.cron = cron;
        this.initRoutes();
    }

    public initRoutes(): IRouter {
        this.router.get('/animals', this.get);
        this.router.post('/animal', AuthPermission, this.post);
        this.router.get('/animal/:id', this.getById);
        this.router.put('/animal/:id', AuthPermission, this.put);
        this.router.delete('/animal/:id', AuthPermission, this.delete);
        this.router.post('/animals/upload', AuthPermission, this.upload);
        return this.router;
    }

    upload = async (req: Request, res: Response) => {
        // @ts-ignore
        const { dataset } = req.files;
        if (!dataset && !dataset.size) {
            res.status(400).json({ error: 'Добавьте пожалуйста файл' });
        }
        const nameSplit = dataset.name.split('.');
        if (nameSplit[nameSplit.length - 1] !== 'xlsx') {
            res.status(400).json({ error: 'Не правильный формат файла' });
        }
        res.status(200).json({
            success: 'Файл успешно загружен, примерное ожидание обработки файла, до 5ти минут',

        });
        try {
            const filename = `${new Date().getTime()}.xlsx`;
            dataset.mv(`${__dirname}/../uploads/imports/${filename}`);
            IMPORT_QUEUE.push(filename);
            if (this.cron.status !== 'running') {
                this.cron.start();
            }
        } catch (e) {
            console.log(e);
        }
    };

    get = async (req: Request, res: Response) => {
        try {
            const animals: Array<Animal> = await Animal.findAll<Animal>();
            res.status(200).json(animals)
        } catch (err) {
            res.status(500).json(err);
        }
    }

    getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (id) {
            try {
                const animal: Animal = await Animal.findOne<Animal>({ where: { id, } });
                res.status(201).json(animal);
            } catch (err) {
                res.status(500).json(err)
            }
        }
        res.status(400).json({ error: 'Укажите корректный id'});
    }

    post = async (req: Request, res: Response) => {
        const params: AnimalInterface = req.body;
        if (params && params) {
            try {
                const animal: Animal = await Animal.create<Animal>(params);
                res.status(201).json(animal);
            } catch (err) {
                res.status(500).json(err)
            }
        }
        res.status(400).json({ error: 'Не правильные данные'});
    }

    put = async (req: Request, res: Response) => {
        const { id } = req.params;
        const params: AnimalInterface = req.body;
        const update: UpdateOptions = {
            where: { id },
            limit: 1,
        }
        if (id && params) {
            try {
                await Animal.update<Animal>(params, update);
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
                await Animal.destroy<Animal>({ where: {id}});
                res.status(201).json({data: 'success'})
            } catch (err) {
                res.status(500).json(err)
            }
        }
        res.status(400).json({ error: 'Не правильные данные'});
    }

}

export default AnimalsController
