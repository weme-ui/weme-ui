import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useCalendarStyle = createVariants({
  slots: {
    base: '',
    header: 'flex-(~ center)',
    heading: 'grow text-(highlighted center) font-semibold truncate',
    body: 'flex-(~ col) space-y-4 pt-4',
    grid: 'w-full border-collapse select-none space-y-1 focus:outline-none',
    gridHeadRow: 'grid-(~ cols-7) mb-1 w-full',
    gridHeadCell: 'font-semibold',
    gridBody: '',
    gridRow: 'grid-(~ cols-7) place-items-center',
    gridCell: 'relative text-center',
    gridCellTrigger: [
      'flex-(~ center) m-0.5 transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2',
      'data-[today]:font-semibold data-[outside-view]:text-muted',
      'data-[disabled]:text-muted data-[unavailable]:(line-through text-muted pointer-events-none)',
    ],
  },

  variants: {
    color: {
      accent: {
        gridHeadCell: 'text-accent',
        gridCellTrigger: [
          'focus-visible:ring-accent-8 data-[selected]:(text-accent-1 bg-accent) data-[highlighted]:bg-accent-3',
          'data-[today]:[&:not([data-selected])]:(text-accent) hover:[&:not([data-selected])]:(text-accent bg-accent-3)',
        ],
      },
      neutral: {
        gridHeadCell: 'text-neutral',
        gridCellTrigger: [
          'focus-visible:ring-neutral-8 data-[selected]:(text-neutral-1 bg-neutral) data-[highlighted]:bg-neutral-3',
          'data-[today]:[&:not([data-selected])]:(text-neutral) hover:[&:not([data-selected])]:(text-neutral bg-neutral-3)',
        ],
      },
      info: {
        gridHeadCell: 'text-info',
        gridCellTrigger: [
          'focus-visible:ring-info-8 data-[selected]:(text-info-1 bg-info) data-[highlighted]:bg-info-3',
          'data-[today]:[&:not([data-selected])]:(text-info) hover:[&:not([data-selected])]:(text-info bg-info-3)',
        ],
      },
      success: {
        gridHeadCell: 'text-success',
        gridCellTrigger: [
          'focus-visible:ring-success-8 data-[selected]:(text-success-1 bg-success) data-[highlighted]:bg-success-3',
          'data-[today]:[&:not([data-selected])]:(text-success) hover:[&:not([data-selected])]:(text-success bg-success-3)',
        ],
      },
      warning: {
        gridHeadCell: 'text-warning',
        gridCellTrigger: [
          'focus-visible:ring-warning-8 data-[selected]:(text-warning-1 bg-warning) data-[highlighted]:bg-warning-3',
          'data-[today]:[&:not([data-selected])]:(text-warning) hover:[&:not([data-selected])]:(text-warning bg-warning-3)',
        ],
      },
      error: {
        gridHeadCell: 'text-error',
        gridCellTrigger: [
          'focus-visible:ring-error-8 data-[selected]:(text-error-1 bg-error) data-[highlighted]:bg-error-3',
          'data-[today]:[&:not([data-selected])]:(text-error) hover:[&:not([data-selected])]:(text-error bg-error-3)',
        ],
      },
    },
    size: {
      xs: { heading: 'text-xs', gridHeadCell: 'text-2.5', gridCellTrigger: 'size-6 text-xs' },
      sm: { heading: 'text-sm', gridHeadCell: 'text-xs', gridCellTrigger: 'size-7 text-sm' },
      md: { heading: 'text-sm', gridHeadCell: 'text-xs', gridCellTrigger: 'size-8 text-sm' },
      lg: { heading: 'text-base', gridHeadCell: 'text-sm', gridCellTrigger: 'size-9 text-sm' },
      xl: { heading: 'text-lg', gridHeadCell: 'text-base', gridCellTrigger: 'size-10 text-base' },
    },
    radius: {
      none: '',
      sm: { gridCellTrigger: 'rounded-sm' },
      md: { gridCellTrigger: 'rounded-md' },
      lg: { gridCellTrigger: 'rounded-lg' },
      xl: { gridCellTrigger: 'rounded-xl' },
      full: { gridCellTrigger: 'rounded-full' },
    },
    disabled: {
      true: 'is-disabled',
    },
  },

  defaultVariants: {
    color: 'accent',
    size: 'md',
    radius: 'sm',
  },
})

export type CalendarStyleSlots = typeof useCalendarStyle['slots']
export type CalendarStyleProps = VariantProps<typeof useCalendarStyle>
