import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useTabsStyle = createVariants({
  slots: {
    base: 'flex overflow-hidden',
    list: 'relative flex',
    indicator: 'abs z-1',
    trigger: 'relative flex-(~ center) cursor-default select-none transition-colors z-2 data-[active]:font-medium',
    icon: '',
    loading: '',
    title: '',
    actions: 'flex-(~ 1)',
    content: 'flex-1 bg-tabs',
  },

  variants: {
    variant: {
      normal: { base: 'gap-2', list: 'self-start bg-elevated p-1', indicator: 'bg-accent-1 shadow-sm' },
      underline: { indicator: 'bg-accent-9' },
      card: { indicator: 'bg-tabs after:(abs block content-[""] z-2)' },
      capsule: { base: 'gap-2', trigger: 'data-[active]:c-accent-1', indicator: 'bg-accent-9' },
    },
    side: {
      top: { indicator: 'w-$reka-tabs-indicator-size' },
      bottom: { indicator: 'w-$reka-tabs-indicator-size' },
      left: { indicator: 'h-$reka-tabs-indicator-size' },
      right: { indicator: 'h-$reka-tabs-indicator-size' },
    },
    size: {
      xs: { trigger: 'px-3 py-1.5 text-xs gap-x-1', content: 'p-3 text-xs' },
      sm: { trigger: 'px-3.5 py-2 text-sm gap-x-1.5', content: 'p-3.5 text-sm' },
      md: { trigger: 'px-4.5 py-2.5 text-base gap-x-2', content: 'p-4.5 text-base' },
      lg: { trigger: 'px-6.5 py-2.5 text-lg gap-x-2.5', content: 'p-6.5 text-lg' },
    },
    radius: { none: '', sm: '', md: '', lg: '', xl: '', full: '' },
    animate: {
      true: { indicator: 'transition-transform duration-200 ease-in-out' },
    },
  },

  compoundVariants: [
    { side: ['top', 'bottom'], class: { base: 'flex-col', actions: 'flex-y-center justify-end pr-2' } },
    { side: ['left', 'right'], class: { base: 'flex-row', list: 'flex-col', actions: 'flex-x-center items-end pb-2' } },

    { variant: 'normal', radius: 'sm', class: { list: 'rounded-sm' } },
    { variant: 'normal', radius: 'md', class: { list: 'rounded-md' } },
    { variant: 'normal', radius: 'lg', class: { list: 'rounded-lg' } },
    { variant: 'normal', radius: 'xl', class: { list: 'rounded-xl' } },
    { variant: 'normal', radius: 'full', class: { list: 'rounded-full' } },

    { variant: 'normal', side: ['top', 'bottom'], class: { indicator: 'translate-x-[calc(var(--reka-tabs-indicator-position)-4px)]' } },
    { variant: 'normal', side: ['left', 'right'], class: { indicator: 'w-[calc(100%-8px)] translate-y-[calc(var(--reka-tabs-indicator-position)-4px)]' } },

    { variant: ['normal', 'capsule'], radius: 'sm', class: { content: 'rounded-sm' } },
    { variant: ['normal', 'capsule'], radius: 'md', class: { content: 'rounded-md' } },
    { variant: ['normal', 'capsule'], radius: 'lg', class: { content: 'rounded-lg' } },
    { variant: ['normal', 'capsule'], radius: 'xl', class: { content: 'rounded-xl' } },
    { variant: ['normal', 'capsule'], radius: 'full', class: { content: 'rounded-full' } },

    { variant: ['underline'], side: 'top', class: { content: 'b-(t default)' } },
    { variant: ['underline'], side: 'bottom', class: { content: 'b-(b default)' } },
    { variant: ['underline'], side: 'left', class: { content: 'b-(l default)' } },
    { variant: ['underline'], side: 'right', class: { content: 'b-(r default)' } },

    { variant: ['card'], side: 'top', class: { content: 'b-(~ default)' } },
    { variant: ['card'], side: 'bottom', class: { content: 'b-(~ default)' } },
    { variant: ['card'], side: 'left', class: { content: 'b-(~ default)' } },
    { variant: ['card'], side: 'right', class: { content: 'b-(~ default)' } },

    { variant: ['card', 'capsule', 'normal'], size: 'xs', class: { indicator: 'h-7' } },
    { variant: ['card', 'capsule', 'normal'], size: 'sm', class: { indicator: 'h-9' } },
    { variant: ['card', 'capsule', 'normal'], size: 'md', class: { indicator: 'h-11' } },
    { variant: ['card', 'capsule', 'normal'], size: 'lg', class: { indicator: 'h-11.5' } },

    { variant: ['normal'], radius: 'sm', class: { indicator: 'rounded-sm' } },
    { variant: ['normal'], radius: 'md', class: { indicator: 'rounded-sm' } },
    { variant: ['normal'], radius: 'lg', class: { indicator: 'rounded-md' } },
    { variant: ['normal'], radius: 'xl', class: { indicator: 'rounded-lg' } },
    { variant: ['normal'], radius: 'full', class: { indicator: 'rounded-full' } },

    { variant: ['capsule'], radius: 'sm', class: { indicator: 'rounded-sm' } },
    { variant: ['capsule'], radius: 'md', class: { indicator: 'rounded-md' } },
    { variant: ['capsule'], radius: 'lg', class: { indicator: 'rounded-lg' } },
    { variant: ['capsule'], radius: 'xl', class: { indicator: 'rounded-xl' } },
    { variant: ['capsule'], radius: 'full', class: { indicator: 'rounded-full' } },

    { variant: ['card', 'underline'], side: 'top', radius: 'sm', class: { content: 'rounded-b-sm' } },
    { variant: ['card', 'underline'], side: 'top', radius: 'md', class: { content: 'rounded-b-md' } },
    { variant: ['card', 'underline'], side: 'top', radius: 'lg', class: { content: 'rounded-b-lg' } },
    { variant: ['card', 'underline'], side: 'top', radius: 'xl', class: { content: 'rounded-b-xl' } },
    { variant: ['card', 'underline'], side: 'top', radius: 'full', class: { content: 'rounded-b-full' } },

    { variant: ['card', 'underline'], side: 'bottom', radius: 'sm', class: { content: 'rounded-t-sm' } },
    { variant: ['card', 'underline'], side: 'bottom', radius: 'md', class: { content: 'rounded-t-md' } },
    { variant: ['card', 'underline'], side: 'bottom', radius: 'lg', class: { content: 'rounded-t-lg' } },
    { variant: ['card', 'underline'], side: 'bottom', radius: 'xl', class: { content: 'rounded-t-xl' } },
    { variant: ['card', 'underline'], side: 'bottom', radius: 'full', class: { content: 'rounded-t-full' } },

    { variant: ['card', 'underline'], side: 'left', radius: 'sm', class: { content: 'rounded-r-sm' } },
    { variant: ['card', 'underline'], side: 'left', radius: 'md', class: { content: 'rounded-r-md' } },
    { variant: ['card', 'underline'], side: 'left', radius: 'lg', class: { content: 'rounded-r-lg' } },
    { variant: ['card', 'underline'], side: 'left', radius: 'xl', class: { content: 'rounded-r-xl' } },
    { variant: ['card', 'underline'], side: 'left', radius: 'full', class: { content: 'rounded-r-full' } },

    { variant: ['card', 'underline'], side: 'right', radius: 'sm', class: { content: 'rounded-l-sm' } },
    { variant: ['card', 'underline'], side: 'right', radius: 'md', class: { content: 'rounded-l-md' } },
    { variant: ['card', 'underline'], side: 'right', radius: 'lg', class: { content: 'rounded-l-lg' } },
    { variant: ['card', 'underline'], side: 'right', radius: 'xl', class: { content: 'rounded-l-xl' } },
    { variant: ['card', 'underline'], side: 'right', radius: 'full', class: { content: 'rounded-l-full' } },

    { variant: ['underline', 'card', 'normal'], class: { trigger: 'data-[active]:c-accent-9' } },
    { variant: ['card', 'capsule', 'normal'], side: ['left', 'right'], class: { indicator: 'w-full' } },

    { variant: ['underline', 'capsule', 'card'], side: ['top', 'bottom'], class: { indicator: 'translate-x-$reka-tabs-indicator-position' } },
    { variant: ['underline', 'capsule', 'card'], side: ['left', 'right'], class: { indicator: 'translate-y-$reka-tabs-indicator-position' } },

    { variant: 'underline', side: 'top', class: { indicator: 'h-0.5 -bottom-px' } },
    { variant: 'underline', side: 'bottom', class: { indicator: 'h-0.5 -top-px' } },
    { variant: 'underline', side: 'left', class: { indicator: 'w-0.5 -right-px' } },
    { variant: 'underline', side: 'right', class: { indicator: 'w-0.5 -left-px' } },

    { variant: 'card', side: 'top', class: { indicator: 'b-(x t default) after:(h-px w-full -bottom-px bg-tabs)' } },
    { variant: 'card', side: 'bottom', class: { indicator: 'b-(x b default) after:(h-px w-full -top-px bg-tabs)' } },
    { variant: 'card', side: 'left', class: { indicator: 'b-(y l default) after:(w-px h-full -right-px bg-tabs)' } },
    { variant: 'card', side: 'right', class: { indicator: 'b-(y r default) after:(w-px h-full -left-px bg-tabs)' } },

    { variant: 'card', side: 'top', radius: 'sm', class: { indicator: 'rounded-t-sm' } },
    { variant: 'card', side: 'top', radius: 'md', class: { indicator: 'rounded-t-md' } },
    { variant: 'card', side: 'top', radius: 'lg', class: { indicator: 'rounded-t-lg' } },
    { variant: 'card', side: 'top', radius: 'xl', class: { indicator: 'rounded-t-xl' } },
    { variant: 'card', side: 'top', radius: 'full', class: { indicator: 'rounded-t-full' } },

    { variant: 'card', side: 'bottom', radius: 'sm', class: { indicator: 'rounded-b-sm' } },
    { variant: 'card', side: 'bottom', radius: 'md', class: { indicator: 'rounded-b-md' } },
    { variant: 'card', side: 'bottom', radius: 'lg', class: { indicator: 'rounded-b-lg' } },
    { variant: 'card', side: 'bottom', radius: 'xl', class: { indicator: 'rounded-b-xl' } },
    { variant: 'card', side: 'bottom', radius: 'full', class: { indicator: 'rounded-b-full' } },

    { variant: 'card', side: 'left', radius: 'sm', class: { indicator: 'rounded-l-sm' } },
    { variant: 'card', side: 'left', radius: 'md', class: { indicator: 'rounded-l-md' } },
    { variant: 'card', side: 'left', radius: 'lg', class: { indicator: 'rounded-l-lg' } },
    { variant: 'card', side: 'left', radius: 'xl', class: { indicator: 'rounded-l-xl' } },
    { variant: 'card', side: 'left', radius: 'full', class: { indicator: 'rounded-l-full' } },

    { variant: 'card', side: 'right', radius: 'sm', class: { indicator: 'rounded-r-sm' } },
    { variant: 'card', side: 'right', radius: 'md', class: { indicator: 'rounded-r-md' } },
    { variant: 'card', side: 'right', radius: 'lg', class: { indicator: 'rounded-r-lg' } },
    { variant: 'card', side: 'right', radius: 'xl', class: { indicator: 'rounded-r-xl' } },
    { variant: 'card', side: 'right', radius: 'full', class: { indicator: 'rounded-r-full' } },
  ],

  defaultVariants: {
    variant: 'normal',
    side: 'top',
    size: 'sm',
    radius: 'md',
    animate: true,
  },
})

export type TabsStyleSlots = typeof useTabsStyle['slots']
export type TabsStyleProps = VariantProps<typeof useTabsStyle>
