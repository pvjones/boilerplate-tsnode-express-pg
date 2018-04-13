import * as crypto from 'crypto'
import * as uuid from 'uuid'
import { Credentials, Session, UserSession, UserCredentials } from '../endpoints/models'

// Match output bytes to the native output of hash function 
// -- attackers only have to match the first x # of bytes
const hashBytes = 64
const saltBytes = 32
const iterations = 100000
const digest = 'sha512'

const bufferToHex = (buffer: Buffer): string => {
  return buffer.toString('hex')
}

export const encryptPassword = (password: string): Promise<Credentials> => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(saltBytes, (err, salt) => {
      if (err) { reject(err) }
      const hexSalt = bufferToHex(salt)

      return crypto.pbkdf2(password, hexSalt, iterations, hashBytes, digest, (err, derivedKey) => {
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
    crypto.pbkdf2(password, salt, iterations, hashBytes, digest, (err, derivedKey) => {
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

export const getToken = (headers: any): string => {
  const auth = headers['authorization']
  if (auth) {
    const tokens = auth.split(' ')
    if (tokens.length > 1) {
      return tokens[1]
    }
  }
  return ''
}
