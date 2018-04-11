import { UserBase, User } from '../models/users.models'

export interface Session {
  id: number
  userId: number
  token: string
  createdAt: string
  expiresAt: string
}

export interface Registration extends UserBase {
  password: string
}

export interface Login {
  email: string
  password: string
}

export interface Credentials {
  cryptic: string,
  salt: string
}

export interface UserCredentials extends User, Credentials { }

export interface UserSession {
  token: string
  user: User
}