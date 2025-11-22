import type { Shortcuts, WemePresetResolvedOptions } from '../types'
import { getColorNames } from '../utils'

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
  return [
    'neutral',
    'iron',
    'gray',
    'mauve',
    'slate',
    'sage',
    'olive',
    'sand',
  ].includes(color)
}

export function buttonVariantShortcuts(options: WemePresetResolvedOptions) {
  const colorNames = getColorNames(options.colors)

  return [
    // solid
    [
      /^btn-(.+)$/,
      ([, c]) => {
        if (colorNames.includes(c)) {
          const cls: string[] = [
            `bg-${c} text-${c}-1 hover:bg-${c}-10 active:bg-${c}`,
          ]

          if (isLightColor(c))
            cls.push(`dark:text-${c}-8`)
          else
            cls.push(`dark:text-${c}-12`)

          return cls.join(' ')
        }
      },
      { autocomplete: 'btn-<color>' },
    ],

    // soft
    [
      /^btn-(.+)-soft$/,
      ([, c]) => {
        if (colorNames.includes(c)) {
          const cls: string[] = [
            `bg-${c}-3 hover:bg-${c}-4 active:bg-${c}-5`,
          ]

          if (isNeutralColor(c) || isLightColor(c))
            cls.push(`text-${c}-11`)
          else
            cls.push(`text-${c} dark:text-${c}-11`)

          return cls.join(' ')
        }
      },
      { autocomplete: 'btn-<color>-soft' },
    ],

    // surface
    [
      /^btn-(.+)-surface$/,
      ([, c]) => {
        if (colorNames.includes(c)) {
          const cls: string[] = [
            `bg-${c}-3 b-(~ ${c}-5) hover:bg-${c}-4 active:(bg-${c}-5 b-${c}-6)`,
          ]

          if (isNeutralColor(c) || isLightColor(c))
            cls.push(`text-${c}-11`)
          else
            cls.push(`text-${c} dark:text-${c}-11`)

          return cls.join(' ')
        }
      },
      { autocomplete: 'btn-<color>-surface' },
    ],

    // outline
    [
      /^btn-(.+)-outline$/,
      ([, c]) => {
        if (colorNames.includes(c)) {
          const cls: string[] = [
            `b-(~ ${c}-5) hover:bg-${c}-3 active:(bg-${c}-4 b-${c}-6)`,
          ]

          if (isNeutralColor(c) || isLightColor(c))
            cls.push(`text-${c}-11`)
          else
            cls.push(`text-${c} dark:text-${c}-11`)

          return cls.join(' ')
        }
      },
      { autocomplete: 'btn-<color>-outline' },
    ],

    // ghost
    [
      /^btn-(.+)-ghost$/,
      ([, c]) => {
        if (colorNames.includes(c)) {
          const cls: string[] = [
            `hover:bg-${c}-3 active:bg-${c}-4`,
          ]

          if (isNeutralColor(c) || isLightColor(c))
            cls.push(`text-${c}-11`)
          else
            cls.push(`text-${c} dark:text-${c}-11`)

          return cls.join(' ')
        }
      },
      { autocomplete: 'btn-<color>-ghost' },
    ],

    // plain
    [
      /^btn-(.+)-plain$/,
      ([, c]) => {
        if (colorNames.includes(c)) {
          const cls: string[] = []

          if (isNeutralColor(c) || isLightColor(c))
            cls.push(`text-${c}-11 hover:text-${c}-12 active:text-${c}-11`)
          else
            cls.push(`text-${c} hover:text-${c}-11 active:text-${c}-10 dark:text-${c}-11`)

          return cls.join(' ')
        }
      },
      { autocomplete: 'btn-<color>-plain' },
    ],

    // inverse
    [
      /^btn-(.+)-inverse$/,
      ([, c]) => {
        if (colorNames.includes(c)) {
          const cls: string[] = [
            `bg-${c}-1 hover:bg-${c}-2 active:bg-${c}-3`,
          ]

          if (isNeutralColor(c) || isLightColor(c))
            cls.push(`text-${c}-11 hover:text-${c}-12 active:text-${c}-11`)
          else
            cls.push(`text-${c} hover:text-${c}-11 active:text-${c}-10`)

          return cls.join(' ')
        }
      },
      { autocomplete: 'btn-<color>-inverse' },
    ],

  ] satisfies Shortcuts
}

export function boxVariantShortcuts(options: WemePresetResolvedOptions) {
  const colorNames = getColorNames(options.colors)

  return [
    // solid
    [
      /^box-(.+)$/,
      ([, c]) => {
        if (colorNames.includes(c)) {
          const cls: string[] = [
            `bg-${c} text-${c}-1`,
          ]

          if (isLightColor(c))
            cls.push(`dark:text-${c}-8`)
          else
            cls.push(`dark:text-${c}-12`)

          return cls.join(' ')
        }
      },
      { autocomplete: 'box-<color>' },
    ],

    // soft
    [
      /^box-(.+)-soft$/,
      ([, c]) => {
        if (colorNames.includes(c)) {
          const cls: string[] = [
            `bg-${c}-3`,
          ]

          if (isNeutralColor(c) || isLightColor(c))
            cls.push(`text-${c}-11`)
          else
            cls.push(`text-${c} dark:text-${c}-11`)

          return cls.join(' ')
        }
      },
      { autocomplete: 'box-<color>-soft' },
    ],

    // surface
    [
      /^box-(.+)-surface$/,
      ([, c]) => {
        if (colorNames.includes(c)) {
          const cls: string[] = [
            `bg-${c}-3 b-(~ ${c}-5)`,
          ]

          if (isNeutralColor(c) || isLightColor(c))
            cls.push(`text-${c}-11`)
          else
            cls.push(`text-${c} dark:text-${c}-11`)

          return cls.join(' ')
        }
      },
      { autocomplete: 'box-<color>-surface' },
    ],

    // outline
    [
      /^box-(.+)-outline$/,
      ([, c]) => {
        if (colorNames.includes(c)) {
          const cls: string[] = [
            `b-(~ ${c}-5)`,
          ]

          if (isNeutralColor(c) || isLightColor(c))
            cls.push(`text-${c}-11`)
          else
            cls.push(`text-${c} dark:text-${c}-11`)

          return cls.join(' ')
        }
      },
      { autocomplete: 'box-<color>-outline' },
    ],

    // inverse
    [
      /^box-(.+)-inverse$/,
      ([, c]) => {
        if (colorNames.includes(c)) {
          const cls: string[] = [
            `bg-${c}-1`,
          ]

          if (isNeutralColor(c) || isLightColor(c))
            cls.push(`text-${c}-11`)
          else
            cls.push(`text-${c} dark:text-${c}-12`)

          return cls.join(' ')
        }
      },
      { autocomplete: 'box-<color>-inverse' },
    ],
  ] satisfies Shortcuts
}
