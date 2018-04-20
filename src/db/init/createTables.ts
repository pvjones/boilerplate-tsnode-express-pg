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
    id serial PRIMARY KEY,
    user_id integer NOT NULL,
    hash text NOT NULL,
    salt text NOT NULL,
    foreign key (user_id) references users (id)
  )
`

const createSessions: TQueryFunc = () => `
  CREATE TABLE IF NOT EXISTS sessions (
    id serial PRIMARY KEY,
    user_id integer NOT NULL,
    uuid text NOT NULL,
    created_at timestamp NOT NULL DEFAULT now(),
    foreign key (user_id) references users (id)
  )
`

export default {
  createUsers,
  createSecurity,
  createSessions,
} as Record<string, TQueryFunc>

