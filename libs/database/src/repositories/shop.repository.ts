import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shop, ShopDocument } from '../schemas/shop.schema';

@Injectable()
export class ShopRepository {
  constructor(
    @InjectModel(Shop.name) private shopModel: Model<ShopDocument>,
  ) {}

  async create(data: Partial<Shop>): Promise<Shop> {
    return new this.shopModel(data).save();
  }

  async findAllWithMeta(params: { page: number; size: number }): Promise<{ data: Shop[]; total: number }> {
    const skip = (params.page - 1) * params.size;
    const [data, total] = await Promise.all([
      this.shopModel.find().skip(skip).limit(params.size).exec(),
      this.shopModel.countDocuments(),
    ]);
    return { data, total };
  }
}
