import { createVariants } from '~/utils/styles'

export const useAppHeaderNavStyle = createVariants({
  slots: {
    root: 'relative z-1 w-full',
    list: 'flex gap-x-2',
    item: 'select-none',
    link: [
      'flex-(~ y-center) text-3.5 font-medium ring-default px-4 py-1.5 gap-2 leading-5 transition-colors c-accent-9 tracking-tight rounded-full',
      'group hover:hover:(c-accent-1 bg-accent-9)',
    ],
    linkExternalIcon: 'size-3.5 c-accent-10',
    linkIcon: 'size-3.5 c-accent-9 transition-colors group-hover:c-accent-1',
    trigger: [
      'flex-(~ y-center) text-3.5 font-medium pl-4 pr-3 py-1.5 gap-2 leading-5 transition-colors tracking-tight c-accent-9 rounded-full',
      'group hover:(c-accent-1 bg-accent-9) state-open:(c-accent-1 bg-accent-9)',
    ],
    triggerIcon: 'size-3.5 transition group-data-[state=open]:-rotate-180',
    content: [
      'abs top-0 left-0 w-auto will-change-transform',
      'data-[motion=from-start]:animate-(slide-in-left duration-350 ease-in-out)',
      'data-[motion=from-end]:animate-(slide-in-right duration-350 ease-in-out)',
      'data-[motion=to-start]:animate-(slide-out-left duration-250 ease-in-out)',
      'data-[motion=to-end]:animate-(slide-out-right duration-250 ease-in-out)',
    ],
    subList: 'isolate grid-(~ cols-2) gap-2 w-180 p-6',
    subListLink: 'group flex-(~ y-center) gap-x-4 p-2 rounded-lg transition-colors hover:bg-accent-3',
    subListLinkIcon: 'transition-colors group-hover:(bg-accent-1 shadow-sm)',
    subListLinkLabel: 'flex-(~ y-center) justify-between font-medium text-accent-12 leading-none tracking-tight',
    subListLinkDescription: 'text-(xs toned)',
    viewportWrapper: 'abs top-full mt-3 w-auto',
    viewport: [
      'relative overflow-hidden rounded-xl b-(~ default) shadow-lg',
      'h-$reka-navigation-menu-viewport-height w-$reka-navigation-menu-viewport-width transition-[width,height]',
      'state-open:animate-(fade-in-up duration-200 ease-in-out)',
      'state-closed:animate-(fade-out-down duration-150 ease-in-out)',
      'before:(abs size-full content-[""] rounded-xl bg-neutral-1/70 backdrop-blur-3xl)',
    ],
  },
})
