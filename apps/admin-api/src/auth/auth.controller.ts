import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@app/auth';
import { AuthResponseDto, RegisterUserDto } from './auth.dto';
import { plainToInstance } from 'class-transformer';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
  ) {
    return this.authService.login(body.email, body.password);
  }
  
  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    const result = await this.authService.register(dto);
    return plainToInstance(AuthResponseDto, result, { excludeExtraneousValues: true });
  }
}
