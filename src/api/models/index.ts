import {
  IDatabase,
  IMain,
  TConfig,
  TQuery,
} from 'pg-promise'
import {
  Application,
  ErrorRequestHandler,
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from 'express'

/**
 * Database Models
 */
export type Db = IDatabase<{}>
export type TQueryFunc = () => TQuery
export type QueryValues = (string | number | Date)[] | Record<string, (string | number | Date)>
export interface QueryObj {
  sql: TQuery
  values?: QueryValues
}

/**
 * Express Models
 */
export type HandlePromise = (promise: Promise<any>, res: Response, next: NextFunction) => void
export type AppModifier = (app: Application) => Application
export type AppGenerator = () => Application
export interface RequestUtils {
  db: Db
}
export interface AppRequest extends Request {
  utils: RequestUtils
}

/** 
 * Helper Models
 */

export type OnEncryptionSuccess<R> = (encrypted: string, salt: string) => R
export type OnEncryptionError = (err: Error) => void
export type OnVerifySuccess = <R>(match: boolean) => R
export type OnVerifyError = (err: Error) => void

export {
  Application,
  ErrorRequestHandler,
  IDatabase,
  IMain,
  NextFunction,
  RequestHandler,
  Response,
  TConfig,
  TQuery,
}
