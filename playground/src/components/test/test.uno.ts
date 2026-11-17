import type { UserExtendUnoConfig } from '@weme-ui/utilities'
import type { Theme } from '../../../../packages/unocss-preset/src'
import { hasParseableColor, isRequiresInvertedColor, isThemeNeutralColor } from '@weme-ui/utilities'

export default <UserExtendUnoConfig<Theme>>{
  shortcuts: [
    [
      /^btn-(.+)$/,
      ([, color]) => {
        if (hasParseableColor(color)) {
          const classNames: string[] = [
            `bg-${color} text-white-12 text-shadow-2xs hover:bg-${color}-10 focus-visible:(outline-${color}-7 z-raised)`,
          ]

          if (isRequiresInvertedColor(color)) {
            classNames.push(`dark:text-black-12`)
          }

          return classNames.join(' ')
        }
      },
      { autocomplete: `btn-$colors` },
    ],

    [
      /^btn-(.+)-soft$/,
      ([, color]) => {
        if (hasParseableColor(color)) {
          const classNames: string[] = [
            `text-${color}-11 bg-${color}-4 hover:bg-${color}-5 focus-visible:(outline-${color}-7 z-raised)`,
          ]

          return classNames.join(' ')
        }
      },
      { autocomplete: `btn-$colors-soft` },
    ],

    [
      /^btn-(.+)-outline$/,
      ([, color]) => {
        if (hasParseableColor(color)) {
          const classNames: string[] = [
            `bg-transparent hover:bg-${color}-4 focus-visible:(outline-${color}-7 z-raised)`,
            `b-(~ ${color}-4) hover:b-${color}-5`,
          ]

          if (isThemeNeutralColor(color)) {
            classNames.push(`text-${color}-11`)
          } else {
            classNames.push(`text-${color} hover:text-${color}-11`)
          }

          return classNames.join(' ')
        }
      },
      { autocomplete: `btn-$colors-outline` },
    ],

    [
      /^btn-(.+)-ghost$/,
      ([, color]) => {
        if (hasParseableColor(color)) {
          const classNames: string[] = [
            `bg-transparent hover:bg-${color}-4 focus-visible:(outline-${color}-7 z-raised)`,
          ]

          if (isThemeNeutralColor(color)) {
            classNames.push(`text-${color}-11`)
          } else {
            classNames.push(`text-${color} hover:text-${color}-11`)
          }

          return classNames.join(' ')
        }
      },
      { autocomplete: `btn-$colors-ghost` },
    ],

    [
      /^btn-(.+)-plain$/,
      ([, color]) => {
        if (hasParseableColor(color)) {
          const classNames: string[] = []

          if (isThemeNeutralColor(color)) {
            classNames.push(`text-${color}-11 hover:text-${color}-12`)
          } else {
            classNames.push(`text-${color} hover:text-${color}-11`)
          }

          return classNames.join(' ')
        }
      },
      { autocomplete: `btn-$colors-plain` },
    ],

    [
      /^btn-(.+)-inverse$/,
      ([, color]) => {
        if (hasParseableColor(color)) {
          const classNames: string[] = [
            `bg-${color}-1 hover:bg-${color}-2 focus-visible:(outline-${color}-7 z-raised)`,
          ]

          if (isThemeNeutralColor(color)) {
            classNames.push(`text-${color}-11 hover:text-${color}-12`)
          } else {
            classNames.push(`text-${color} hover:text-${color}-11`)
          }

          return classNames.join(' ')
        }
      },
      { autocomplete: `btn-$colors-inverse` },
    ],
  ],
}
