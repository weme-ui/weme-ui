export const usePreviewStyle = createVariants({
  slots: {
    base: 'relative flex-(~ center) bg-neutral-1 rounded-md shadow-xs min-h-60',
    wrapper: [
      'my-5 bg-neutral-3 rounded-lg p-1.5',
      '[&_pre]:rounded-t-none',
      '[&>div>div]:rounded-t-none',
    ],
  },

  variants: {
    code: {
      true: {
        base: 'b-b-0 rounded-b-none b-(~ default)',
      },
    },
  },
})
