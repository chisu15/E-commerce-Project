import { Module } from '@nestjs/common'
import { DatabaseService } from './database.service'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import * as dotenv from 'dotenv'
import { Category, CategorySchema, Product, ProductSchema, Shop, ShopSchema, User, UserSchema } from './schemas'
import { UserRepository } from './repositories'
import { ShopRepository } from './repositories/shop.repository'
import { CategoryRepository } from './repositories/category.repository'
import { ProductRepository } from './repositories/product.repository'

dotenv.config()
@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRoot(`${process.env.MONGODB_URL}`),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Shop.name, schema: ShopSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  providers: [DatabaseService, UserRepository, ShopRepository, CategoryRepository, ProductRepository],
  exports: [DatabaseService, MongooseModule, UserRepository, ShopRepository, CategoryRepository, ProductRepository],
})
export class DatabaseModule {}
