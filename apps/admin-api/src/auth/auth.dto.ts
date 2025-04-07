import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
  } from 'class-validator'
  import { GENDER } from '@app/common'
import { Expose } from 'class-transformer'
  
  export class RegisterUserDto {
    @IsString()
    @IsNotEmpty()
    firstName: string
  
    @IsString()
    @IsNotEmpty()
    lastName: string
  
    @IsEmail()
    email: string
  
    @IsString()
    @MinLength(6)
    password: string
  
    @IsString()
    phone: string
  
    @IsEnum(GENDER)
    gender: GENDER
  
    @IsOptional()
    avatar?: string
  }
  
  export class AuthUserResponseDto {
    @Expose()
    sub: string;
  
    @Expose()
    email: string;
  
    @Expose()
    role: string;
  }
  
  export class AuthResponseDto {
    @Expose()
    accessToken: string;
  
    @Expose()
    user: AuthUserResponseDto;
  }