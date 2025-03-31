import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ShopService } from '@app/shop';
import { CreateShopDto, ListShopRequestDto, ShopResponseDto } from './shop.dto';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get()
  async list(@Query() request: ListShopRequestDto) {
    const listShop = await this.shopService.getAll(request);
    return {
      message: "Lấy danh sách shop thành công!",
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

  @Post()
  async createShop(@Body() body: CreateShopDto) {
    const result = await this.shopService.createShop(body);
    return {
      data: plainToInstance(ShopResponseDto, result, { excludeExtraneousValues: true }),
    };
  }
}
