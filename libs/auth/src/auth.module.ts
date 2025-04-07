import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './auth.guard';
import { JWT_SECRET } from './auth.const';
import { DatabaseModule, User, UserRepository } from '@app/database';
import { RoleGuard } from './role.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: `${process.env.JWT_EXP}` },
    }),
    DatabaseModule
  ],
  providers: [
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
    RoleGuard,
  ],
  exports: [
    AuthService,
    JwtAuthGuard,
    RoleGuard,
  ],
})
export class AuthModule {}
