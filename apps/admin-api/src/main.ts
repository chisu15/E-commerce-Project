import { NestFactory } from '@nestjs/core'
import { AdminApiModule } from './admin-api.module'
import * as dotenv from 'dotenv'
import { ResponseInterceptor } from '@app/common'

dotenv.config()
async function bootstrap() {
  const app = await NestFactory.create(AdminApiModule,  { bufferLogs: true })
  const port = process.env.ADMIN_PORT || 3000

  app.setGlobalPrefix('admin-api')
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(port)
  console.log(`Application is running on port ${port}`);
}
bootstrap()
