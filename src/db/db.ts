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
  for (const key of Object.keys(init)) {
    await _db.none(init[key]())
  }
}

const getDb = async (): Promise<Db> => {
  const pgp: IMain = pgPromise()
  const db = <Db>pgp(dbConfig)

  await initTables(db)

  return db
}

export default getDb