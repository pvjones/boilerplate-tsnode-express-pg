import { Query } from '../../utils/query.utils'

export const register = (email: string, username: string, firstName: string, lastName: string, cryptic: string, salt: string): Query => {
  const sql = `
    INSERT INTO users (
      email, 
      username,
      first_name, 
      last_name, 
      meta
    ) 
    VALUES (
      $/email/, 
      $/username/, 
      $/firstName/, 
      $/lastName/, 
      $/meta/
    ) 
    RETURNING 
      email, 
      username, 
      first_name AS "firstName", 
      last_name AS "lastName"
  `
  const values = {
    email,
    username,
    firstName,
    lastName,
    meta: JSON.stringify({ cryptic, salt }),
  }

  return new Query(sql, values)
}

export const getCreds = (email: string): Query => {
  const sql = `
    SELECT
      id,
      meta->>'cryptic' AS cryptic,
      meta->>'salt' AS salt,
      email,
      username,
      first_name AS "firstName",
      last_name AS "lastName"
    FROM users
    WHERE email = $/email/
  `
  const values = { email }

  return new Query(sql, values)
}

export const createSession = (userId: number, token: string, expiresAt: Date): Query => {
  const sql = `
    INSERT INTO sessions (
      user_id,
      token,
      expires_at
    )
    VALUES (
      $/userId/,
      $/token/,
      $/expiresAt/
    )
    RETURNING
      id
  `
  const values = { userId, token, expiresAt }

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