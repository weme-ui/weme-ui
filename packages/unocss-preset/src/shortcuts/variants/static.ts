import type { Shortcuts, WemePresetResolvedOptions } from '../../types'
import { getColorNames } from '../../utils'

export function staticShortcuts(options: WemePresetResolvedOptions) {
  const colorNames = getColorNames(options)

  function resolveClass(color: string, classes: string) {
    if (colorNames.includes(color)) {
      return classes
    }
  }

  return [
    [
      /^static-(.+)$/,
      ([, c]) => resolveClass(c, `c-${c}-1 bg-${c}-9 dark:c-${c}-12`),
      { autocomplete: 'static-<colors>' },
    ],

    [
      /^static-(.+)-soft$/,
      ([, c]) => resolveClass(c, `c-${c}-10 bg-${c}-3`),
      { autocomplete: 'static-<colors>-soft' },
    ],

    [
      /^static-(.+)-surface$/,
      ([, c]) => resolveClass(c, `c-${c}-9 bg-${c}-3 b-(~ ${c}-5)`),
      { autocomplete: 'static-<colors>-surface' },
    ],

    [
      /^static-(.+)-outline$/,
      ([, c]) => resolveClass(c, `c-${c}-9 b-(~ ${c}-5)`),
      { autocomplete: 'static-<colors>-outline' },
    ],

    [
      /^static-(.+)-inverse$/,
      ([, c]) => resolveClass(c, `c-${c}-9 bg-${c}-1`),
      { autocomplete: 'static-<colors>-inverse' },
    ],
  ] satisfies Shortcuts
}

export const staticVariants = [
  'solid',
  'soft',
  'surface',
  'outline',
  'inverse',
]
