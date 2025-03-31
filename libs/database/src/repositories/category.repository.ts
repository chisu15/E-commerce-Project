import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from '../schemas/category.schema';
import { Model } from 'mongoose';
import { ListCategoryResponse } from './interfaces/category.interface';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async create(data: Partial<Category>): Promise<Category> {
    const category = new this.categoryModel(data);
    return category.save();
  }

  async findAllWithMeta(params: {
    page: number;
    size: number;
  }): Promise<ListCategoryResponse> {
    const skip = (params.page - 1) * params.size;
    const [data, total] = await Promise.all([
      this.categoryModel
        .find()
        .skip(skip)
        .limit(params.size)
        .populate('createdBy updatedBy parentId')
        .exec(),
      this.categoryModel.countDocuments(),
    ]);

    return {
      data,
      pagination: {
        total,
        page: params.page,
        size: params.size,
      },
    };
  }

  async findById(id: string): Promise<Category | null> {
    return this.categoryModel
      .findById(id)
      .populate('createdBy updatedBy parentId')
      .exec();
  }

  async update(id: string, data: Partial<Category>): Promise<Category> {
    return this.categoryModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Category> {
    return this.categoryModel.findByIdAndDelete(id).exec();
  }
}
