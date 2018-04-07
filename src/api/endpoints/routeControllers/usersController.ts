import { Application } from 'express'

const registerRoutes = (app: Application) => {
  app.get('/api/user', (req, res, next) => {
    res.send('Test User')
  })
}

export default registerRoutes