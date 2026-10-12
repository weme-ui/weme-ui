import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const usePasswordStrengthStyle = createVariants({
  slots: {
    root: 'relative',
    track: 'mt-3 flex',
    indicator: 'flex-1 h-full',
    message: 'text-sm mt-1',
  },

  variants: {
    strength: { tooWeak: {}, weak: {}, medium: {}, strong: {} },
    size: {
      sm: { track: 'gap-xs h-0.5' },
      md: { track: 'gap-sm h-1' },
      lg: { track: 'gap-md h-2' },
    },
    unstyled: {
      false: {
        root: 'rounded-inherit',
        track: 'rounded-inherit',
        indicator: 'rounded-inherit bg-muted transition-colors duration-200',
        message: 'text-muted',
      },
    },
  },

  compoundVariants: [
    { strength: 'tooWeak', unstyled: false, class: { indicator: 'bg-password-strength-too-weak' } },
    { strength: 'weak', unstyled: false, class: { indicator: 'bg-password-strength-weak' } },
    { strength: 'medium', unstyled: false, class: { indicator: 'bg-password-strength-medium' } },
    { strength: 'strong', unstyled: false, class: { indicator: 'bg-password-strength-strong' } },
  ],

  defaultVariants: {
    size: 'md',
  },
})

export type PasswordStrengthStyleSlots = typeof usePasswordStrengthStyle['slots']
export type PasswordStrengthStyleProps = VariantProps<typeof usePasswordStrengthStyle>
