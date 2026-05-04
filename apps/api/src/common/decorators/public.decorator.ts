import { SetMetadata } from '@nestjs/common'
import { IS_PUBLIC_KEY } from '../metadata'

/** Marca la ruta como pública (sin JWT). */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)
