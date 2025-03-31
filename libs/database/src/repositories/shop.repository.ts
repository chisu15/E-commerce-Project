import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shop, ShopDocument } from '../schemas/shop.schema';
import { IUpdateShop } from '@app/shop';
import { ListShopResponse } from './interfaces/shop.interface';

@Injectable()
export class ShopRepository {
  constructor(
    @InjectModel(Shop.name) private shopModel: Model<ShopDocument>,
  ) {}

  async create(data: Partial<Shop>): Promise<Shop> {
    return new this.shopModel(data).save();
  }

  async findAllWithMeta(params: {
    page: number;
    size: number;
  }): Promise<ListShopResponse> {
    const skip = (params.page - 1) * params.size;
    const [data, total] = await Promise.all([
      this.shopModel
        .find()
        .skip(skip)
        .limit(params.size)
        .populate('createdBy')
        .exec(),
      this.shopModel.countDocuments(),
    ]);
  
    return {
      data,
      pagination: {
        total: total,
        size: params.size,
        page: params.page,
      },
    };
  }
  
  async findById(id: string): Promise<Shop | null> {
    return this.shopModel.findById(id).exec();
  }
  
  async update(id: string, data: IUpdateShop): Promise<Shop | null> {
    return this.shopModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }
  
  async delete(id: string): Promise<Shop | null> {
    return this.shopModel.findByIdAndDelete(id).exec();
  }
}
