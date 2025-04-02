import { Module } from '@nestjs/common'
import { ProductService } from './product.service'
import { DatabaseModule } from '@app/database'

@Module({
  imports: [DatabaseModule],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
