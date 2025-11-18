export const useOutlineStyle = createVariants({
  slots: {
    base: 'mb-5',
    title: 'flex-(~ y-center) gap-x-2 text-3.5 c-neutral-7 font-medium mb-5',
    tree: 'text-3.5 [&_li_ul]:ml-4 [&_li_a]:(block pb-2)',
  },
})
