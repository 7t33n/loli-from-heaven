import App from './App';

import * as bodyParser from 'body-parser';
import loggerMiddleware from './middleware/logger';
import * as fileUpload from 'express-fileupload';

import HomeController from "./controllers/home.controller";
import AuthController from "./controllers/auth.controller";
import AdminController from "./controllers/admin.controller";
import AnimalsController from "./controllers/animals.controller";


const app = new App({
    port: 5000,
    controllers: [
        new HomeController(),
        new AuthController(),
        new AdminController(),
        new AnimalsController(),
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        loggerMiddleware,
        fileUpload(),
    ]
})

app.listen()
