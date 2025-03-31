import { STATUS } from "@app/common"

export interface IListShop {
  page?: number
  size?: number
}

export interface ICreateShop {
  name: string;
  email: string;
  phone: string;
  description?: string;
  avatar?: string;
  createdBy: string;
}
export interface IUpdateShop {
  name?: string;
  email?: string;
  phone?: string;
  status?: STATUS;
  description?: string;
  avatar?: string;
}