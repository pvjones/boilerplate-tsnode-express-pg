import getDb from '../../db/db'
import {
  HandlePromise,
  ErrorRequestHandler,
  RequestHandler,
  Db,
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

export const handleAuth: RequestHandler = async (req, res, next) => {

}

export const handleRequest = (controller: any): RequestHandler =>
  (req, res, next) => {
    const promise = controller(req)
    handlePromise(promise, res, next)
  }

export const buildUtils = (): { db: Db } => ({ db: getDb() })
