import { Application } from '../../models'
import { handleRequest } from '../../utils/express.utils'
import * as controllers from '../controllers/security.controller'

const routes = (app: Application): void => {

  app.post('/api/auth/register', handleRequest(controllers.register))
  app.post('/api/auth/login', handleRequest(controllers.login))
  app.post('/api/auth/logout', handleRequest(controllers.logout))

}

export default routes
