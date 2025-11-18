export const useCardStyle = createVariants({
  slots: {
    base: 'group relative p-6 rounded-lg b-(~ default)',
    icon: 'c-accent text-6 mb-2',
    title: 'c-accent text-lg font-medium',
    description: 'text-sm c-toned mt-4',
    externalIcon: 'abs right-6 top-6 c-toned text-4 group-hover:c-accent',
  },

  variants: {
    linkable: {
      true: {
        base: 'transition-colors hover:(b-accent ring-1 ring-accent)',
      },
    },
  },
})
