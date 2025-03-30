import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ShopService } from '@app/shop';
import { CreateShopDto, ListShopRequestDto, ShopResponseDto } from './shop.dto';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get()
  async list(@Query() request: ListShopRequestDto) {
    const { data, total } = await this.shopService.getAll(request);
    return {
      data: plainToInstance(ShopResponseDto, data, { excludeExtraneousValues: true }),
    };
  }

  @Post()
  async createShop(@Body() body: CreateShopDto) {
    const result = await this.shopService.createShop(body);
    return {
      data: plainToInstance(ShopResponseDto, result, { excludeExtraneousValues: true }),
    };
  }
}
