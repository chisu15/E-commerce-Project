import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { STATUS } from '@app/common';

export class CreateShopDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEnum(STATUS)
  @IsOptional()
  status?: STATUS;

  @IsString()
  @IsNotEmpty()
  createdBy: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  avatar?: string;
}

export class ShopResponseDto {
  @Expose()
  _id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  phone: string;

  @Expose()
  status: STATUS;

  @Expose()
  createdBy: string;

  @Expose()
  avatar?: string;

  @Expose()
  description?: string;

  @Expose()
  createdAt: Date;
}

export class ListShopRequestDto {
    //todo: add filter house
  
    @Expose({ name: 'page' })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    page: number
  
    @Expose({ name: 'size' })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    size: number
  }
  