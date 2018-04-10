import { TQueryFunc } from '../../api/models'

const createUsers: TQueryFunc = () => `
  CREATE TABLE IF NOT EXISTS users (
    id serial PRIMARY KEY,
    email text UNIQUE NOT NULL,
    meta json NOT NULL,
    username text,
    first_name text,
    last_name text
  )
`

const createSecurity: TQueryFunc = () => `
  CREATE TABLE IF NOT EXISTS security (
    id serial PRIMARY KEY
  )
`

export default {
  createUsers,
  createSecurity,
} as Record<string, TQueryFunc>

