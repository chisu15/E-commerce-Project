import { Product } from "@app/database/schemas"

export interface Pagination {
    total: number
    page: number
    size: number
  }
  
  export interface ListProductResponse {
    data: Product[]
    pagination: Pagination
  }
  