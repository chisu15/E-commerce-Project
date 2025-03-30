import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator'
import { Expose, Transform, Type } from 'class-transformer'
import { GENDER } from '@app/common'
import { ObjectId } from 'mongoose'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string

  @IsString()
  @IsNotEmpty()
  lastName: string

  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  phone: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsEnum(GENDER)
  gender: GENDER

  @IsOptional()
  @IsString()
  avatar?: string
}

export class UserResponseDto {
  @Expose()
  // @Transform(({ value }) => value.toString())
  _id: string

  @Expose()
  firstName: string

  @Expose()
  lastName: string

  @Expose()
  email: string

  @Expose()
  phone: string

  @Expose()
  gender: GENDER

  @Expose()
  role: string

  @Expose()
  avatar: string

  @Expose()
  createdAt: Date
}
export class ListUserRequestDto {
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

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEnum(GENDER)
  gender?: GENDER;

  @IsOptional()
  @IsString()
  avatar?: string;
}