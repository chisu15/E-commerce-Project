import { User } from "../.."

export interface Pagination {
    total: number
    page: number
    size: number
  }
  
  export interface ListUserResponse {
    data: User[]
    pagination: Pagination
  }
  