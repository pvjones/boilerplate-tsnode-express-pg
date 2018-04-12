import getDb from '../../db/db'
import { getToken } from '../utils/security.utils'
import { getSessionByToken } from '../endpoints/helpers/security.helpers'
import {
  HandlePromise,
  ErrorRequestHandler,
  RequestHandler,
  Db,
  AppRequest,
} from '../models'

export const handlePromise: HandlePromise = (promise, res, next) => {
  Promise.resolve(promise)
    .then((data: any) => {
      data
        ? res.status(200).json(data)
        : res.status(204).end()
    })
    .catch((error: Error) => next(error))
}

export const handleError: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.message)
  res.json({ message: err.message })
}

export const handleRequest = (controller: any): RequestHandler =>
  (req, res, next) => {
    const promise = controller(req)
    handlePromise(promise, res, next)
  }

export const buildUtils = (): { db: Db } => ({ db: getDb() })

export const isAuthenticated: RequestHandler = (req: AppRequest, res, next) => {
  const token = getToken(req.headers)
  Promise.resolve(getSessionByToken(req, token))
    .then(session => {
      if (!session) throw new Error('Session invalid')
      if (session.expiresAt < new Date()) throw new Error('Session expired')

      req.userId = session.userId
      return next()
    })
    .catch((error: Error) => next(error))
}