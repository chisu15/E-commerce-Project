import { Shop } from '@app/database'
export interface Pagination {
  total: number
  page: number
  size: number
}

export interface ListShopResponse {
  data: Shop[]
  pagination: {
    total: number
    size: number
    page: number
  }
}
