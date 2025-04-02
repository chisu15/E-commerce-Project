import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
  } from '@nestjs/common';
  import { CategoryService } from '@app/category';
  import {
    CreateCategoryDto,
    ListCategoryRequestDto,
    UpdateCategoryDto,
    CategoryResponseDto,
  } from './category.dto';
  import { plainToInstance } from 'class-transformer';
  
  @Controller('category')
  export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}
  
    @Post('create')
    async createCategory(@Body() dto: CreateCategoryDto) {
      const category = await this.categoryService.create(dto);
      return {
        message: "Tạo category thành công!",
        data: plainToInstance(CategoryResponseDto, category, {
        excludeExtraneousValues: true,
      })}
    }

    @Get()
    async getCategories(@Query() query: ListCategoryRequestDto) {
      const result = await this.categoryService.getAll(query);
      return {
        message: 'Lấy danh sách category thành công!',
        data: result.data.map((item) =>
          plainToInstance(CategoryResponseDto, item, {
            excludeExtraneousValues: true,
          }),
        ),
        pagination: result.pagination,
      };
    }
  
    @Get('detail/:id')
    async getCategoryById(@Param('id') id: string) {
      const category = await this.categoryService.getById(id);
  
      if (!category) {
        return {
          message: 'Không tìm thấy category',
          data: null,
        };
      }

      return {
        message: "Lấy thông tin Category thành công!",
        data: plainToInstance(CategoryResponseDto, category, {
          excludeExtraneousValues: true,
        }),
      };
    }
  
    @Patch('update/:id')
    async updateCategory(
      @Param('id') id: string,
      @Body() dto: UpdateCategoryDto,
    ) {
      const updated = await this.categoryService.update(id, dto);
  
      if (!updated) {
        return {
          message: 'Không tìm thấy category để cập nhật',
          data: null,
        };
      }
      return {
        message: 'Cập nhật category thành công',
        data: plainToInstance(CategoryResponseDto, updated, {
          excludeExtraneousValues: true,
        }),
      };
    }
  
    @Delete('delete/:id')
    async deleteCategory(@Param('id') id: string) {
      const deleted = await this.categoryService.delete(id);
  
      if (!deleted) {
        return {
          message: 'Không tìm thấy category để xoá',
          data: null,
        };
      }
  
      return {
        message: 'Xoá category thành công',
        data: plainToInstance(CategoryResponseDto, deleted, {
          excludeExtraneousValues: true,
        }),
      };
    }
  }
  