import {
  Response,
  NextFunction,
  ErrorRequestHandler,
  RequestHandler,
} from 'express'

export const promiseHandler: PromiseHandler = (promise, res, next) => {
  Promise.resolve(promise)
    .then((data: any) => {
      data
        ? res.status(200).json(data)
        : res.status(204).end()
    })
    .catch((error: Error) => next(error))
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.message)
  res.json({ message: err.message })
}

export const requestHandler = (controller: any): RequestHandler =>
  (req, res, next) => {
    const promise = controller(req)
    promiseHandler(promise, res, next)
  }

type PromiseHandler = (promise: Promise<any>, res: Response, next: NextFunction) => void