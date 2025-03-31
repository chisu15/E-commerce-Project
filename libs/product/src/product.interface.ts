import { Types } from 'mongoose';

export interface IVariant {
  name: string;
  price: number;
  originalPrice?: number;
  stock: number;
  thumbnail?: string;
  attributes: Record<string, string>;
}

export interface ICreateProduct {
  productCode: string;
  title: string;
  slug: string;
  description?: string;
  price: number;
  originalPrice?: number;
  stock: number;
  images?: string[];
  thumbnail?: string;
  categoryId: string | Types.ObjectId;
  shopId: string | Types.ObjectId;
  tags?: string[];
  status?: 'active' | 'inactive' | 'draft';
  createdBy: string | Types.ObjectId;
  variants?: IVariant[];
}

export interface IUpdateProduct {
  title?: string;
  slug?: string;
  description?: string;
  price?: number;
  originalPrice?: number;
  stock?: number;
  images?: string[];
  thumbnail?: string;
  categoryId?: string | Types.ObjectId;
  shopId?: string | Types.ObjectId;
  tags?: string[];
  status?: 'active' | 'inactive' | 'draft';
  updatedBy?: string | Types.ObjectId;
  variants?: IVariant[];
}

export interface IListProduct {
  page?: number;
  size?: number;
}
