import { GENDER } from "@app/common"

export interface IUserPayload {
  sub: string
  email: string
  role: string
}

export interface IRegisterUser {
  firstName: string
  lastName: string
  email: string
  password: string
  phone: string
  gender: GENDER
  avatar?: string
}