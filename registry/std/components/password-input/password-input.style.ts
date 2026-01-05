import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'
import { useInputStyle } from '../input/input.style'

export const usePasswordInputStyle = createVariants({
  extend: useInputStyle,

  slots: {
    visibilityButton: 'flex-(~ center) text-highlighted rounded-full transition-colors hover:bg-muted',
  },

  compoundVariants: [
    { size: 'xs', class: { visibilityButton: 'p-0.5' } },
    { size: 'sm', class: { visibilityButton: 'p-0.75' } },
    { size: 'md', class: { visibilityButton: 'p-1' } },
    { size: 'lg', class: { visibilityButton: 'p-1.25' } },
    { size: 'xl', class: { visibilityButton: 'p-1.5' } },

    { invalid: true, class: { visibilityButton: 'text-danger hover:bg-danger-5' } },
  ],
})

export type PasswordInputStyleSlots = typeof usePasswordInputStyle['slots']
export type PasswordInputStyleProps = VariantProps<typeof usePasswordInputStyle>
