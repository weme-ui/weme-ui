import type { VariantProps } from '~/utils/styles'
import { createColorVariants } from '#weme/utils/styles'
import { createVariants } from '~/utils/styles'

export const useProgressStyle = createVariants({
  slots: {
    base: '',
    tracker: 'bg-elevated w-full rounded-inherit overflow-hidden',
    indicator: 'h-full rounded-inherit transition-transform',
    info: 'flex-(~ y-center)',
    label: 'flex-1 font-medium text-highlighted',
    value: 'font-mono',
  },

  variants: {
    color: createColorVariants({ type: 'box', slot: 'indicator' }),
    animate: {
      none: '',
      swing: { indicator: 'state-loading:animate-progress-swing' },
      stripe: {
        indicator: [
          'state-loading:after:(abs inset-0 content-[""] animate-progress-stripe)',
          'state-loading:after:(bg-[linear-gradient(-45deg,_rgba(255,255,255,0.2)_25%,_transparent_25%,_transparent_50%,_rgba(255,255,255,0.2)_50%,_rgba(255,255,255,0.2)_75%,_transparent_75%,_transparent)] bg-[length:30px_30px])',
        ],
      },
    },
    radius: {
      none: '',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
    },
    size: {
      xs: { tracker: 'h-0.5', info: 'text-xs' },
      sm: { tracker: 'h-1', info: 'text-sm' },
      md: { tracker: 'h-2', info: 'text-base' },
      lg: { tracker: 'h-3', info: 'text-lg' },
      xl: { tracker: 'h-4', info: 'text-xl' },
    },
    showInfo: {
      true: {
        base: 'flex-(~ col)',
      },
    },
  },

  compoundVariants: [
    { showInfo: true, size: 'xs', class: { base: 'gap-y-0.5' } },
    { showInfo: true, size: 'sm', class: { base: 'gap-y-1' } },
    { showInfo: true, size: 'md', class: { base: 'gap-y-2' } },
    { showInfo: true, size: 'lg', class: { base: 'gap-y-2.5' } },
    { showInfo: true, size: 'xl', class: { base: 'gap-y-3' } },
  ],

  defaultVariants: {
    color: 'primary',
    animate: 'none',
    radius: 'xl',
    size: 'md',
  },
})

export type ProgressStyleSlots = typeof useProgressStyle['slots']
export type ProgressStyleProps = VariantProps<typeof useProgressStyle>
