import { AppRequest } from '../../models'
import * as sql from '../sql/users.sql'

export const getAllUsers = <R>(request: AppRequest): Promise<R[]> => {
  const query = sql.getAllUsers()
  return request.utils.db.many<R>(query.sql)
}

export const getUser = <R>(request: AppRequest, userId: number): Promise<R> => {
  console.log('userId', userId)
  const query = sql.getUser(userId)
  return request.utils.db.one<R>(query.sql, query.values)
}

export const updateUser = async <R>(request: AppRequest, userId: number, username: string, firstName: string, lastName: string): Promise<R> => {
  const query = sql.updateUser(userId, firstName, lastName, username)
  const updatedId: number = await request.utils.db.one<number>(
    query.sql,
    query.values,
    u => u.id,
  )

  return getUser<R>(request, updatedId)
}

export const createUser = async <R>(request: AppRequest, email: string, meta: any, username: string, firstName: string, lastName: string): Promise<R> => {
  const query = sql.createUser(email, meta, username, firstName, lastName)
  const createdId = await request.utils.db.one<number>(
    query.sql,
    query.values,
    u => u.id,
  )

  return getUser<R>(request, createdId)
}

export const deleteUser = async (request: AppRequest, userId: number) => {
  const query = sql.deleteUser(userId)
  return request.utils.db.none(query.sql, query.values)
}