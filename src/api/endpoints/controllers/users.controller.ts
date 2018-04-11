import * as helpers from '../helpers/users.helpers'
import { User } from '../models'
import { AppRequest } from '../../models'

export const getAllUsers = (request: AppRequest): Promise<User[]> => {
  return helpers.getAllUsers(request)
}

export const getUser = (request: AppRequest): Promise<User> => {
  const id = request.params.id

  return helpers.getUser(request, id)
}

export const updateUser = (request: AppRequest): Promise<User> => {
  const id = request.params.id
  const user: User = request.body
  const { username, firstName, lastName } = user

  return helpers.updateUser(request, id, username, firstName, lastName)
}

export const createUser = (request: AppRequest): Promise<User> => {
  const user: User = request.body
  const { email, meta, username, firstName, lastName } = user

  return helpers.createUser(request, email, meta, username, firstName, lastName)
}

export const deleteUser = (request: AppRequest): Promise<void> => {
  const id = request.params.id

  return helpers.deleteUser(request, id)
} 