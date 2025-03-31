import { ConflictException, Injectable } from '@nestjs/common';
import { User, UserRepository } from '@app/database';
import { ICreateUser, IListUser, IUpdateUser } from './user.interface';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@app/common';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(payload: ICreateUser) {
    const existed = await this.userRepository.isExist(payload.email, payload.phone);

    if (existed) {
      throw new ConflictException('Email hoặc số điện thoại đã tồn tại');
    }
    return JSON.parse(JSON.stringify(await this.userRepository.create(payload)));
  }

  async getAll(params: IListUser) {
    return JSON.parse(JSON.stringify(await this.userRepository.findAllWithMeta({
          size: params.size || DEFAULT_PAGE_SIZE,
          page: params.page || DEFAULT_PAGE,
        })))
  }
  async getById(id: string) {
    return JSON.parse(JSON.stringify(await this.userRepository.findById(id)))
  }
  
  async updateUser(id: string, dto: IUpdateUser): Promise<User | null> {
    const existing = await this.userRepository.findById(id);
    if (!existing) return null;
  
    return JSON.parse(JSON.stringify(await this.userRepository.update(id, dto)));
  }
  
  
  async deleteUser(id: string): Promise<User | null> {
    const existing = await this.userRepository.findById(id);
    if (!existing) return null;
  
    return await this.userRepository.delete(id);
  }
}
