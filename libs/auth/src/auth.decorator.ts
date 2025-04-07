import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
  UseGuards,
} from '@nestjs/common'
import { ROLES_KEY, USER_KEY } from './auth.const'
import { JwtAuthGuard } from './auth.guard'
import { RoleGuard } from './role.guard'
import { RoleType } from './auth.role'


export function Auth(...roles: RoleType[]) {
  if (roles.length === 0) {
    roles = Object.values(RoleType)
  }

  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(JwtAuthGuard, RoleGuard),
  )
}

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    return request[USER_KEY]
  },
)
