export const useNavigationListStyle = createVariants({
  slots: {
    base: 'flex-(~ col) gap-y-2',
    group: '',
    groupHeader: 'flex-(~ y-center) c-neutral-8 gap-x-2 mb-2 py-3',
    groupHeaderIcon: 'text-4',
    groupHeaderTitle: 'text-3.5',
    groupContent: 'flex-(~ col) gap-y-1.5',
    item: 'group flex-(~ y-center) gap-x-2 px-3 py-2.5 rounded transition-colors hover:bg-neutral-3',
    itemIcon: 'text-4 transition-colors group-hover:c-highlighted',
    itemTitle: 'text-3.5',
  },

  variants: {
    inset: {
      true: {
        item: 'px-6',
      },
    },

    active: {
      true: {
        item: 'bg-primary-3',
        itemIcon: 'c-primary',
        itemTitle: 'c-primary',
      },
      false: {
        itemIcon: 'c-muted',
        itemTitle: 'c-highlighted',
      },
    },
  },

  defaultVariants: {
    inset: false,
    active: false,
  },
})
