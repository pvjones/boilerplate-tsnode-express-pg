import * as crypto from 'crypto'
import * as uuid from 'uuid'
import getConfig from '../utils/config'
import { CredentialsBase, SessionObject, UserSession } from '../endpoints/models'

// Match output bytes to the native output of hash function 
// -- attackers only have to match the first x # of bytes
const hashBytes = 64
const saltBytes = 32
const iterations = 100000
const passwordAlg = 'sha512'
const jwtAlg = 'sha256'

const objectToJSONB64 = (o: object): string => Buffer.from(JSON.stringify(o)).toString('base64')

const objectFromJSONB64 = (b64: string): object => {
  const string = Buffer.from(b64, 'base64').toString()
  const json = JSON.parse(string)
  return json
  // JSON.parse(Buffer.from(b64).toString())
}

const bufferToHex = (buffer: Buffer): string => {
  return buffer.toString('hex')
}

export const getUuid = (): string => uuid()

export const encryptPassword = (password: string): Promise<CredentialsBase> => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(saltBytes, (err, salt) => {
      if (err) { reject(err) }
      const hexSalt = bufferToHex(salt)

      return crypto.pbkdf2(password, hexSalt, iterations, hashBytes, passwordAlg, (err, derivedKey) => {
        if (err) { reject(err) }
        const hexKey = bufferToHex(derivedKey)

        resolve({
          hash: hexKey,
          salt: hexSalt,
        })
      })
    })
  })
}

export const verifyPassword = (password: string, cryptic: string, salt: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, iterations, hashBytes, passwordAlg, (err, derivedKey) => {
      if (err) { reject(err) }
      const result = bufferToHex(derivedKey) === cryptic

      resolve(result)
    })
  })
}

const createSignature = (payloadString: string): string => {
  const hmac = crypto.createHmac(jwtAlg, getConfig().api.jwtSecret)
  hmac.update(payloadString)

  return hmac.digest('base64')
}

const verifySignature = (payloadString: string | undefined, signature: string | undefined): boolean => {
  return payloadString && signature
    ? createSignature(payloadString) === signature
    : false
}

export const generateToken = (payload: { uuid: string, createdAt: Date }): string => {
  const payloadString = objectToJSONB64(payload)
  const signature = createSignature(payloadString)

  return `${payloadString}.${signature}`
}

export const parseToken = (token: string): { uuid: string, createdAt: Date } | null => {
  const parts = token.split('.')
  const payloadString = parts[0]
  const signature = parts[1]

  if (verifySignature(payloadString, signature)) {
    return objectFromJSONB64(payloadString) as { uuid: string, createdAt: Date }
  }

  return null
}

export const transformSession = (session: UserSession): SessionObject => {
  const { id, username, email, firstName, lastName, uuid, createdAt } = session

  return {
    token: generateToken({ uuid, createdAt }),
    user: { id, username, email, firstName, lastName }
  }
}
