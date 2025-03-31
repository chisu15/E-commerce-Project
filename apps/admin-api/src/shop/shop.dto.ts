import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
  IsMongoId,
} from 'class-validator'
import { Expose, Transform, Type } from 'class-transformer'
import { STATUS } from '@app/common'

export class CreateShopDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  phone: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsString()
  avatar?: string

  @IsMongoId()
  @IsNotEmpty()
  createdBy: string
}

export class UpdateShopDto {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  email?: string

  @IsOptional()
  @IsString()
  phone?: string

  @IsOptional()
  @IsEnum(STATUS)
  status?: STATUS

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsString()
  avatar?: string
}

export class ListShopRequestDto {
  @Expose({ name: 'page' })
  @IsOptional()
  page?: number

  @Expose({ name: 'size' })
  @IsOptional()
  size?: number
}
export class UserMiniDto {
  @Expose()
  _id: string

  @Expose()
  firstName: string

  @Expose()
  lastName: string

  @Expose()
  email: string

  @Expose()
  avatar: string
}
export class ShopResponseDto {
  @Expose()
  _id: string

  @Expose()
  name: string

  @Expose()
  email: string

  @Expose()
  phone: string

  @Expose()
  status: STATUS

  @Expose()
  description?: string

  @Expose()
  avatar?: string

  @Expose()
  @Type(() => UserMiniDto)
  createdBy: UserMiniDto;

  @Expose()
  createdAt: Date
}
