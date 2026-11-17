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
            `bg-${color} text-${color}-1 text-shadow-2xs hover:bg-${color}-10 focus-visible:(outline-${color}-7 z-high)`,
          ]

          if (isRequiresInvertedColor(color)) {
            classNames.push(`dark:text-${color}-8`)
          } else {
            classNames.push(`dark:text-${color}-12`)
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
          const classNames: string[] = [`focus-visible:(outline-${color}-7 z-high)`]

          if (isThemeNeutralColor(color)) {
            classNames.push(
              `text-${color}-11 bg-${color}-4 hover:text-${color}-12 hover:bg-${color}-5`,
            )
          } else {
            classNames.push(
              `text-${color} bg-${color}-3 hover:text-${color}-10 hover:bg-${color}-4`,
            )
          }

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
            `bg-transparent hover:(text-${color}-10 bg-${color}-4) focus-visible:(outline-${color}-7 z-high)`,
            `b-(~ ${color}-4) hover:b-${color}-5`,
          ]

          if (isThemeNeutralColor(color)) {
            classNames.push(`text-${color}-11 hover:text-${color}-12`)
          } else {
            classNames.push(`text-${color} hover:text-${color}-10`)
          }

          return classNames.join(' ')
        }
      },
      { autocomplete: `btn-$colors-outline` },
    ],

    // ghost : btn-$color-ghost
    [
      /^btn-(.+)-ghost$/,
      ([, color]) => {
        if (hasParseableColor(color)) {
          const classNames: string[] = [
            `bg-transparent hover:bg-${color}-4 focus-visible:(outline-${color}-7 z-high)`,
          ]

          if (isThemeNeutralColor(color) || isThemeNeutralColor(color)) {
            classNames.push(`text-${color}-11`)
          } else {
            classNames.push(`text-${color}`)
          }

          return classNames.join(' ')
        }
      },
      { autocomplete: `btn-$colors-ghost` },
    ],

    // plain : btn-$color-plain
    [
      /^btn-(.+)-plain$/,
      ([, color]) => {
        if (hasParseableColor(color)) {
          const classNames: string[] = [`text-${color} hover:text-${color}-10`]

          return classNames.join(' ')
        }
      },
      { autocomplete: `btn-$colors-plain` },
    ],

    // inverse : btn-$color-inverse
    [
      /^btn-(.+)-inverse$/,
      ([, color]) => {
        if (hasParseableColor(color)) {
          const classNames: string[] = [
            `bg-${color}-1 hover:bg-${color}-2 focus-visible:(outline-${color}-7 z-high)`,
            `text-${color} hover:text-${color}-11`,
          ]

          return classNames.join(' ')
        }
      },
      { autocomplete: `btn-$colors-inverse` },
    ],
  ],
}
