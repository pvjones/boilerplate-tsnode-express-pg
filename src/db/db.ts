import * as pgPromise from 'pg-promise'
import init from './init/createTables'
import {
  Db,
  IMain,
  TConfig,
} from '../api/models'

const config: TConfig = {
  host: 'localhost',
  port: 5432,
  database: 'master',
  user: 'postgres',
}

const initTables = async (_db: Db): Promise<void> => {
  Object.keys(init).map(async key => {
    const promise = await _db.none(init[key]())
    return promise
  })
}

const getDb = async (): Promise<Db> => {
  const pgp: IMain = pgPromise()
  const db = <Db>pgp(config)
  await initTables(db)
  return db
}

export default getDb