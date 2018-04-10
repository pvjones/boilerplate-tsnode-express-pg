import { UserBase } from '.'

export interface Registration extends UserBase {
  password: string
}