import { Injectable } from '@nestjs/common'
import { Prisma, Role } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } })
  }

  findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } })
  }

  create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data })
  }

  /** Útil para seeds o administración interna. */
  createWithRole(email: string, passwordHash: string, role: Role, name?: string | null) {
    return this.prisma.user.create({
      data: {
        email: email.toLowerCase().trim(),
        passwordHash,
        role,
        name: name ?? null,
      },
    })
  }
}
