import { createVariants } from '~/utils/styles'

export const useHeaderNavigationStyle = createVariants({
  slots: {
    base: 'relative z-1 w-full',
    list: 'flex gap-2',
    item: 'select-none',
    itemLink: [
      'flex-(~ y-center) px-4 py-1.5 gap-2 transition-colors rounded-full',
      'c-highlighted tracking-tight hover:(c-primary-1 bg-primary)',
    ],
    itemLinkIcon: 'size-3.5 transition-colors',
    itemLinkLabel: 'text-3.5 font-medium leading-5',
    itemLinkExternalIcon: 'size-3.5 c-primary-8',
    trigger: [
      'group flex-(~ y-center) pl-4 pr-3 py-1.5 gap-2 transition-colors rounded-full',
      'c-highlighted tracking-tight hover:(c-primary-1 bg-primary) state-open:(c-primary-1 bg-primary)',
    ],
    triggerLabel: 'text-3.5 font-medium leading-5',
    triggerIcon: 'size-3.5 transition group-state-open:-rotate-180',
    content: [
      'abs top-0 left-0 w-auto will-change-transform',
      'motion-from-start:animate-(slide-in-left duration-350 ease-in-out)',
      'motion-from-end:animate-(slide-in-right duration-350 ease-in-out)',
      'motion-to-start:animate-(slide-out-left duration-250 ease-in-out)',
      'motion-to-end:animate-(slide-out-right duration-250 ease-in-out)',
    ],
    contentList: 'isolate grid-(~ cols-2) gap-2 w-180 p-6',
    contentItem: 'group flex-(~ y-center) gap-x-4 p-2 rounded-lg transition-colors hover:bg-primary-3',
    contentItemIcon: 'transition-colors group-hover:(bg-primary-1 shadow-xs)',
    contentItemWrapper: 'flex-(~ 1 col) gap-y-1',
    contentItemLabel: 'flex-(~ y-center) text-3.5 justify-between font-medium c-primary-12 leading-none tracking-tight',
    contentItemDescription: 'text-(xs toned)',
    contentItemExternalIcon: 'size-3.5 c-primary-8 group-hover:c-primary',
    viewportWrapper: 'abs top-full mt-3 w-auto',
    viewport: [
      'relative overflow-hidden rounded-xl bg-neutral-1 b-(~ default) shadow-(lg neutral-4)',
      'h-$reka-navigation-menu-viewport-height w-$reka-navigation-menu-viewport-width transition-[width,height]',
      'state-open:animate-(fade-in-up duration-200 ease-in-out)',
      'state-closed:animate-(fade-out-down duration-150 ease-in-out)',
    ],
  },
})
