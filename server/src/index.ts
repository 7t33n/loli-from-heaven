import App from './app'

import * as bodyParser from 'body-parser'
import loggerMiddleware from './middleware/logger'

import UserController from "./controllers/home.controller";


const app = new App({
    port: 5000,
    controllers: [
        new UserController(),
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        loggerMiddleware,
        gateway.middleware(),
    ]
})

app.listen()
