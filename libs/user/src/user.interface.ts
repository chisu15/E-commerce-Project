import { GENDER } from "@app/common"

export interface IListUser {
  page?: number
  size?: number
}

export interface ICreateUser {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  gender: GENDER
  avatar?: string
}
