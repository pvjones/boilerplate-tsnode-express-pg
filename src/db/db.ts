import * as pgPromise from 'pg-promise'

const config = {
  host: 'localhost',
  port: 5432,
  database: 'master',
  user: 'postgres',
}

const pgp: pgPromise.IMain = pgPromise()
const db = <pgPromise.IDatabase<{}>>pgp(config)

export default db