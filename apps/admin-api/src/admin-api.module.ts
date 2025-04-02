import { DatabaseModule } from '@app/database'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UserController } from './user/user.controller'
import { UserModule } from '@app/user'
import { ShopModule } from '@app/shop'
import { CategoryModule } from '@app/category'
import { ShopController } from './shop/shop.controller'
import { CategoryController } from './category/category.controller'
import { ProductModule } from '@app/product'
import { ProductController } from './product/product.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    UserModule,
    ShopModule,
    CategoryModule,
    ProductModule
  ],
  controllers: [UserController, ShopController, CategoryController, ProductController],
  providers: [],
})
export class AdminApiModule {}
