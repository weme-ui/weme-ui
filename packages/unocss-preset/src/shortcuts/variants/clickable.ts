import type { Shortcuts, WemePresetResolvedOptions } from '../../types'
import { getColorNames } from '../../utils'

export function clickableShortcuts(options: WemePresetResolvedOptions) {
  const colorNames = getColorNames(options)

  function resolveClass(color: string, classes: string) {
    if (colorNames.includes(color)) {
      return classes
    }
  }

  return [
    [
      /^click-(.+)$/,
      ([, c]) => resolveClass(c, `c-${c}-1 bg-${c}-9 dark:c-${c}-12 hover:bg-${c}-10 active:bg-${c}-9`),
      { autocomplete: 'click-<colors>' },
    ],

    [
      /^click-(.+)-soft$/,
      ([, c]) => resolveClass(c, `c-${c}-10 bg-${c}-3 hover:(c-${c}-9 bg-${c}-4) active:bg-${c}-5`),
      { autocomplete: 'click-<colors>-soft' },
    ],

    [
      /^click-(.+)-surface$/,
      ([, c]) => resolveClass(c, `c-${c}-9 bg-${c}-3 b-(~ ${c}-5) hover:(c-${c}-9 bg-${c}-4) active:(bg-${c}-5 b-${c}-6)`),
      { autocomplete: 'click-<colors>-surface' },
    ],

    [
      /^click-(.+)-outline$/,
      ([, c]) => resolveClass(c, `c-${c}-9 b-(~ ${c}-5) hover:(c-${c}-9 bg-${c}-3) active:(bg-${c}-4 b-${c}-6)`),
      { autocomplete: 'click-<colors>-outline' },
    ],

    [
      /^click-(.+)-ghost$/,
      ([, c]) => resolveClass(c, `c-${c}-9 hover:(c-${c}-9 bg-${c}-3) active:bg-${c}-4`),
      { autocomplete: 'click-<colors>-ghost' },
    ],

    [
      /^click-(.+)-link$/,
      ([, c]) => resolveClass(c, `c-${c}-9 hover:c-${c}-11 active:c-${c}-10`),
      { autocomplete: 'click-<colors>-link' },
    ],

    [
      /^click-(.+)-inverse$/,
      ([, c]) => resolveClass(c, `c-${c}-9 bg-${c}-1 hover:(c-${c}-9 bg-${c}-2) active:bg-${c}-3/70`),
      { autocomplete: 'click-<colors>-inverse' },
    ],
  ] satisfies Shortcuts
}

export const clickVariants = [
  'solid',
  'soft',
  'surface',
  'outline',
  'ghost',
  'link',
  'inverse',
]
