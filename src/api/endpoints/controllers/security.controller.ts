import * as helpers from '../helpers/security.helpers'
import { encryptPassword } from '../../utils/security.utils'
import { Registration } from '../models/security.models'
import {
  RequestHandler,
  OnEncryptionError,
  OnEncryptionSuccess,
} from '../../models'

export const register: RequestHandler = (req, res, next) => {
  const registration: Registration = req.body
  const { password, email, firstName, lastName, username } = registration

  const onEncryptSuccess: OnEncryptionSuccess = (encryption, salt) => {
    console.log(password, email, firstName, lastName, username, helpers)
  }

  const onEncryptError: OnEncryptionError = (error) => {
    next(error)
  }

  encryptPassword(password, onEncryptSuccess, onEncryptError)
}
