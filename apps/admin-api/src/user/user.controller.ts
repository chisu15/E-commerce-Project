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
import { UserService } from '@app/user'
import {
  CreateUserDto,
  ListUserRequestDto,
  UpdateUserDto,
  UserResponseDto,
} from './user.dto'
import { plainToInstance } from 'class-transformer'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(@Query() request: ListUserRequestDto) {
    const listUser = this.userService.getAll(request)
    return {
      data: (await listUser).data.length
        ? (await listUser).data.map((item) =>
            plainToInstance(UserResponseDto, item, {
              excludeExtraneousValues: true,
            }),
          )
        : [],
      pagination: (await listUser).pagination,
    }
  }

  @Post('create/')
  async createUser(@Body() body: CreateUserDto) {
    try {
      const user = await this.userService.createUser(body)
      return {
        message: 'Tạo người dùng thành công!',
        data: plainToInstance(UserResponseDto, user, {
        excludeExtraneousValues: true,
      })}
    } catch (error) {
      return error.message
    }
  }
  @Get('detail/:id')
  async getUserById(@Param('id') id: string) {
    const user = await this.userService.getById(id)
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    })
  }

  @Patch('update/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const updated = await this.userService.updateUser(id, body);
  
    if (!updated) {
      return {
        message: 'Người dùng không tồn tại',
        data: null,
      };
    }
    
    return {
      message: 'Cập nhật người dùng thành công',
      data: plainToInstance(UserResponseDto, updated, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Delete('delete/:id')
  async deleteUser(@Param('id') id: string) {
    const deleted = await this.userService.deleteUser(id);
  
    if (!deleted) {
      return {
        message: 'Không tìm thấy người dùng',
        data: null,
      };
    }
  
    return {
      message: 'Xoá người dùng thành công',
      data: plainToInstance(UserResponseDto, JSON.parse(JSON.stringify(deleted)), {
        excludeExtraneousValues: true,
      }),
    };
  }
}
