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
  const promises = Object.keys(init).map(key => {
    const statement = init[key]
    return _db.none(statement())
  })

  Promise.all(promises)
}

const getDb = (): Db => {
  const pgp: IMain = pgPromise()
  const db = <Db>pgp(config)
  initTables(db)
  return db
}

export default getDb