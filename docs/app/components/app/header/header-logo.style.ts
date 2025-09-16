import { createVariants } from '~/utils/styles'

export const useHeaderLogoStyle = createVariants({
  slots: {
    base: 'flex-(~ y-center) gap-2 c-highlighted select-none',
    text: 'text-lg font-bold tracking-tighter',
  },
})
