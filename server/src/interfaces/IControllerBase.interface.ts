import { IRouter } from 'express'

interface IControllerBase {
    initRoutes(): IRouter
}

export default IControllerBase
