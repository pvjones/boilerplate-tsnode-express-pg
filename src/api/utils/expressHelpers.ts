import {
  Response,
  NextFunction,
  ErrorRequestHandler,
  RequestHandler,
} from 'express'
import getDb, { Db } from '../../db/db'

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


type HandlePromise = (promise: Promise<any>, res: Response, next: NextFunction) => void