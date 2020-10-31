import * as express from 'express';
import { Request, Response, IRouter } from 'express'
import IControllerBase from './../interfaces/IControllerBase.interface'
import {IMPORT_QUEUE} from "../const/queue";
import * as animals from '../mock/animals.json';

class AnimalsController implements IControllerBase {
    public router = express.Router()
    public cron: any

    constructor(cron) {
        this.cron = cron;
        this.initRoutes();
    }

    public initRoutes(): IRouter {
        this.router.get('/animals', this.getAllAnimals);
        this.router.get('/animals/:id', this.getAnimalsById);
        this.router.post('/animals/upload', this.animalsImport);
        return this.router;
    }

    getAnimalsById = async (req: Request, res: Response) => {
        const { id } = req.params;
        res.json(animals.find((item) => (item.id === parseInt(id, 10))));
    };

    getAllAnimals = async (req: Request, res: Response) => {
        res.json({ items: animals });
    };

    animalsImport = async (req: Request, res: Response) => {
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
        // // start parse XLSX file
        // fileXLSXParse(dataset);
    };

}

export default AnimalsController
