import type { Shortcuts, WemePresetOptions } from '../../types'
import { getColorNames } from '../../utils'

export function badgeShortcuts(options: WemePresetOptions) {
  const colorNames = getColorNames(options)

  function resolveClass(color: string, classes: string) {
    if (colorNames.includes(color)) {
      return classes
    }
  }

  return [
    [
      /^badge-(.+)$/,
      ([, c]) => resolveClass(c, `c-${c}-1 bg-${c}-9 dark:c-${c}-12`),
      { autocomplete: 'badge-<colors>' },
    ],

    [
      /^badge-(.+)-soft$/,
      ([, c]) => resolveClass(c, `c-${c}-10 bg-${c}-3`),
      { autocomplete: 'badge-<colors>-soft' },
    ],

    [
      /^badge-(.+)-surface$/,
      ([, c]) => resolveClass(c, `c-${c}-9 bg-${c}-3 b-(~ ${c}-5)`),
      { autocomplete: 'badge-<colors>-surface' },
    ],

    [
      /^badge-(.+)-outline$/,
      ([, c]) => resolveClass(c, `c-${c}-9 b-(~ ${c}-5)`),
      { autocomplete: 'badge-<colors>-outline' },
    ],

    [
      /^badge-(.+)-inverse$/,
      ([, c]) => resolveClass(c, `c-${c}-9 bg-${c}-1`),
      { autocomplete: 'badge-<colors>-inverse' },
    ],
  ] satisfies Shortcuts
}

export const badgeVariants = [
  'solid',
  'soft',
  'surface',
  'outline',
  'inverse',
]
