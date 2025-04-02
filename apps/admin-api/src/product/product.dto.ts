import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator'
import { Expose, Type } from 'class-transformer'
import { PartialType } from '@nestjs/mapped-types'
import { PRODUCT_STATUS } from '@app/common'

export class VariantDto {
  @IsString()
  name: string

  @IsNumber()
  @IsPositive()
  price: number

  @IsOptional()
  @IsNumber()
  @IsPositive()
  originalPrice?: number

  @IsNumber()
  @IsPositive()
  stock: number

  @IsOptional()
  @IsString()
  thumbnail?: string

  @IsOptional()
  attributes: Record<string, string>
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  productCode: string

  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  slug: string

  @IsOptional()
  @IsString()
  description?: string

  @IsNumber()
  price: number

  @IsOptional()
  @IsNumber()
  originalPrice?: number

  @IsNumber()
  stock: number

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[]

  @IsOptional()
  @IsString()
  thumbnail?: string

  @IsMongoId()
  categoryId: string

  @IsMongoId()
  shopId: string

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[]

  @IsOptional()
  @IsEnum(PRODUCT_STATUS)
  status?: PRODUCT_STATUS

  @IsMongoId()
  createdBy: string

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => VariantDto)
  variants?: VariantDto[]
}

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  @IsMongoId()
  updatedBy?: string
}

export class ListProductRequestDto {
  @Expose({ name: 'page' })
  @IsOptional()
  @Type(() => Number)
  page?: number

  @Expose({ name: 'size' })
  @IsOptional()
  @Type(() => Number)
  size?: number
}

export class UserMiniDto {
    @Expose() _id: string;
    @Expose() firstName: string;
    @Expose() lastName: string;
    @Expose() email: string;
    @Expose() avatar: string;
  }
  
  export class CategoryMiniDto {
    @Expose() _id: string;
    @Expose() title: string;
    @Expose() slug: string;
  }
  
  export class ShopMiniDto {
    @Expose() _id: string;
    @Expose() name: string;
    @Expose() avatar: string;
  }
  
  export class VariantResponseDto {
    @Expose() name: string;
    @Expose() price: number;
    @Expose() originalPrice?: number;
    @Expose() stock: number;
    @Expose() thumbnail?: string;
    @Expose() attributes?: Record<string, string>;
  }
  
  // === Product Response DTO ===
  export class ProductResponseDto {
    @Expose() _id: string;
    @Expose() productCode: string;
    @Expose() title: string;
    @Expose() slug: string;
    @Expose() description?: string;
    @Expose() price: number;
    @Expose() originalPrice?: number;
    @Expose() stock: number;
    @Expose() images?: string[];
    @Expose() thumbnail?: string;
  
    @Expose()
    @Type(() => CategoryMiniDto)
    categoryId: CategoryMiniDto;
  
    @Expose()
    @Type(() => ShopMiniDto)
    shopId: ShopMiniDto;
  
    @Expose() tags?: string[];
    @Expose() status: string;
  
    @Expose()
    @Type(() => UserMiniDto)
    createdBy: UserMiniDto;
  
    @Expose()
    @Type(() => UserMiniDto)
    updatedBy?: UserMiniDto;
  
    @Expose()
    @Type(() => VariantResponseDto)
    variants?: VariantResponseDto[];
  
    @Expose() createdAt: Date;
    @Expose() updatedAt: Date;
  }