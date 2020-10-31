import App from './App'

import * as bodyParser from 'body-parser'
import loggerMiddleware from './middleware/logger'

import HomeController from "./controllers/home.controller"
import AuthController from "./controllers/auth.controller";
import AdminController from "./controllers/admin.controller";


const app = new App({
    port: 5000,
    controllers: [
        new HomeController(),
        new AuthController(),
        new AdminController(),
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        loggerMiddleware,
    ]
})

app.listen()
