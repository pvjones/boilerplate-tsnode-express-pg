import { Application, Request, Response, NextFunction, RequestHandler } from 'express'
import { promiseHandler } from '../../utils/expressHelpers'
import * as controllers from '../controllers/users.controller'

const getUsers: RequestHandler = (req, res, next) => {
  const promise = controllers.getUser(req)
  promiseHandler(promise, res, next)
}

const getUser: RequestHandler = (req, res, next) => {
  const promise = controllers.getUser(req)
  promiseHandler(promise, res, next)
}

const routes = (app: Application): void => {

  app.get('/api/users', getUsers)

  app.get('api/user/:id', getUser)

}

export default routes
