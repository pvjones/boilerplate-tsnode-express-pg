import * as helpers from '../helpers/user.helpers'
import { User } from '../models/user.models'
import { AppRequest } from '../../api'

export const getAllUsers = (request: AppRequest): Promise<User[]> => {
  return helpers.getAllUsers(request)
}

export const getUser = (request: AppRequest): Promise<User> => {
  const { id = null } = request.params || {}

  return helpers.getUser(request, id)
}

export const updateUser = (request: AppRequest): Promise<User> => {
  const {
    id = null,
    username = null,
    firstName = null,
    lastName = null,
  } = request.params || {}

  return helpers.updateUser(request, id, username, firstName, lastName)
}

export const createUser = (request: AppRequest): Promise<User> => {
  const {
    email = null,
    meta = null,
    username = null,
    firstName = null,
    lastName = null,
  } = request.params || {}

  return helpers.createUser(request, email, meta, username, firstName, lastName)
}

export const deleteUser = (request: AppRequest): Promise<void> => {
  const { id = null } = request.params || {}

  return helpers.deleteUser(request, id)
} 