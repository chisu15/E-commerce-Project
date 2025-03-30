import { Shop, ShopRepository } from '@app/database'
import { Injectable } from '@nestjs/common'
import { ICreateShop, IListShop } from './shop.interface'
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, STATUS } from '@app/common'

@Injectable()
export class ShopService {
  constructor(private readonly shopRepository: ShopRepository) {}

  async getAll(params: IListShop) {
    return await this.shopRepository.findAllWithMeta({
      size: params.size || DEFAULT_PAGE_SIZE,
      page: params.page || DEFAULT_PAGE,
    })
  }

  async createShop(params: ICreateShop) {
    const newShop = {
      name: params.name,

      email: params.email,

      phone: params.phone,

      status: STATUS.PENDING,

      createdBy: params.createdBy,

      description: params.description,

      avatar: params.avatar,
    } as Partial<Shop>
    return this.shopRepository.create(newShop)
  }
}
