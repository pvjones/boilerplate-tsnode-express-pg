import * as crypto from 'crypto'
import * as uuid from 'uuid'
import { Credentials, Session, UserSession, UserCredentials } from '../endpoints/models'

const passwordLength = 256
const saltLength = 32
const iterations = 100000
const digest = 'sha256'

const bufferToHex = (key: any): string => {
  return key.toString('hex')
}

export const encryptPassword = (password: string): Promise<Credentials> => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(saltLength, (err, salt) => {
      if (err) { reject(err) }
      const hexSalt = bufferToHex(salt)

      return crypto.pbkdf2(password, hexSalt, iterations, passwordLength, digest, (err, derivedKey) => {
        if (err) { reject(err) }
        const hexKey = bufferToHex(derivedKey)

        resolve({
          cryptic: hexKey,
          salt: hexSalt,
        })
      })
    })
  })
}

export const verifyPassword = (password: string, cryptic: string, salt: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, iterations, passwordLength, digest, (err, derivedKey) => {
      if (err) { reject(err) }
      const result = bufferToHex(derivedKey) === cryptic

      resolve(result)
    })
  })
}

export const generateToken = (): string => uuid()

export const transformSession = (session: Session, user: UserCredentials): UserSession => {
  const { token } = session
  const { username, email, firstName, lastName, id } = user

  return {
    token,
    user: { id, username, email, firstName, lastName }
  }
}