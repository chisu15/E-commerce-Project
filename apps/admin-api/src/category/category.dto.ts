import { IsNotEmpty, IsOptional, IsString, IsMongoId } from 'class-validator'
import { Expose, Type } from 'class-transformer'

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsOptional()
  @IsString()
  description?: string

  @IsString()
  @IsNotEmpty()
  type: string

  @IsOptional()
  @IsString()
  imgUrl?: string

  @IsString()
  @IsNotEmpty()
  slug: string

  @IsMongoId()
  @IsNotEmpty()
  createdBy: string

  @IsOptional()
  @IsMongoId()
  updatedBy?: string

  @IsOptional()
  @IsMongoId()
  parentId?: string
}

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  title?: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsString()
  type?: string

  @IsOptional()
  @IsString()
  imgUrl?: string

  @IsOptional()
  @IsString()
  slug?: string

  @IsOptional()
  @IsMongoId()
  updatedBy?: string

  @IsOptional()
  @IsMongoId()
  parentId?: string
}

export class ListCategoryRequestDto {
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

export class ParentDto {
    @Expose()
    _id: string
  
    @Expose()
    title: string
  
    @Expose()
    type: string
  
    @Expose()
    imgUrl: string
  }

export class CategoryResponseDto {
  @Expose()
  _id: string

  @Expose()
  title: string

  @Expose()
  description?: string

  @Expose()
  type: string

  @Expose()
  imgUrl?: string

  @Expose()
  slug: string

  @Expose()
  @Type(() => UserMiniDto)
  createdBy: UserMiniDto

  @Expose()
  @Type(() => UserMiniDto)
  updatedBy?: UserMiniDto

  @Expose()
  @Type(() => ParentDto)
  parentId?: ParentDto

  @Expose()
  createdAt: Date

  @Expose()
  updatedAt: Date
}
