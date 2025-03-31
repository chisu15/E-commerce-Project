import { Category } from "@app/database";

export interface ListCategoryResponse {
  data: Category[];
  pagination: {
    total: number;
    page: number;
    size: number;
  };
}
