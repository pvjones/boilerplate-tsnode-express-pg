import { UserBase, User } from '../models/users.models'


export interface Registration extends UserBase {
  password: string
}

export interface Login {
  email: string
  password: string
}

export interface CredentialsBase {
  hash: string
  salt: string
}

export interface Credentials extends CredentialsBase {
  userId: number
}

export interface SessionBase {
  token: string
  expiresAt: Date
}

export interface Session extends SessionBase {
  id: number
  userId: number
  createdAt: Date
}

export interface UserSession extends User, Session { }

export interface SessionObject {
  session: SessionBase
  user: User
}