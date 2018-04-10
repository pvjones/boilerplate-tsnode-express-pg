import * as crypto from 'crypto'
import {
  OnEncryptionError,
  OnEncryptionSuccess,
  OnVerifyError,
  OnVerifySuccess,
} from '../models'

const passwordLength = 256
const saltLength = 32
const iterations = 100000
const digest = 'sha256'

const bufferToHex = (key: any): string => {
  return key.toString('hex')
}

export const encryptPassword = (password: string, onSuccess: OnEncryptionSuccess, onError: OnEncryptionError): void => {
  crypto.randomBytes(saltLength, (err, salt) => {
    if (err) { onError(err) }
    const hexSalt = bufferToHex(salt)

    crypto.pbkdf2(password, hexSalt, iterations, passwordLength, digest, (err, derivedKey) => {
      if (err) { onError(err) }
      const hexKey = bufferToHex(derivedKey)

      onSuccess(hexKey, hexSalt)
    })
  })
}

export const verifyPassword = (password: string, currentPassword: string, salt: string, onSuccess: OnVerifySuccess, onError: OnVerifyError): void => {
  crypto.pbkdf2(password, salt, iterations, passwordLength, digest, (err, derivedKey) => {
    if (err) { onError(err) }
    const result = bufferToHex(derivedKey) === currentPassword

    onSuccess(result)
  })
}
