import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as path from 'path'
import routes from './endpoints/routes'
import { handleError, buildUtils } from './utils/express.utils'
import getConfig from './utils/config'
import { AppGenerator, AsyncAppGenerator, AppModifier, AsyncAppModifier, AppRequest } from './models'

const cors = require('cors')

const createServer: AppGenerator = () => express()

const configureApp: AppModifier = app => {
  const bodyLimit = { limit: '5mb' }

  app.use(bodyParser.json({
    ...bodyLimit,
  }))

  app.use(bodyParser.urlencoded({
    extended: true,
    ...bodyLimit,
  }))

  app.use(cors())

  return app
}

const registerRoutes: AppModifier = app => {
  app.use(express.static(path.join(__dirname, 'public')))

  routes(app)

  return app
}

const injectUtils: AsyncAppModifier = async app => {
  const utils = await buildUtils()

  app.use((req: AppRequest, res, next) => {
    req.utils = utils
    next()
  })

  return app
}

const handleErrors: AppModifier = app => {
  app.use((req, res, next) => {
    // No endpoint routes were matched
    throw new Error('not found')
  })

  app.use(handleError)

  return app
}

const start: AsyncAppGenerator = async () => {
  let server = createServer()
  server = configureApp(server)
  server = await injectUtils(server)
  server = registerRoutes(server)
  server = handleErrors(server)

  server.listen(getConfig().api.port, () => {
    console.log('Api is listening on port 3000')
  })

  return server
}

start()
