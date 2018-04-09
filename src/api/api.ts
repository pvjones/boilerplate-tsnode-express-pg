import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as path from 'path'
import routes from './endpoints/routes'
import { handleError, buildUtils } from './utils/expressHelpers'
import { Db } from '../db/db'

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
  routes(app)

  app.use(express.static(path.join(__dirname, 'static')))

  app.get(/^(?!\/api\/)(.*)$/, (req, res, next) => {
    const filePath = path.resolve(__dirname, 'static', 'index.html')
    res.sendFile(filePath)
  })

  return app
}

const injectUtils: AppModifier = app => {
  const utils = buildUtils()

  app.use((req: AppRequest, res, next) => {
    req.utils = utils
    next()
  })

  return app
}

const handleErrors: AppModifier = app => {
  app.use((req, res, next) => {
    // No endpoint routes were matched
    throw Error('not found')
  })

  app.use(handleError)

  return app
}

const start: AppGenerator = () => {
  let server = createServer()
  server = configureApp(server)
  server = injectUtils(server)
  server = registerRoutes(server)
  server = handleErrors(server)

  server.listen(3000, () => {
    console.log('Api is listening on port 3000')
  })

  return server
}

start()

type AppModifier = (app: express.Application) => express.Application
type AppGenerator = () => express.Application
interface RequestUtils {
  db: Db
}
export interface AppRequest extends express.Request {
  utils: RequestUtils
}