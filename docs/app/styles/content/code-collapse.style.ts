export const useCodeCollapseStyle = createVariants({
  slots: {
    base: 'relative [&_pre]:h-[200px]',
    trigger: 'h-18 flex-(~ center) abs inset-x-px bottom-px',
  },

  variants: {
    open: {
      true: {
        base: '[&_pre]:h-auto',
      },
      false: {
        base: '[&_pre]:overflow-hidden',
        trigger: 'bg-linear-to-t from-neutral-3',
      },
    },
  },
})
