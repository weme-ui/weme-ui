import { createVariants } from '~/utils/styles'

export const useLabelStyle = createVariants({
  slots: {
    root: 'text-highlighted flex-(inline y-center) gap-2 font-medium peer-disabled:is-disabled',
    hint: 'font-normal text-muted',
  },
})

export type LabelStyleSlots = typeof useLabelStyle['slots']
