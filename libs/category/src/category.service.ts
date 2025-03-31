import { Injectable } from '@nestjs/common'
import { Category, CategoryRepository } from '@app/database'
import {
  ICreateCategory,
  IUpdateCategory,
  IListCategory,
} from './category.interface'
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@app/common'
import { Types } from 'mongoose'

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(payload: ICreateCategory) {
    const newCategory = {
      ...payload,
      createdBy: new Types.ObjectId(payload.createdBy),
      updatedBy: payload.updatedBy
        ? new Types.ObjectId(payload.updatedBy)
        : undefined,
      parentId: payload.parentId
        ? new Types.ObjectId(payload.parentId)
        : undefined,
    }

    return JSON.parse(
        JSON.stringify(await this.categoryRepository.create(newCategory)))
  }

  async getAll(params: IListCategory) {
    return JSON.parse(
      JSON.stringify(
        await this.categoryRepository.findAllWithMeta({
          size: params.size || DEFAULT_PAGE_SIZE,
          page: params.page || DEFAULT_PAGE,
        }),
      ),
    )
  }

  async getById(id: string) {
    return JSON.parse(
      JSON.stringify(await this.categoryRepository.findById(id)),
    )
  }

  async update(id: string, data: IUpdateCategory) {
    const updateData = {
      title: data.title,
      description: data.description,
      type: data.type,
      imgUrl: data.imgUrl,
      slug: data.slug,
      updatedBy: data.updatedBy
      ? new Types.ObjectId(data.updatedBy)
      : undefined,
      parentId: data.parentId
        ? new Types.ObjectId(data.parentId)
        : undefined,
    } as Partial<Category>;
    console.log('Update payload:', updateData);
    return JSON.parse(
      JSON.stringify(await this.categoryRepository.update(id, updateData)),
    );
  }

  async delete(id: string) {
    return JSON.parse(JSON.stringify(await this.categoryRepository.delete(id)))
  }
}
