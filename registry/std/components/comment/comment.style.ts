import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useCommentStyle = createVariants({
  slots: {
    root: 'flex gap-3',
    avatar: 'shrink-0',
    wrapper: 'flex-(~ 1 col) gap-2',
    header: 'flex-(~ y-center) gap-2',
    author: 'font-medium',
    datetime: 'text-toned',
    content: 'flex-(~ col) gap-2 leading-relaxed',
    actions: 'flex-(~ y-center) gap-1',
  },

  variants: {
    variant: {
      plain: {},
      soft: { root: 'bg-muted' },
    },
    align: {
      start: { actions: 'justify-start' },
      end: { author: 'flex-1', actions: 'justify-end' },
    },
    size: {
      sm: { root: 'p-3', header: 'text-xs', content: 'text-sm' },
      md: { root: 'p-4', header: 'text-sm', content: 'text-base' },
      lg: { root: 'p-5', header: 'text-base', content: 'text-lg' },
    },
  },

  defaultVariants: {
    variant: 'plain',
    align: 'start',
    size: 'md',
  },
})

export type CommentStyleSlots = typeof useCommentStyle['slots']
export type CommentStyleProps = VariantProps<typeof useCommentStyle>
