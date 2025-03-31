import { Shop, ShopRepository } from '@app/database'
import { Injectable } from '@nestjs/common'
import { ICreateShop, IListShop, IUpdateShop } from './shop.interface'
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, STATUS } from '@app/common'
import { Types } from 'mongoose'

@Injectable()
export class ShopService {
  constructor(private readonly shopRepository: ShopRepository) {}

  async getAll(params: IListShop) {
    return JSON.parse(JSON.stringify(await this.shopRepository.findAllWithMeta({
      size: params.size || DEFAULT_PAGE_SIZE,
      page: params.page || DEFAULT_PAGE,
    })))
  }

  async create(params: ICreateShop) {
    const newShop = {
      name: params.name,
      email: params.email,
      phone: params.phone,
      description: params.description,
      avatar: params.avatar,
      status: STATUS.PENDING,
      createdBy: new Types.ObjectId(params.createdBy),
    };

    return JSON.parse(JSON.stringify(await this.shopRepository.create(newShop)));
  }

  async getById(id: string) {
    return JSON.parse(
      JSON.stringify(await this.shopRepository.findById(id)),
    );
  }

  async update(id: string, data: IUpdateShop) {
    return JSON.parse(
      JSON.stringify(await this.shopRepository.update(id, data)),
    );
  }

  async delete(id: string) {
    return JSON.parse(
      JSON.stringify(await this.shopRepository.delete(id)),
    );
  }
}
