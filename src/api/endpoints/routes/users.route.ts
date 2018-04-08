import { Application } from 'express'
import { requestHandler, promiseHandler } from '../../utils/expressHelpers'
import * as controllers from '../controllers/users.controller'

const routes = (app: Application): void => {

  app.get('/api/users', requestHandler(controllers.getUser))

  app.get('api/user/:id', requestHandler(controllers.getUser))

}

export default routes
