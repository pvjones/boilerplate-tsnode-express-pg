import * as helpers from '../helpers/security.helpers'
import { User, Registration, Login, SessionObject } from '../models'
import { AppRequest } from '../../models'

export const register = (request: AppRequest): Promise<User> => {
  const registration: Registration = request.body
  const { password, email, firstName, lastName, username } = registration

  return helpers.register(request, password, email, firstName, lastName, username)
}

export const login = (request: AppRequest): Promise<SessionObject> => {
  const loginCreds: Login = request.body
  const { email, password } = loginCreds

  return helpers.login(request, email, password)
}

export const logout = (request: AppRequest): Promise<void> => {
  return helpers.logout(request)
}
