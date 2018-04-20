import { Query } from '../../utils/query.utils'
import { UserMeta } from '../models'

export const register = (hash: string, salt: string, email: string, username: string, firstName: string, lastName: string, meta: UserMeta): Query => {
  const sql = `
    WITH 
      UsersCTE AS (
        INSERT INTO users (
          email,
          username,
          first_name,
          last_name,
          meta
        ) VALUES (
          $/email/, 
          $/username/, 
          $/firstName/, 
          $/lastName/, 
          $/meta/
        )
        RETURNING *
      ), 
      SecurityCTE AS (
        INSERT INTO security (
          user_id,
          hash,
          salt
        ) VALUES (
          (SELECT id FROM UsersCTE),
          $/hash/,
          $/salt/
        )
      )
    SELECT * FROM UsersCTE
  `
  const values = {
    email,
    username,
    firstName,
    lastName,
    hash,
    salt,
    meta,
  }

  return new Query(sql, values)
}

export const getCreds = (email: string): Query => {
  const sql = `
    SELECT
      user_id AS "userId",
      hash,
      salt
    FROM security s 
    INNER JOIN users u 
      ON (s.user_id = u.id)
    WHERE u.email = $/email/
  `
  const values = { email }

  return new Query(sql, values)
}

export const createSession = (userId: number, uuid: string): Query => {
  const sql = `
    WITH
      SessionsCTE AS (
        INSERT INTO sessions (
          user_id,
          uuid
        ) VALUES (
          $/userId/,
          $/uuid/
        )
        RETURNING *
      )
    SELECT
      u.id,
      u.username,
      u.email,
      u.first_name AS "firstName",
      u.last_name AS "lastName",
      u.meta,
      s.uuid,
      s.created_at AS "createdAt"
    FROM SessionsCTE s
    INNER JOIN users u 
      ON (s.user_id = u.id)
  `
  const values = { userId, uuid }

  return new Query(sql, values)
}

export const getSessionById = (sessionId: number): Query => {
  const sql = `
    SELECT *
    FROM sessions
    WHERE id = $/sessionId/
  `
  const values = { sessionId }

  return new Query(sql, values)
}

export const getSessionByUuid = (uuid: string): Query => {
  const sql = `
    SELECT *
    FROM sessions
    WHERE uuid = $/uuid/
  `
  const values = { uuid }

  return new Query(sql, values)
}

export const deleteSessionByUuid = (uuid: string): Query => {
  const sql = `
    DELETE FROM sessions
    WHERE uuid = $/uuid/
    RETURNING id
  `
  const values = { uuid }

  return new Query(sql, values)
}