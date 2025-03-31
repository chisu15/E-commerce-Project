import { Module } from '@nestjs/common'
import { DatabaseService } from './database.service'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import * as dotenv from 'dotenv'
import { Category, CategorySchema, Shop, ShopSchema, User, UserSchema } from './schemas'
import { UserRepository } from './repositories'
import { ShopRepository } from './repositories/shop.repository'
import { CategoryRepository } from './repositories/category.repository'

dotenv.config()
@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRoot(`${process.env.MONGODB_URL}`),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Shop.name, schema: ShopSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  providers: [DatabaseService, UserRepository, ShopRepository, CategoryRepository],
  exports: [DatabaseService, MongooseModule, UserRepository, ShopRepository, CategoryRepository],
})
export class DatabaseModule {}
