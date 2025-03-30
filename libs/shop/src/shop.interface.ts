import { STATUS } from "@app/common"

export interface IListShop {
  page?: number
  size?: number
}

export interface ICreateShop {
  name: string

  email: string

  phone: string

  status?: STATUS

  createdBy: string

  description?: string

  avatar?: string
}
