import { Module } from '@nestjs/common'
import { CategoryService } from './category.service'
import { DatabaseModule } from '@app/database'

@Module({
  imports: [DatabaseModule],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
