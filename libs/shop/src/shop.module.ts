import { Module } from '@nestjs/common'
import { ShopService } from './shop.service'
import { DatabaseModule } from '@app/database'

@Module({
  imports: [DatabaseModule],
  providers: [ShopService],
  exports: [ShopService],
})
export class ShopModule {}
