import * as sql from '../sql/security.sql'
import {
  encryptPassword,
  verifyPassword,
  generateToken,
  transformSession,
  getToken,
} from '../../utils/security.utils'
import { AppRequest } from '../../models'
import { UserCredentials, Session, UserSession } from '../models/security.models'
import { User } from '../models/users.models'

export const register = async (request: AppRequest, password: string, email: string, firstName: string, lastName: string, username: string): Promise<User> => {
  const creds = await encryptPassword(password)
  const { cryptic, salt } = creds

  const query = sql.register(email, username, firstName, lastName, cryptic, salt)
  return request.utils.db.one<User>(query.sql, query.values)
}

export const login = async (request: AppRequest, email: string, password: string): Promise<UserSession> => {
  const query = sql.getCreds(email)
  const dbCreds = await request.utils.db.one<UserCredentials>(query.sql, query.values)

  const isVerified = await verifyPassword(password, dbCreds.cryptic, dbCreds.salt)
  if (!isVerified) throw new Error('Email and password combination do not match')

  const sessionId = await createSession(request, dbCreds.id)
  const session = await getSessionById(request, sessionId)

  return transformSession(session, dbCreds)
}

export const logout = async (request: AppRequest): Promise<void> => {
  const token = getToken(request.headers)
  return deleteSessionByToken(request, token)
}

export const createSession = async (request: AppRequest, userId: number): Promise<number> => {
  const token = generateToken()

  const expiry = new Date()
  expiry.setDate(expiry.getDate() + 1)

  const query = sql.createSession(userId, token, expiry)
  return request.utils.db.one<number>(query.sql, query.values, v => v.id)
}

export const getSessionById = async (request: AppRequest, userId: number): Promise<Session> => {
  const query = sql.getSessionById(userId)
  return request.utils.db.one<Session>(query.sql, query.values)
}

export const getSessionByToken = (request: AppRequest, token: string): Promise<Session> => {
  const query = sql.getSessionByToken(token)
  return request.utils.db.oneOrNone<Session>(query.sql, query.values)
}

export const deleteSessionByToken = (request: AppRequest, token: string): Promise<void> => {
  const query = sql.deleteSessionByToken(token)
  return request.utils.db.one(query.sql, query.values)
}