import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useCalendarStyle = createVariants({
  slots: {
    root: 'flex-(~ col) overflow-hidden',
    header: 'flex-(~ y-center) justify-between',
    headerButton: '',
    heading: 'flex-(~ 1 center) font-medium',
    icon: '',
    grid: '',
    head: 'select-none',
    headCell: '',
    body: '',
    row: '',
    cell: 'p-0.5',
    cellTrigger: 'data-[today]:font-bold data-[unavailable]:(is-disabled line-through) data-[outside-view]:op-30 hover:data-[outside-view]:op-100',
    view: 'transform data-[active]:animate-(slide-in-right duration-200 ease-in-out)',
    viewTrigger: '',
    viewCellTrigger: '',
  },

  variants: {
    color: {
      primary: {
        heading: 'text-primary',
        headCell: 'text-primary-7',
        cellTrigger: '[[data-today]&:not([data-selected=true])]:(text-primary bg-primary-3)',
      },
      secondary: {
        heading: 'text-secondary',
        headCell: 'text-secondary-7',
        cellTrigger: '[[data-today]&:not([data-selected=true])]:(text-secondary bg-secondary-3)',
      },
      neutral: {
        heading: 'text-neutral',
        headCell: 'text-neutral-7',
        cellTrigger: '[[data-today]&:not([data-selected=true])]:(text-neutral bg-neutral-3)',
      },
      info: {
        heading: 'text-info',
        headCell: 'text-info-7',
        cellTrigger: '[[data-today]&:not([data-selected=true])]:(text-info bg-info-3)',
      },
      success: {
        heading: 'text-success',
        headCell: 'text-success-7',
        cellTrigger: '[[data-today]&:not([data-selected=true])]:(text-success bg-success-3)',
      },
      warning: {
        heading: 'text-warning',
        headCell: 'text-warning-7',
        cellTrigger: '[[data-today]&:not([data-selected=true])]:(text-warning bg-warning-3)',
      },
      danger: {
        heading: 'text-danger',
        headCell: 'text-danger-7',
        cellTrigger: '[[data-today]&:not([data-selected=true])]:(text-danger bg-danger-3)',
      },
    },
    size: {
      sm: { root: 'gap-2', headCell: 'text-xs h-5', headerButton: 'size-5', heading: 'text-xs gap-1.5 h-5', viewTrigger: 'h-5 text-xs px-2', cellTrigger: 'size-6 text-xs', viewCellTrigger: 'w-11.25 h-8' },
      md: { root: 'gap-3', headCell: 'text-xs h-6', headerButton: 'size-6', heading: 'text-sm gap-2 h-6', viewTrigger: 'h-6 text-sm', cellTrigger: 'size-8', viewCellTrigger: 'w-14.75 h-10' },
      lg: { root: 'gap-4', headCell: 'text-sm h-8', headerButton: 'size-8', heading: 'text-base gap-2.5 h-8', viewTrigger: 'h-8 text-base', cellTrigger: 'size-10', viewCellTrigger: 'w-18.25 h-12' },
    },
    radius: { none: '', xs: '', sm: '', md: '', lg: '', xl: '', full: '' },
  },

  compoundSlots: [
    { slots: ['cellTrigger', 'viewCellTrigger'], class: 'relative flex-(~ center) font-medium whitespace-nowrap cursor-default select-none outline-none transition-colors focus:shadow-[0_0_0_2px] focus:data-[readonly]:shadow-none' },

    { slots: ['cellTrigger', 'viewCellTrigger'], color: 'primary', class: 'focus:shadow-primary data-[selected=true]:(text-primary-1 bg-primary) data-[highlighted]:not-[[data-selected=true],[data-readonly]]:(text-primary bg-primary-4) hover:not-[[data-selected=true],[data-readonly]]:(text-primary bg-primary-4)' },
    { slots: ['cellTrigger', 'viewCellTrigger'], color: 'secondary', class: 'focus:shadow-secondary data-[selected=true]:(text-secondary-1 bg-secondary) hover:not-[[data-selected=true],[data-readonly]]:(text-secondary bg-secondary-4)' },
    { slots: ['cellTrigger', 'viewCellTrigger'], color: 'neutral', class: 'focus:shadow-neutral data-[selected=true]:(text-neutral-1 bg-neutral) hover:not-[[data-selected=true],[data-readonly]]:(text-neutral bg-neutral-4)' },
    { slots: ['cellTrigger', 'viewCellTrigger'], color: 'info', class: 'focus:shadow-info data-[selected=true]:(text-info-1 bg-info) hover:not-[[data-selected=true],[data-readonly]]:(text-info bg-info-4)' },
    { slots: ['cellTrigger', 'viewCellTrigger'], color: 'success', class: 'focus:shadow-success data-[selected=true]:(text-success-1 bg-success) hover:not-[[data-selected=true],[data-readonly]]:(text-success bg-success-4)' },
    { slots: ['cellTrigger', 'viewCellTrigger'], color: 'warning', class: 'focus:shadow-warning data-[selected=true]:(text-warning-1 bg-warning) hover:not-[[data-selected=true],[data-readonly]]:(text-warning bg-warning-4)' },
    { slots: ['cellTrigger', 'viewCellTrigger'], color: 'danger', class: 'focus:shadow-danger data-[selected=true]:(text-danger-1 bg-danger) hover:not-[[data-selected=true],[data-readonly]]:(text-danger bg-danger-4)' },

    { radius: 'xs', slots: ['headerButton', 'cellTrigger', 'viewTrigger', 'viewCellTrigger'], class: 'rounded-xs' },
    { radius: 'sm', slots: ['headerButton', 'cellTrigger', 'viewTrigger', 'viewCellTrigger'], class: 'rounded-sm' },
    { radius: 'md', slots: ['headerButton', 'cellTrigger', 'viewTrigger', 'viewCellTrigger'], class: 'rounded-md' },
    { radius: 'lg', slots: ['headerButton', 'cellTrigger', 'viewTrigger', 'viewCellTrigger'], class: 'rounded-lg' },
    { radius: 'xl', slots: ['headerButton', 'cellTrigger', 'viewTrigger', 'viewCellTrigger'], class: 'rounded-xl' },
    { radius: 'full', slots: ['headerButton', 'cellTrigger', 'viewTrigger', 'viewCellTrigger'], class: 'rounded-full' },
  ],

  defaultVariants: {
    color: 'primary',
    size: 'md',
    radius: 'lg',
  },
})

export type CalendarStyleSlots = typeof useCalendarStyle['slots']
export type CalendarStyleProps = VariantProps<typeof useCalendarStyle>
