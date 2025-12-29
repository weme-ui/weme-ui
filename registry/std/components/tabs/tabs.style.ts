import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useTabsStyle = createVariants({
  slots: {
    root: 'flex',
    listWrapper: 'relative flex',
    list: 'relative flex',
    indicator: 'abs z-1',
    trigger: 'relative z-2 flex-(~ center) cursor-default transition-colors data-[active]:(text-highlighted font-semibold) focus-visible:outline-primary',
    icon: '',
    title: '',
    content: 'flex-1',
    actions: 'flex-(~ 1)',
  },

  variants: {
    variant: {
      line: { indicator: 'bg-primary' },
      pill: { indicator: 'bg-elevated' },
      card: { indicator: 'after:(abs content-[""] z-2)', content: 'b-(~ default)' },
      capsule: { list: 'self-start bg-elevated p-1', indicator: 'bg-default shadow-sm', actions: 'abs' },
      plain: {},
    },
    side: {
      top: { indicator: 'w-$reka-tabs-indicator-size' },
      bottom: { indicator: 'w-$reka-tabs-indicator-size' },
      left: { indicator: 'h-$reka-tabs-indicator-size w-full' },
      right: { indicator: 'h-$reka-tabs-indicator-size w-full' },
    },
    size: {
      sm: { trigger: 'text-xs gap-1 px-3 h-6', content: 'text-xs p-2.5' },
      md: { trigger: 'text-sm gap-1.5 px-4 h-8', content: 'text-sm p-3' },
      lg: { trigger: 'text-base gap-2 px-5 h-10', content: 'text-base p-4.5' },
    },
    radius: { none: '', xs: '', sm: '', md: '', lg: '', xl: '', full: '' },
    animate: {
      true: { indicator: 'transition-transform duration-200 ease-in-out' },
    },
    loading: {
      true: { icon: 'animate-spin' },
    },
  },

  compoundVariants: [
    { side: ['top', 'bottom'], class: { root: 'flex-col', actions: 'flex-y-center justify-end pr-1' } },
    { side: ['left', 'right'], class: { root: 'flex-row', list: 'flex-col', actions: 'flex-x-center items-end pb-2' } },

    { variant: 'line', side: 'top', class: { indicator: 'h-0.5 -bottom-px', content: 'b-(t default)' } },
    { variant: 'line', side: 'bottom', class: { indicator: 'h-0.5 -top-px', content: 'b-(b default)' } },
    { variant: 'line', side: 'left', class: { indicator: 'w-0.5 -right-px', content: 'b-(l default)' } },
    { variant: 'line', side: 'right', class: { indicator: 'w-0.5 -left-px', content: 'b-(r default)' } },

    { variant: 'card', side: 'top', class: { indicator: 'b-(t x default) rounded-b-none! after:(h-px w-full -bottom-px bg-default)', content: 'data-[first]:rounded-tl-0' } },
    { variant: 'card', side: 'bottom', class: { indicator: 'b-(b x default) rounded-t-none! after:(h-px w-full -top-px bg-default)', content: 'data-[first]:rounded-bl-0' } },
    { variant: 'card', side: 'left', class: { indicator: 'b-(l y default) rounded-r-none! after:(w-px h-full -right-px bg-default)', content: 'data-[first]:rounded-tl-0' } },
    { variant: 'card', side: 'right', class: { indicator: 'b-(r y default) rounded-l-none! after:(w-px h-full -left-px bg-default)', content: 'data-[first]:rounded-tr-0' } },

    { variant: 'card', radius: 'xs', class: { content: 'rounded-xs' } },
    { variant: 'card', radius: 'sm', class: { content: 'rounded-sm' } },
    { variant: 'card', radius: 'md', class: { content: 'rounded-md' } },
    { variant: 'card', radius: 'lg', class: { content: 'rounded-lg' } },
    { variant: 'card', radius: 'xl', class: { content: 'rounded-xl' } },
    { variant: 'card', radius: 'full', class: { indicator: 'rounded-s-lg rounded-e-lg', content: 'rounded-xl' } },

    { variant: 'capsule', radius: 'xs', class: { list: 'rounded-sm' } },
    { variant: 'capsule', radius: 'sm', class: { list: 'rounded-md' } },
    { variant: 'capsule', radius: 'md', class: { list: 'rounded-lg' } },
    { variant: 'capsule', radius: 'lg', class: { list: 'rounded-xl' } },
    { variant: 'capsule', radius: 'xl', class: { list: 'rounded-xl' } },
    { variant: 'capsule', radius: 'full', class: { list: 'rounded-full' } },

    { variant: 'capsule', side: ['top', 'bottom'], class: { indicator: 'translate-x-[calc(var(--reka-tabs-indicator-position)-4px)]', actions: 'abs-y-center right-1' } },
    { variant: 'capsule', side: ['left', 'right'], class: { indicator: 'w-[calc(100%-8px)] translate-y-[calc(var(--reka-tabs-indicator-position)-4px)]', actions: 'abs-x-center bottom-1' } },

    { variant: 'plain', side: ['left', 'right'], class: { listWrapper: 'flex-col' } },

    { variant: ['pill', 'capsule'], class: { root: 'gap-2' } },

    { variant: ['card', 'pill', 'capsule'], size: 'sm', class: { indicator: 'h-6' } },
    { variant: ['card', 'pill', 'capsule'], size: 'md', class: { indicator: 'h-8' } },
    { variant: ['card', 'pill', 'capsule'], size: 'lg', class: { indicator: 'h-10' } },

    { variant: ['card', 'pill', 'capsule'], radius: 'xs', class: { indicator: 'rounded-s-xs rounded-e-xs' } },
    { variant: ['card', 'pill', 'capsule'], radius: 'sm', class: { indicator: 'rounded-s-sm rounded-e-sm' } },
    { variant: ['card', 'pill', 'capsule'], radius: 'md', class: { indicator: 'rounded-s-md rounded-e-md' } },
    { variant: ['card', 'pill', 'capsule'], radius: 'lg', class: { indicator: 'rounded-s-lg rounded-e-lg' } },
    { variant: ['card', 'pill', 'capsule'], radius: 'xl', class: { indicator: 'rounded-s-xl rounded-e-xl' } },

    { variant: ['pill', 'capsule'], radius: 'full', class: { indicator: 'rounded-s-full rounded-e-full' } },

    { variant: ['pill', 'line', 'card'], side: ['top', 'bottom'], class: { indicator: 'translate-x-$reka-tabs-indicator-position' } },
    { variant: ['pill', 'line', 'card'], side: ['left', 'right'], class: { indicator: 'translate-y-$reka-tabs-indicator-position', listWrapper: 'flex-col' } },
  ],

  defaultVariants: {
    variant: 'line',
    side: 'top',
    size: 'md',
    radius: 'md',
    animate: false,
  },
})

export type TabsStyleSlots = typeof useTabsStyle['slots']
export type TabsStyleProps = VariantProps<typeof useTabsStyle>
