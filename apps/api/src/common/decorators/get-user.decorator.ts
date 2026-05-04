import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Role } from '@prisma/client'

export type AuthUser = {
  id: string
  email: string
  role: Role
  name: string | null
}

export const GetUser = createParamDecorator(
  (
    data: keyof AuthUser | undefined,
    ctx: ExecutionContext,
  ): AuthUser | AuthUser[keyof AuthUser] | undefined => {
    const request = ctx.switchToHttp().getRequest<{ user?: AuthUser }>()
    const user = request.user
    if (!user) return undefined
    return data ? user[data] : user
  },
)
