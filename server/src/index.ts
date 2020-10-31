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
