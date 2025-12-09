export const useCodeGroupStyle = createVariants({
  slots: {
    base: 'relative rounded-lg',
    list: 'relative gap-1 bg-neutral-1 flex-(~ y-center) b-(~ default) b-b-0 rounded-t-lg overflow-x-auto p-2',
    indicator: 'abs z-1 h-8 left-0 inset-y-2 bg-neutral-4 rounded-lg w-$reka-tabs-indicator-size transition-[transform,width] duration-200 ease-in-out translate-x-$reka-tabs-indicator-position',
    trigger: 'relative rounded-lg data-[active]:c-highlighted flex-(inline center) cursor-default select-none transition-colors z-2 px-3 py-1.5 text-sm gap-x-1.5',
  },
})
