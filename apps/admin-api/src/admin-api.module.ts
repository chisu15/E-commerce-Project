import { DatabaseModule } from '@app/database'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UserController } from './user/user.controller'
import { UserModule } from '@app/user'
import { ShopModule } from '@app/shop'
import { ShopController } from './shop/shop.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    UserModule,
    ShopModule
  ],
  controllers: [UserController, ShopController],
  providers: [],
})
export class AdminApiModule {}
