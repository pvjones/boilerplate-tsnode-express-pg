import { Application } from 'express'
import { handleRequest } from '../../utils/expressHelpers'
import * as controllers from '../controllers/users.controller'

const routes = (app: Application): void => {

  app.get('/api/users', handleRequest(controllers.getUser))
  app.get('/api/users/:id', handleRequest(controllers.getUser))
  app.put('/api/users/:id', handleRequest(controllers.updateUser))
  app.post('/api/users', handleRequest(controllers.createUser))
  app.delete('/api/users/:id', handleRequest(controllers.deleteUser))

}

export default routes
