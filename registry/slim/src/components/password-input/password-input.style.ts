import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'
import { useInputStyle } from '../input/input.style'

export const usePasswordInputStyle = createVariants({
  extend: useInputStyle,

  slots: {
    visibility: 'flex cursor-pointer transition-colors duration-200 flex-center',
  },

  variants: {
    size: {
      sm: { visibility: 'size-4 -mr-0.5' },
      md: { visibility: 'size-6 -mr-1' },
      lg: { visibility: 'size-8 -mr-1.5' },
    },
  },

  compoundVariants: [
    { unstyled: false, class: { visibility: 'hover:text-foreground' } },
  ],
})

export type PasswordInputStyleSlots = Omit<typeof usePasswordInputStyle['slots'], 'suffix' | 'suffixIcon' | 'counter' | 'cleanBtn'>
export type PasswordInputStyleProps = VariantProps<typeof usePasswordInputStyle>
