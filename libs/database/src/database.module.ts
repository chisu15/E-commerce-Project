import { Module } from '@nestjs/common'
import { DatabaseService } from './database.service'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import * as dotenv from 'dotenv'
import { Shop, ShopSchema, User, UserSchema } from './schemas'
import { UserRepository } from './repositories'
import { ShopRepository } from './repositories/shop.repository'

dotenv.config()
@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRoot(`${process.env.MONGODB_URL}`),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Shop.name, schema: ShopSchema },
    ]),
  ],
  providers: [DatabaseService, UserRepository, ShopRepository],
  exports: [DatabaseService, MongooseModule, UserRepository, ShopRepository],
})
export class DatabaseModule {}
