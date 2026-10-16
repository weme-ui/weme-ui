import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useEmptyStyle = createVariants({
  slots: {
    root: 'text-center flex flex-1 flex-col w-full flex-center',
    header: 'flex flex-col',
    media: '',
    title: '',
    description: '',
    content: '',
  },

  variants: {
    size: {
      sm: {
        root: 'text-xs gap-sm',
        header: 'gap-xs',
        description: 'text-xs',
      },
      md: {
        root: 'text-sm gap-md',
        header: 'gap-sm',
        description: 'text-xs',
      },
      lg: {
        root: 'text-base gap-lg',
        header: 'gap-md',
        description: 'text-sm',
      },
    },
    unstyled: {
      false: {
        root: 'b-transparent',
        header: 'text-highlighted',
        description: 'text-subtle',
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
})

export type EmptyStyleSlots = typeof useEmptyStyle['slots']
export type EmptyStyleProps = VariantProps<typeof useEmptyStyle>
