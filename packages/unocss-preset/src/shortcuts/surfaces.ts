import type { Shortcut } from '@unocss/core'
import type { Theme } from '../theme'
import { NEUTRAL_COLOR_NAMES } from '../colors'
import { hasParseableColor } from '../utils'

function isLightColor(color: string) {
  return [
    'amber',
    'yellow',
    'lime',
    'mint',
    'sky',
  ].includes(color)
}

function isNeutralColor(color: string) {
  return NEUTRAL_COLOR_NAMES.includes(color as (typeof NEUTRAL_COLOR_NAMES)[number])
}
/**
 * Fancy shortcuts
 * This is a shortcut for the interactive elements like buttons, links, etc.
 *
 * @category Shortcuts
 */
export const fancyShortcuts: Shortcut<Theme>[] = [
  // solid : fancy-$color
  [/^fancy-(.+)$/, ([, color], { theme }) => {
    if (hasParseableColor(color, theme)) {
      const classNames: string[] = [
        `bg-${color} text-${color}-1 text-shadow-2xs hover:bg-${color}-10 active:bg-${color} focus-visible:(outline-${color}-7 z-high)`,
      ]

      if (isLightColor(color)) {
        classNames.push(`dark:text-${color}-8`)
      }
      else {
        classNames.push(`dark:text-${color}-12`)
      }

      return classNames.join(' ')
    }
  }, { autocomplete: `fancy-$color` }],

  // soft : fancy-$color-soft
  [/^fancy-(.+)-soft$/, ([, color], { theme }) => {
    if (hasParseableColor(color, theme)) {
      const classNames: string[] = [
        `text-${color} bg-${color}-3 hover:(text-${color}-10 bg-${color}-4) active:bg-${color}-5 focus-visible:(outline-${color}-7 z-high)`,
      ]

      return classNames.join(' ')
    }
  }, { autocomplete: `fancy-$color-soft` }],

  // outline : fancy-$color-outline
  [/^fancy-(.+)-outline$/, ([, color], { theme }) => {
    if (hasParseableColor(color, theme)) {
      const classNames: string[] = [
        `text-${color} bg-transparent hover:(text-${color}-10 bg-${color}-4) active:bg-${color}-5 focus-visible:(outline-${color}-7 z-high)`,
        `b-(~ ${color}-4) hover:b-${color}-5 active:b-${color}-6`,
      ]

      return classNames.join(' ')
    }
  }, { autocomplete: `fancy-$color-outline` }],

  // ghost : fancy-$color-ghost
  [/^fancy-(.+)-ghost$/, ([, color], { theme }) => {
    if (hasParseableColor(color, theme)) {
      const classNames: string[] = [
        `bg-transparent hover:bg-${color}-4 active:bg-${color}-5 focus-visible:(outline-${color}-7 z-high)`,
      ]

      if (isLightColor(color) || isNeutralColor(color)) {
        classNames.push(`text-${color}-11`)
      }
      else {
        classNames.push(`text-${color}`)
      }

      return classNames.join(' ')
    }
  }, { autocomplete: `fancy-$color-ghost` }],

  // plain : fancy-$color-plain
  [/^fancy-(.+)-plain$/, ([, color], { theme }) => {
    if (hasParseableColor(color, theme)) {
      const classNames: string[] = [
        `text-${color} hover:text-${color}-10 active:text-${color}-11`,
      ]

      return classNames.join(' ')
    }
  }, { autocomplete: `fancy-$color-plain` }],

  // inverse : fancy-$color-inverse
  [/^fancy-(.+)-inverse$/, ([, color], { theme }) => {
    if (hasParseableColor(color, theme)) {
      const classNames: string[] = [
        `bg-${color}-1 hover:bg-${color}-2 active:bg-${color}-1 focus-visible:(outline-${color}-7 z-high)`,
        `text-${color} hover:text-${color}-11`,
      ]

      return classNames.join(' ')
    }
  }, { autocomplete: `fancy-$color-inverse` }],
]

/**
 * Plain shortcuts
 * This is a shortcut for the plain elements like avatar, badge, etc.
 *
 * @category Shortcuts
 */
export const plainShortcuts: Shortcut<Theme>[] = [
  // solid : plain-$color
  [/^plain-(.+)$/, ([, color], { theme }) => {
    if (hasParseableColor(color, theme)) {
      const classNames: string[] = [
        `bg-${color} text-${color}-1 selection:(bg-${color}-5)`,
      ]

      return classNames.join(' ')
    }
  }, { autocomplete: `plain-$color` }],

  // soft : plain-$color-soft
  [/^plain-(.+)-soft$/, ([, color], { theme }) => {
    if (hasParseableColor(color, theme)) {
      const classNames: string[] = [
        `bg-${color}-3 selection:(bg-${color}-5)`,
      ]

      if (isLightColor(color) || isNeutralColor(color)) {
        classNames.push(`text-${color}-11`)
      }
      else {
        classNames.push(`text-${color}`)
      }

      return classNames.join(' ')
    }
  }, { autocomplete: `plain-$color-soft` }],

  // outline : plain-$color-outline
  [/^plain-(.+)-outline$/, ([, color], { theme }) => {
    if (hasParseableColor(color, theme)) {
      const classNames: string[] = [
        `bg-transparent b-(~ ${color}-4) selection:(bg-${color}-5)`,
      ]

      if (isLightColor(color) || isNeutralColor(color)) {
        classNames.push(`text-${color}-11`)
      }
      else {
        classNames.push(`text-${color}`)
      }

      return classNames.join(' ')
    }
  }, { autocomplete: `plain-$color-outline` }],

  // inverse : plain-$color-inverse
  [/^plain-(.+)-inverse$/, ([, color], { theme }) => {
    if (hasParseableColor(color, theme)) {
      const classNames: string[] = [
        `bg-${color}-1 text-${color} selection:bg-${color}-5`,
      ]

      return classNames.join(' ')
    }
  }, { autocomplete: `plain-$color-inverse` }],
]
