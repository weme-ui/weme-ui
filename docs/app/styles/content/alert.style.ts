export const useAlertStyle = createVariants({
  slots: {
    wrapper: '',
    externalIcon: 'abs right-3 top-3',
  },

  variants: {
    color: {
      accent: {
        wrapper: [
          '[&_code]:(text-accent b-accent-7 bg-accent-4)',
          '[&_table>thead]:bg-accent-4 [&_table>thead>tr>th]:c-accent [&_table>tbody>tr>td]:b-accent-4',
        ],
        externalIcon: 'c-accent',
      },
      neutral: {
        wrapper: [
          '[&_code]:(text-neutral b-neutral-7 bg-neutral-4)',
          '[&_table>thead]:bg-neutral-4 [&_table>thead>tr>th]:c-neutral [&_table>tbody>tr>td]:b-neutral-4',
        ],
        externalIcon: 'c-neutral',
      },
      info: {
        wrapper: [
          '[&_code]:(text-info b-info-7 bg-info-4)',
          '[&_table>thead]:bg-info-4 [&_table>thead>tr>th]:c-info [&_table>tbody>tr>td]:b-info-4',
        ],
        externalIcon: 'c-info',
      },
      success: {
        wrapper: [
          '[&_code]:(text-success b-success-7 bg-success-4)',
          '[&_table>thead]:bg-success-4 [&_table>thead>tr>th]:c-success [&_table>tbody>tr>td]:b-success-4',
        ],
        externalIcon: 'c-success',
      },
      warning: {
        wrapper: [
          '[&_code]:(text-warning b-warning-7 bg-warning-4)',
          '[&_table>thead]:bg-warning-4 [&_table>thead>tr>th]:c-warning [&_table>tbody>tr>td]:b-warning-4',
        ],
        externalIcon: 'c-warning',
      },
      error: {
        wrapper: [
          '[&_code]:(text-error b-error-7 bg-error-4)',
          '[&_table>thead]:bg-error-4 [&_table>thead>tr>th]:c-error [&_table>tbody>tr>td]:b-error-4',
        ],
        externalIcon: 'c-error',
      },
    },
  },

  defaultVariants: {
    color: 'accent',
  },
})
