export const useNavigationSectionsStyle = createVariants({
  slots: {
    base: 'flex-(~ col) gap-y-4',
    link: 'group flex-(~ y-center) gap-x-3 hover:c-highlighted',
    icon: 'flex-(~ center) text-3 rounded-md p-1.5 transition-colors ring-(~ default) group-hover:(bg-accent c-accent-1 ring-0)',
    title: 'flex-1 text-sm font-medium',
  },

  variants: {
    active: {
      true: {
        link: 'c-highlighted',
        icon: 'bg-accent c-accent-1 ring-0',
      },
    },
  },

  defaultVariants: {
    active: false,
  },
})
