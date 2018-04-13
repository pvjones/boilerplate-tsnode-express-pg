import * as sql from '../sql/security.sql'
import {
  encryptPassword,
  verifyPassword,
  generateToken,
  transformSession,
  getToken,
} from '../../utils/security.utils'
import { AppRequest } from '../../models'
import { Session, UserSession, Credentials, SessionObject } from '../models/security.models'
import { User, UserMeta } from '../models/users.models'

export const register = async (request: AppRequest, password: string, email: string, firstName: string, lastName: string, username: string, meta: UserMeta = {}): Promise<User> => {
  const { hash, salt } = await encryptPassword(password)

  const query = sql.register(hash, salt, email, username, firstName, lastName, meta)
  return request.utils.db.one<User>(query.sql, query.values)
}

export const login = async (request: AppRequest, email: string, password: string): Promise<SessionObject> => {
  const query = sql.getCreds(email)
  const { hash, salt, userId } = await request.utils.db.oneOrNone<Credentials>(query.sql, query.values)

  if (!hash || !salt) throw new Error('User not found')

  const isVerified = await verifyPassword(password, hash, salt)
  if (!isVerified) throw new Error('Email and password combination do not match')

  const session = await createSession(request, userId)
  return transformSession(session)
}

export const logout = async (request: AppRequest): Promise<void> => {
  const token = getToken(request.headers)
  return deleteSessionByToken(request, token)
}

export const createSession = async (request: AppRequest, userId: number): Promise<UserSession> => {
  const token = generateToken()

  const expiry = new Date()
  expiry.setDate(expiry.getDate() + 1)

  const query = sql.createSession(userId, token, expiry)
  return request.utils.db.one<UserSession>(query.sql, query.values)
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