import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const usePasswordStrengthMeterStyle = createVariants({
  slots: {
    root: 'flex-(~ col) gap-2.5',
    bar: 'flex',
    indicator: 'flex-1 h-full bg-muted rounded-xs',
    label: 'text-(right sm highlighted) leading-none',
  },

  variants: {
    strength: {
      tooWeak: { indicator: 'bg-meter-weak' },
      weak: { indicator: 'bg-meter-weak' },
      medium: { indicator: 'bg-meter-medium' },
      strong: { indicator: 'bg-meter-strong' },
    },
    size: {
      xs: { bar: 'h-0.5 gap-1' },
      sm: { bar: 'h-0.75 gap-1.5' },
      md: { bar: 'h-1.25 gap-2' },
      lg: { bar: 'h-1.5 gap-2' },
      xl: { bar: 'h-2 gap-2' },
    },
  },

  defaultVariants: {
    size: 'sm',
  },
})

export type PasswordStrengthMeterStyleSlots = typeof usePasswordStrengthMeterStyle['slots']
export type PasswordStrengthMeterStyleProps = VariantProps<typeof usePasswordStrengthMeterStyle>
