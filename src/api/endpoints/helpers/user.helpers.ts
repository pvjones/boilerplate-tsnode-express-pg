import { AppRequest } from '../../models'
import * as sql from '../sql/users.sql'

export const getAllUsers = <R>(request: AppRequest): Promise<R[]> => {
  const get = sql.getAllUsers()
  return request.utils.db.many<R>(
    get.sql,
  )
}

export const getUser = <R>(request: AppRequest, userId: number): Promise<R> => {
  console.log('userId', userId)
  const get = sql.getUser(userId)
  return request.utils.db.one<R>(
    get.sql,
    get.values,
  )
}

export const updateUser = async <R>(request: AppRequest, userId: number, username: string, firstName: string, lastName: string): Promise<R> => {
  const update = sql.updateUser(userId, firstName, lastName, username)
  const updatedId = await request.utils.db.one<number>(
    update.sql,
    update.values,
    u => u.id,
  )

  return getUser<R>(request, updatedId)
}

export const createUser = async <R>(request: AppRequest, email: string, meta: any, username: string, firstName: string, lastName: string): Promise<R> => {
  const create = sql.createUser(email, meta, username, firstName, lastName)
  const createdId = await request.utils.db.one<number>(
    create.sql,
    create.values,
    u => u.id,
  )

  return getUser<R>(request, createdId)
}

export const deleteUser = async (request: AppRequest, userId: number) => {
  const del = sql.deleteUser(userId)
  return request.utils.db.none(
    del.sql,
    del.values,
  )
}