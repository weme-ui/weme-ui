import type { VariantProps } from '~/utils/styles'
import { createColorCompoundVariants, createColorVariants } from '#weme/utils/styles'
import { createVariants } from '~/utils/styles'

export const useTimerStyle = createVariants({
  slots: {
    root: 'flex-inline',
    item: 'flex-(inline col center)',
    value: 'text-center font-medium',
    label: 'text-(muted center xs)',
    separator: 'text-toned',
  },

  variants: {
    color: createColorVariants({ defaults: '' }),
    variant: { solid: '', soft: '', surface: '', outline: '', plain: '', inverse: '' },
    size: {
      sm: { root: 'gap-1', item: 'gap-1', value: 'min-w-6 text-xs', separator: 'text-sm' },
      md: { root: 'gap-1.5', item: 'gap-1.5', value: 'min-w-8 text-sm', separator: 'text-sm' },
      lg: { root: 'gap-2', item: 'gap-2', value: 'min-w-10 text-base', separator: 'text-sm' },
    },
    radius: {
      none: '',
      xs: { value: 'rounded-xs' },
      sm: { value: 'rounded-sm' },
      md: { value: 'rounded-md' },
      lg: { value: 'rounded-lg' },
      xl: { value: 'rounded-xl' },
      full: { value: 'rounded-full' },
    },
  },

  compoundVariants: [
    ...createColorCompoundVariants({
      type: 'box',
      variants: ['solid', 'soft', 'surface', 'outline', 'plain', 'inverse'],
      slot: 'value',
    }),
  ],

  defaultVariants: {
    color: 'primary',
    variant: 'soft',
    size: 'md',
    radius: 'md',
  },
})

export type TimerStyleSlots = typeof useTimerStyle['slots']
export type TimerStyleProps = VariantProps<typeof useTimerStyle>
