import { DatabaseModule } from '@app/database'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UserController } from './user/user.controller'
import { UserModule } from '@app/user'
import { ShopModule } from '@app/shop'
import { CategoryModule } from '@app/category'
import { ShopController } from './shop/shop.controller'
import { CategoryController } from './category/category.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    UserModule,
    ShopModule,
    CategoryModule
  ],
  controllers: [UserController, ShopController, CategoryController],
  providers: [],
})
export class AdminApiModule {}
