import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { ShopService } from '@app/shop'
import { CreateShopDto, ListShopRequestDto, ShopResponseDto, UpdateShopDto } from './shop.dto'

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get()
  async list(@Query() request: ListShopRequestDto) {
    const listShop = await this.shopService.getAll(request)
    return {
      message: 'Lấy danh sách shop thành công!',
      data: (await listShop).data.length
        ? (await listShop).data.map((item) =>
            plainToInstance(ShopResponseDto, item, {
              excludeExtraneousValues: true,
            }),
          )
        : [],
      pagination: (await listShop).pagination,
    }
  }

  @Post('create')
  async createShop(@Body() body: CreateShopDto) {
    const shop = await this.shopService.create(body)
    return {
      message: 'Tạo shop thành công!',
      data: plainToInstance(ShopResponseDto, shop, {
        excludeExtraneousValues: true,
      }),
    }
  }

  @Get('detail/:id')
  async getShopById(@Param('id') id: string) {
    const shop = await this.shopService.getById(id)

    if (!shop) {
      return {
        message: 'Không tìm thấy shop',
        data: null,
      }
    }

    return {
      message: 'Lấy chi tiết shop thành công',
      data: plainToInstance(ShopResponseDto, shop, {
        excludeExtraneousValues: true,
      }),
    }
  }

  @Patch('update/:id')
  async updateShop(@Param('id') id: string, @Body() dto: UpdateShopDto) {
    const updated = await this.shopService.update(id, dto)

    if (!updated) {
      return {
        message: 'Không tìm thấy shop để cập nhật',
        data: null,
      }
    }

    return {
      message: 'Cập nhật shop thành công',
      data: plainToInstance(ShopResponseDto, updated, {
        excludeExtraneousValues: true,
      }),
    }
  }

  @Delete('delete/:id')
  async deleteShop(@Param('id') id: string) {
    const deleted = await this.shopService.delete(id)

    if (!deleted) {
      return {
        message: 'Không tìm thấy shop để xoá',
        data: null,
      }
    }

    return {
      message: 'Xoá shop thành công',
      data: plainToInstance(ShopResponseDto, deleted, {
        excludeExtraneousValues: true,
      }),
    }
  }
}
