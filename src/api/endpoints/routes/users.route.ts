import { Application } from 'express'
import { handleRequest, handlePromise } from '../../utils/expressHelpers'
import * as controllers from '../controllers/users.controller'

const routes = (app: Application): void => {

  app.get('/api/users', handleRequest(controllers.getUser))
  app.get('/api/user/:id', handleRequest(controllers.getUser))

}

export default routes
