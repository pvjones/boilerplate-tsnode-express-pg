import { QueryObj } from '../../models'

export const getAllUsers = (): QueryObj => {
  const sql = `
        SELECT
          id,
          email,
          username,
          first_name AS firstName,
          last_name AS lastName
        FROM users
      `
  return { sql }
}


export const getUser = (userId: number): QueryObj => {
  const sql = `
    SELECT
      id,
      email,
      username,
      first_name AS firstName,
      last_name AS lastName
    FROM users
    WHERE
      id = $/userId/
  `
  const values = { userId }

  return { sql, values }
}

export const updateUser = (userId: number, firstName: string, lastName: string, username: string): QueryObj => {
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

  return { sql, values }
}

export const createUser = (email: string, meta: any, username: string, firstName: string, lastName: any): QueryObj => {
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

  return { sql, values }
}

export const deleteUser = (userId: number): QueryObj => {
  const sql = `
    DELETE FROM users
    WHERE id = $/userId/
  `
  const values = { userId }

  return { sql, values }
}
