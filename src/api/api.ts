import * as express from 'express'
import * as bodyParser from 'body-parser'

const cors = require('cors')

const app = express()
const router = express.Router()

console.log('app', app)
console.log('router', router)