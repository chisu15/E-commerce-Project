import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { UserRepository } from '@app/database'
import { IRegisterUser, IUserPayload } from './auth.interface'
import { log } from 'console'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async validateUser(email: string, password: string) {
    const user = JSON.parse(
      JSON.stringify(await this.userRepository.findByEmail(email)),
    )
    if (!user) return null
    const isMatch = await bcrypt.compare(password, user.password)
    return isMatch ? user : null
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password)
    if (!user) throw new UnauthorizedException('Invalid credentials')

    const payload: IUserPayload = {
      sub: user._id,
      email: user.email,
      role: user.role,
    }

    const token = this.jwtService.sign(payload)
    return { accessToken: token, user: payload }
  }

  async register(dto: IRegisterUser) {
    const existing = await this.userRepository.findByEmail(dto.email);
    if (existing) throw new UnauthorizedException('Email already registered');
  
    const hashedPassword = await bcrypt.hash(dto.password, 10);
  
    const created = await this.userRepository.create({
      ...dto,
      password: hashedPassword,
    });
  
    const payload: IUserPayload = {
      sub: created._id.toString(),
      email: created.email,
      role: created.role,
    };
  
    const token = this.jwtService.sign(payload);
    return { accessToken: token, user: payload };
  }
}
