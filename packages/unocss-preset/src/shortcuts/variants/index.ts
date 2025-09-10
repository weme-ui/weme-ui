import { badgeVariants } from './badge'
import { buttonVariants } from './button'

export * from './badge'
export * from './button'

export const componentVariants: Record<string, string[]> = {
  btn: buttonVariants,
  badge: badgeVariants,
}
