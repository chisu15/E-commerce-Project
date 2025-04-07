import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { USER_KEY } from './auth.const'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, context) {
    const request = context.switchToHttp().getRequest()

    if (err || !user) {
      throw err || new UnauthorizedException('Invalid access token')
    }

    request[USER_KEY] = user
    return user
  }
}
