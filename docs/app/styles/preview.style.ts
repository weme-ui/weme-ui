import { createVariants } from '~/utils/styles'

export const usePreviewStyle = createVariants({
  slots: {
    base: 'flex-(~ col) p-1.5 b-(~ default) bg-accent-3 rounded-xl',
    wrapper: 'rounded-lg shadow-sm',
    preview: 'flex-(~ x-center) items-start gap-4 px-12 py-15 rounded-t-inherit',
    code: 'rounded-inherit',
  },
  variants: {
    orientation: {
      vertical: {
        preview: 'flex-row',
      },
      horizontal: {
        preview: 'flex-col items-stretch',
      },
    },
    inverse: {
      true: {
        wrapper: 'bg-accent-9',
        code: '[&_pre]:bg-neutral-11/20',
      },
      false: {
        wrapper: 'bg-neutral-1',
      },
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
})
