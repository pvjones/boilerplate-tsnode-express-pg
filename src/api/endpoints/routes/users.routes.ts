import { Application } from '../../models'
import { handleRequest, isAuthenticated } from '../../utils/express.utils'
import * as controllers from '../controllers/users.controller'

const routes = (app: Application): void => {

  app.get('/api/users', isAuthenticated, handleRequest(controllers.getUser))
  app.get('/api/users/:id', isAuthenticated, handleRequest(controllers.getUser))
  app.put('/api/users/:id', isAuthenticated, handleRequest(controllers.updateUser))
  app.post('/api/users', isAuthenticated, handleRequest(controllers.createUser))
  app.delete('/api/users/:id', isAuthenticated, handleRequest(controllers.deleteUser))

}

export default routes
