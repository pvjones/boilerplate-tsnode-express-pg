import * as pgPromise from 'pg-promise'
import init from './init/createTables'
import getConfig from '../api/utils/config'
import {
  Db,
  IMain,
  TConfig,
} from '../api/models'

const config = getConfig()

const dbConfig: TConfig = {
  host: config.db.host,
  port: config.db.port,
  database: config.db.database,
  user: config.db.user,
  password: config.db.password,
}

const initTables = async (_db: Db): Promise<void> => {
  Object.keys(init).map(async key => {
    const promise = await _db.none(init[key]())
    return promise
  })
}

const getDb = async (): Promise<Db> => {
  const pgp: IMain = pgPromise()
  const db = <Db>pgp(dbConfig)
  await initTables(db)
  return db
}

export default getDb