import { Injectable } from '@nestjs/common';
import { ProductRepository } from '@app/database';
import {
  ICreateProduct,
  IUpdateProduct,
  IListProduct,
} from './product.interface';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@app/common';
import { Types } from 'mongoose';
import { Product } from '@app/database';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(data: ICreateProduct) {
    const productData: Partial<Product> = {
      ...data,
      categoryId: new Types.ObjectId(data.categoryId),
      shopId: new Types.ObjectId(data.shopId),
      createdBy: new Types.ObjectId(data.createdBy),
      variants: data.variants || [],
    };

    return JSON.parse(
      JSON.stringify(await this.productRepository.create(productData)),
    );
  }

  async getAll(params: IListProduct) {
    const result = await this.productRepository.findAllWithMeta({
      page: params.page || DEFAULT_PAGE,
      size: params.size || DEFAULT_PAGE_SIZE,
    });

    return JSON.parse(JSON.stringify(result));
  }

  async getById(id: string) {
    return JSON.parse(
      JSON.stringify(await this.productRepository.findById(id)),
    );
  }

  async update(id: string, data: IUpdateProduct) {
    const updateData: Partial<Product> = {
        ...data,
        categoryId: data.categoryId
          ? new Types.ObjectId(data.categoryId)
          : undefined,
        shopId: data.shopId ? new Types.ObjectId(data.shopId) : undefined,
        updatedBy: data.updatedBy
          ? new Types.ObjectId(data.updatedBy)
          : undefined,
      };

    if (data.categoryId)
      updateData.categoryId = new Types.ObjectId(data.categoryId);
    if (data.shopId) updateData.shopId = new Types.ObjectId(data.shopId);
    if (data.updatedBy)
      updateData.updatedBy = new Types.ObjectId(data.updatedBy);

    return JSON.parse(
      JSON.stringify(await this.productRepository.update(id, updateData)),
    );
  }

  async delete(id: string) {
    return JSON.parse(
      JSON.stringify(await this.productRepository.delete(id)),
    );
  }
}
