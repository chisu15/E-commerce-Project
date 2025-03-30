import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from '../schemas/user.schema'
import { ListUserResponse } from './interfaces/user.interface'

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(data: Partial<User>): Promise<UserDocument> {
    const user = new this.userModel(data)
    const saved = await user.save();
    return saved;
  }

  async findAllWithMeta(params: {
    page: number
    size: number
  }) {
    const skip = (params.page - 1) * params.size
    const [data, total] = await Promise.all([
      this.userModel.find().skip(skip).limit(params.size).exec(),
      this.userModel.countDocuments(),
    ])
    return {
      data,
      pagination: {
        total: total,
        size: params.size,
        page: params.page,
      },
    }as ListUserResponse
  }
  async findById(id: string): Promise<User | null> {
    return (await this.userModel.findById(id).exec())
  }

  async isExist(email: string, phone: string): Promise<User | null> {
    return await this.userModel.findOne({
      $or: [{ email }, { phone }],
    }).exec();
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, data, { new: true }).exec()
  }

  async delete(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).exec()
  }
}
