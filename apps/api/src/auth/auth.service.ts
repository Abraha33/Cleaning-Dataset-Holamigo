import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Role } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { UsersService } from '../users/users.service'
import { JwtPayload } from './types/jwt-payload.type'

const BCRYPT_ROUNDS = 12

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
  ) {}

  async register(email: string, password: string, name?: string) {
    const normalized = email.toLowerCase().trim()
    const existing = await this.users.findByEmail(normalized)
    if (existing) {
      throw new ConflictException('Ya existe un usuario con este email')
    }
    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS)
    const user = await this.users.create({
      email: normalized,
      passwordHash,
      name: name ?? null,
      role: Role.LABELER,
    })
    return this.buildAuthResponse(user.id, user.email, user.role, user.name)
  }

  async login(email: string, password: string) {
    const normalized = email.toLowerCase().trim()
    const user = await this.users.findByEmail(normalized)
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas')
    }
    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) {
      throw new UnauthorizedException('Credenciales inválidas')
    }
    return this.buildAuthResponse(user.id, user.email, user.role, user.name)
  }

  private buildAuthResponse(id: string, email: string, role: Role, name: string | null) {
    const payload: JwtPayload = { sub: id, email, role }
    const accessToken = this.jwt.sign(payload)
    return {
      accessToken,
      user: { id, email, role, name },
    }
  }
}
