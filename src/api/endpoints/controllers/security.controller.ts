import * as helpers from '../helpers/security.helpers'
import { Registration, Login, UserSession } from '../models'
import { User } from '../models'
import { AppRequest } from '../../models'

export const register = (request: AppRequest): Promise<User> => {
  const registration: Registration = request.body
  const { password, email, firstName, lastName, username } = registration

  return helpers.register(request, password, email, firstName, lastName, username)
}

export const login = (request: AppRequest): Promise<UserSession> => {
  const loginCreds: Login = request.body
  const { email, password } = loginCreds

  return helpers.login(request, email, password)
}
