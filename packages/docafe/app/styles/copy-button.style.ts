import { createVariants } from '~/utils/styles'

export const useCopyButtonStyle = createVariants({
  slots: {
    base: 'relative size-6 rounded-md b-(~ default) hidden group-hover:flex',
    icon: 'abs flex-(~ center) p-1 transition-colors',
    copy: 'size-3.5',
    success: 'size-4',
  },
  variants: {
    inset: {
      true: {
        base: 'c-neutral-1 bg-neutral-11/40 b-0 hover:bg-neutral-11/60',
        success: 'c-success-8',
      },
      false: {
        base: 'c-neutral-9 bg-neutral-1 hover:b-neutral-8',
        success: 'c-success-9',
      },
    },
  },
})

export type CopyButtonSlots = ReturnType<typeof useCopyButtonStyle>
