import { Query } from '../../utils/query.utils'

export const getAllUsers = (): Query => {
  const sql = `
        SELECT
          id,
          email,
          username,
          first_name AS "firstName",
          last_name AS "lastName"
        FROM users
      `
  return new Query(sql)
}


export const getUser = (userId: number): Query => {
  const sql = `
    SELECT
      id,
      email,
      username,
      first_name AS "firstName",
      last_name AS "lastName"
    FROM users
    WHERE
      id = $/userId/
  `
  const values = { userId }

  return new Query(sql, values)
}

export const updateUser = (userId: number, firstName: string, lastName: string, username: string): Query => {
  const sql = `
      UPDATE users
      SET
        first_name = $/firstName/
        last_name = $/lastName/
        username = $/username/
      WHERE
        id = $/userId/
      RETURNING 
        id
    `
  const values = { userId, firstName, lastName, username }

  return new Query(sql, values)
}

export const createUser = (email: string, meta: any, username: string, firstName: string, lastName: any): Query => {
  const sql = `
      INSERT INTO users (
        email,
        meta,
        username,
        first_name,
        last_name
      )
      VALUES (
        $/email/,
        $/meta/,
        $/username/,
        $/firstName/,
        $/lastName/
      )
      RETURNING 
        id
    `
  const values = { email, meta, username, firstName, lastName }

  return new Query(sql, values)
}

export const deleteUser = (userId: number): Query => {
  const sql = `
    DELETE FROM users
    WHERE id = $/userId/
  `
  const values = { userId }

  return new Query(sql, values)
}
