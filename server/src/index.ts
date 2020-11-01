import App from './App';
import * as nodeCron from 'node-cron';

import importCron from './crons/import';
import * as bodyParser from 'body-parser';
import loggerMiddleware from './middleware/logger';
import * as fileUpload from 'express-fileupload';

import HomeController from "./controllers/home.controller";
import AuthController from "./controllers/auth.controller";
import AdminController from "./controllers/admin.controller";
import AnimalsController from "./controllers/animals.controller";
import ShelterController from "./controllers/shelter.controller";
import SexController from "./controllers/sex.controller";
import KindController from "./controllers/kind.controller";
import EarsController from "./controllers/ears.controller";
import SizeController from "./controllers/size.controller";
import FurController from "./controllers/fur.controller";
import TailController from './controllers/tail.controller';
import ColorController from './controllers/color.controller';
import BreedController from "./controllers/breed.controller";
import ReasonoutController from "./controllers/reasonout.controller";
import ReasoneuthController from "./controllers/reasoneuth.controller"
import SocializeController from "./controllers/socialize.controller"
import DeathReasonController from "./controllers/deathreason.controller";
import SwaggerController from "./controllers/swagger.controller";
import {IMPORT_QUEUE} from "./const/queue";

require('dotenv').config();

const cron = nodeCron.schedule('* * * * * *', () =>  {
    if (IMPORT_QUEUE.length === 0) {
        cron.stop();
    } else {
        importCron(cron);
        cron.stop();
    }
}, {
    scheduled: false
});

const app = new App({
    port: parseInt(process.env.PORT, 10),
    controllers: [
        new HomeController(),
        new AuthController(),
        new AdminController(),
        new AnimalsController(cron),
        new ShelterController(),
        new SexController(),
        new KindController(),
        new EarsController(),
        new SizeController(),
        new FurController(),
        new TailController(),
        new ColorController(),
        new BreedController(),
        new ReasonoutController(),
        new ReasoneuthController(),
        new SocializeController(),
        new DeathReasonController(),
        new SwaggerController(),
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        loggerMiddleware,
        fileUpload(),
    ],
});
app.listen()
