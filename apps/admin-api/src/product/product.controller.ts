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
import { ProductService } from '@app/product'
import {
  CreateProductDto,
  UpdateProductDto,
  ListProductRequestDto,
  ProductResponseDto,
} from './product.dto'
import { plainToInstance } from 'class-transformer'

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  async create(@Body() body: CreateProductDto) {
    const product = await this.productService.create(body)
    return plainToInstance(ProductResponseDto, product)
  }

  @Get()
  async getAll(@Query() query: ListProductRequestDto) {
    const result = await this.productService.getAll(query)
    return {
      message: 'Lấy danh sách product thành công!',
      data: result.data.map((item) =>
        plainToInstance(ProductResponseDto, item, {
          excludeExtraneousValues: true,
        }),
      ),
      pagination: result.pagination,
    }
  }
  @Get('detail/:id')
  async getById(@Param('id') id: string) {
    const product = await this.productService.getById(id)
    return plainToInstance(ProductResponseDto, product)
  }

  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() body: UpdateProductDto) {
    const updated = await this.productService.update(id, body)
    return {
      message: 'Cập nhật sản phẩm thành công!',
      data: plainToInstance(ProductResponseDto, updated),
    }
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    const deleted = await this.productService.delete(id)
    return {
      message: 'Xoá sản phẩm thành công!',
      data: plainToInstance(ProductResponseDto, deleted),
    }
  }
}
