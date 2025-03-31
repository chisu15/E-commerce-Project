import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';
import { Model, Types } from 'mongoose';
import { IListProduct } from '@app/product';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(data: Partial<Product>): Promise<Product> {
    const product = new this.productModel(data);
    return await product.save();
  }

  async findAllWithMeta(params: IListProduct) {
    const page = params.page || 1;
    const size = params.size || 10;
    const skip = (page - 1) * size;

    const [data, total] = await Promise.all([
      this.productModel
        .find()
        .skip(skip)
        .limit(size)
        .populate([
            { path: 'categoryId' },
            { path: 'shopId' },
            { path: 'createdBy' },
            { path: 'updatedBy' },
          ])          
        .exec(),
      this.productModel.countDocuments(),
    ]);

    return {
      data,
      pagination: {
        page,
        size,
        total,
      },
    };
  }

  async findById(id: string): Promise<Product | null> {
    return this.productModel
      .findById(new Types.ObjectId(id))
      .populate([
        { path: 'categoryId' },
        { path: 'shopId' },
        { path: 'createdBy' },
        { path: 'updatedBy' },
      ])      
      .exec();
  }

  async update(
    id: string,
    updateData: Partial<Product>,
  ): Promise<Product | null> {
    return this.productModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate([
        { path: 'categoryId' },
        { path: 'shopId' },
        { path: 'createdBy' },
        { path: 'updatedBy' },
      ])      
      .exec();
  }

  async delete(id: string): Promise<Product | null> {
    return this.productModel.findByIdAndDelete(id).exec();
  }
}
