import { Response, NextFunction, ErrorRequestHandler } from 'express'

export const promiseHandler = (promise: Promise<any>, res: Response, next: NextFunction) => {
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