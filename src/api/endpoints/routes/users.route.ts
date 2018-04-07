import { Application, Request, Response, NextFunction, } from 'express'
import { promiseHandler } from '../../utils/expressHelpers'
import * as controllers from '../controllers/users.controller'

const registerRoutes = (app: Application) => {

  app.get('/api/user', (req: any, res: any, next: any) => {
    const promise = controllers.getUser(req)
    promiseHandler(promise, res, next)
  })

}

export default registerRoutes
