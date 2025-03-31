import { Shop } from "@app/database";

export interface ListShopResponse {
    data: Shop[];
    pagination: {
      total: number;
      size: number;
      page: number;
    };
  }