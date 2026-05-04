import { SetMetadata } from '@nestjs/common'
import { Role } from '@prisma/client'
import { ROLES_KEY } from '../metadata'

/** Roles permitidos para la ruta (RBAC). Si no se usa, basta con estar autenticado. */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)
