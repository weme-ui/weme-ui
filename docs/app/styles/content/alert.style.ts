export const useAlertStyle = createVariants({
  slots: {
    wrapper: '',
    externalIcon: 'abs right-3 top-3',
  },

  variants: {
    color: {
      primary: {
        wrapper: [
          '[&_code]:(text-primary b-primary-7 bg-primary-4)',
          '[&_table>thead]:bg-primary-4 [&_table>thead>tr>th]:c-primary [&_table>tbody>tr>td]:b-primary-4',
        ],
        externalIcon: 'c-primary',
      },
      secondary: {
        wrapper: [
          '[&_code]:(text-secondary b-secondary-7 bg-secondary-4)',
          '[&_table>thead]:bg-secondary-4 [&_table>thead>tr>th]:c-secondary [&_table>tbody>tr>td]:b-secondary-4',
        ],
        externalIcon: 'c-secondary',
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
      danger: {
        wrapper: [
          '[&_code]:(text-danger b-danger-7 bg-danger-4)',
          '[&_table>thead]:bg-danger-4 [&_table>thead>tr>th]:c-danger [&_table>tbody>tr>td]:b-danger-4',
        ],
        externalIcon: 'c-danger',
      },
    },
  },

  defaultVariants: {
    color: 'primary',
  },
})
