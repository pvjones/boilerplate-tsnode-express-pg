interface UserMeta {
  password: string
}

export interface UserBase {
  email: string
  meta?: UserMeta
  username: string
  firstName: string
  lastName: string
}

export interface User extends UserBase {
  id: number
}