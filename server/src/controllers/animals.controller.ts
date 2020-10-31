import * as express from 'express';
import { Request, Response, IRouter } from 'express'
import IControllerBase from './../interfaces/IControllerBase.interface'
import fileXLSXParse from "../helpers/fileXLSXParse";

class AnimalsController implements IControllerBase {
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes(): IRouter {
        this.router.get('/animals', this.getAllAnimals);
        this.router.post('/animals/upload', this.animalsImport);
        return this.router;
    }

    getAllAnimals = async (req: Request, res: Response) => {
       res.json({});
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
        console.log();
        try {
            dataset.mv(`${__dirname}/../uploads/imports/${new Date().getTime() / 1000}.xlsx`);
        } catch (e) {
            console.log(e);
        }
        // // start parse XLSX file
        // fileXLSXParse(dataset);
    };

}

export default AnimalsController
