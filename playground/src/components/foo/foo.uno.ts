import type { UserExtendUnoConfig } from '@weme-ui/utilities'
import type { Theme } from '../../../../packages/unocss-preset/src'
import { hasParseableColor, isRequiresInvertedColor, isThemeNeutralColor } from '@weme-ui/utilities'

export default <UserExtendUnoConfig<Theme>>{
  shortcuts: [
    [
      /^box-(.+)$/,
      ([, color]) => {
        if (hasParseableColor(color)) {
          const classNames: string[] = [`bg-${color} text-white-12 selection:bg-${color}-5`]

          if (isRequiresInvertedColor(color)) {
            classNames.push(`dark:text-black-12`)
          }

          return classNames.join(' ')
        }
      },
      { autocomplete: `box-$colors` },
    ],

    [
      /^box-(.+)-soft$/,
      ([, color]) => {
        if (hasParseableColor(color)) {
          const classNames: string[] = [`text-${color}-11 bg-${color}-3 selection:bg-${color}-5`]

          return classNames.join(' ')
        }
      },
      { autocomplete: `box-$colors-soft` },
    ],

    [
      /^box-(.+)-elevated$/,
      ([, color]) => {
        if (hasParseableColor(color)) {
          const classNames: string[] = [
            `isolate bg-${color}-3 p-0.75 selection:bg-${color}-5`,
            `after:content-[""] after:absolute after:inset-0.75 after:z-[-1] after:b-(~ ${color}-5) after:bg-${color}-3 after:rounded-inherit`,
          ]

          if (isRequiresInvertedColor(color) || isThemeNeutralColor(color)) {
            classNames.push(`text-${color}-11`)
          } else {
            classNames.push(`text-${color}`)
          }

          return classNames.join(' ')
        }
      },
      { autocomplete: `box-$colors-elevated` },
    ],

    [
      /^box-(.+)-outline$/,
      ([, color]) => {
        if (hasParseableColor(color)) {
          const classNames: string[] = [`bg-transparent b-(~ ${color}-4) selection:bg-${color}-5`]

          if (isThemeNeutralColor(color)) {
            classNames.push(`text-${color}-11`)
          } else {
            classNames.push(`text-${color}`)
          }

          return classNames.join(' ')
        }
      },
      { autocomplete: `box-$colors-outline` },
    ],

    [
      /^box-(.+)-frame$/,
      ([, color]) => {
        if (hasParseableColor(color)) {
          const classNames: string[] = [
            `isolate bg-${color}-3 p-0.75 b-(~ ${color}-5) selection:bg-${color}-5`,
            `after:content-[""] after:absolute after:inset-0.75 after:z-[-1] after:b-(~ ${color}-5) after:bg-${color}-3 after:rounded-inherit`,
          ]

          if (isThemeNeutralColor(color)) {
            classNames.push(`text-${color}-11`)
          } else {
            classNames.push(`text-${color}`)
          }

          return classNames.join(' ')
        }
      },
      { autocomplete: `box-$colors-frame` },
    ],

    [
      /^box-(.+)-inverse$/,
      ([, color]) => {
        if (hasParseableColor(color)) {
          const classNames: string[] = [`bg-${color}-1 selection:bg-${color}-5`]

          if (isThemeNeutralColor(color)) {
            classNames.push(`text-${color}-11`)
          } else {
            classNames.push(`text-${color}`)
          }

          return classNames.join(' ')
        }
      },
      { autocomplete: `box-$colors-inverse` },
    ],
  ],
}
