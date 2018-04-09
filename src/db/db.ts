import * as pgPromise from 'pg-promise'
import * as sql from './sql/init'

const config: pgPromise.TConfig = {
  host: 'localhost',
  port: 5432,
  database: 'master',
  user: 'postgres',
}

const initTables = (_db: Db): void => {
  _db.none(sql.createUsers())
}

const getDb = (): Db => {
  const pgp: pgPromise.IMain = pgPromise()
  const db = <Db>pgp(config)
  initTables(db)
  return db
}

export default getDb

export type Db = pgPromise.IDatabase<{}>