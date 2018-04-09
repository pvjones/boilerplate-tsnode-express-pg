import { AppRequest } from '../../api'
import * as queries from '../sql/users.sql'

export const getAllUsers = async <R>(request: AppRequest): Promise<R[]> => {
  const get = queries.getAllUsers()
  return request.utils.db.many<R>(
    get.sql,
  )
}

export const getUser = async <R>(request: AppRequest, userId: number): Promise<R> => {
  const get = queries.getUser(userId)
  return request.utils.db.one<R>(
    get.sql,
    get.values,
  )
}

export const updateUser = async <R>(request: AppRequest, userId: number, username: string, firstName: string, lastName: string): Promise<R> => {
  const update = queries.updateUser(userId, firstName, lastName, username)
  const updated = await request.utils.db.one<number>(
    update.sql,
    update.values,
  )

  const get = queries.getUser(updated)
  return request.utils.db.one<R>(
    get.sql,
    get.values,
  )
}

export const createUser = async <R>(request: AppRequest, email: string, meta: any, username: string, firstName: string, lastName: string): Promise<R> => {
  const create = queries.createUser(email, meta, username, firstName, lastName)
  const created = await request.utils.db.one<number>(
    create.sql,
    create.values,
  )

  const get = queries.getUser(created)
  return request.utils.db.one<R>(
    get.sql,
    get.values,
  )
}

export const deleteUser = async (request: AppRequest, userId: number) => {
  const del = queries.deleteUser(userId)
  return request.utils.db.none(
    del.sql,
    del.values,
  )
}