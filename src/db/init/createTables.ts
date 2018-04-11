import { TQueryFunc } from '../../api/models'

const createUsers: TQueryFunc = () => `
  CREATE TABLE IF NOT EXISTS users (
    id bigserial PRIMARY KEY,
    email text UNIQUE NOT NULL,
    meta json NOT NULL,
    username text,
    first_name text,
    last_name text
  )
`

const createSecurity: TQueryFunc = () => `
  CREATE TABLE IF NOT EXISTS security (
    id bigserial PRIMARY KEY
  )
`

const createSessions: TQueryFunc = () => `
  CREATE TABLE IF NOT EXISTS sessions (
    id bigserial PRIMARY KEY,
    user_id bigint NOT NULL,
    token text NOT NULL,
    created_at timestamp NOT NULL DEFAULT now(),
    expires_at timestamp NOT NULL,
    foreign key (user_id) references users (id)
  )
`

export default {
  createUsers,
  createSecurity,
  createSessions,
} as Record<string, TQueryFunc>

