import type { VariantProps } from '~/utils/styles'
import { createColorVariants } from '#weme/utils/styles'
import { createVariants } from '~/utils/styles'

export const useLinkStyle = createVariants({
  slots: {
    base: 'flex-(inline y-center) gap-1.5 outline-none cursor-pointer',
  },

  variants: {
    color: createColorVariants({ variant: 'plain', type: 'btn', slot: 'base' }),
    variant: {
      plain: { base: 'no-underline hover:(underline underline-offset-3 underline-current/20)' },
      underline: { base: 'underline-(~ offset-3 current/20)' },
    },
  },

  defaultVariants: {
    color: 'primary',
    variant: 'plain',
  },
})

export type LinkStyleSlots = typeof useLinkStyle['slots']
export type LinkStyleProps = VariantProps<typeof useLinkStyle>
