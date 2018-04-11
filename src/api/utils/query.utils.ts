import { TQuery, QueryValues } from '../models'

export class Query {
  constructor(public sql: TQuery, public values?: QueryValues) {
    this.clean()
  }

  private clean() {
    if (typeof this.sql === 'string') this.sql = this.sql.replace(/\s+/g, ' ')
  }
}