import getDb from '../../db/db'
import { parseToken } from '../utils/security.utils'
import { getSessionByUuid } from '../endpoints/helpers/security.helpers'
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
  const message = err.message

  message
    ? res.status(400).end(JSON.stringify({ message }))
    : res.status(400).end()
}

export const handleRequest = (controller: any): RequestHandler =>
  (req, res, next) => {
    const promise = controller(req)
    handlePromise(promise, res, next)
  }

export const buildUtils = async (): Promise<{ db: Db }> => {
  const db = await getDb()
  return { db }
}

export const isAuthenticated: RequestHandler = (req: AppRequest, res, next) => {
  const token = req.headers && req.headers.authorization
  const { uuid, createdAt } = parseToken(token)

  const expiry = createdAt
  expiry.setDate(expiry.getDate() - 1)

  Promise.resolve(getSessionByUuid(req, uuid))
    .then(session => {
      if (!session) throw new Error('Session invalid')
      if (expiry < new Date()) throw new Error('Session expired')

      req.userId = session.userId
      return next()
    })
    .catch((error: Error) => next(error))
}