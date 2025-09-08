import type { Shortcuts, WemePresetOptions } from '../../types'
import { getColorNames } from '../../utils'

export function buttonShortcuts(options: WemePresetOptions) {
  const colorNames = getColorNames(options)

  function resolveClass(color: string, classes: string) {
    if (colorNames.includes(color)) {
      return classes
    }
  }

  return [
    [
      /^btn-(.+)$/,
      ([, c]) => resolveClass(c, `c-${c}-1 bg-${c}-9 dark:c-${c}-12 hover:bg-${c}-10 active:bg-${c}-9`),
      { autocomplete: 'btn-<colors>' },
    ],

    [
      /^btn-(.+)-soft$/,
      ([, c]) => resolveClass(c, `c-${c}-10 bg-${c}-3 hover:(c-${c}-11 bg-${c}-4) active:bg-${c}-5`),
      { autocomplete: 'btn-<colors>-soft' },
    ],

    [
      /^btn-(.+)-surface$/,
      ([, c]) => resolveClass(c, `c-${c}-9 bg-${c}-3 b-(~ ${c}-5) hover:(c-${c}-11 bg-${c}-4) active:(bg-${c}-5 b-${c}-6)`),
      { autocomplete: 'btn-<colors>-surface' },
    ],

    [
      /^btn-(.+)-outline$/,
      ([, c]) => resolveClass(c, `c-${c}-9 b-(~ ${c}-5) hover:c-${c}-11 active:(bg-${c}-3 b-${c}-6)`),
      { autocomplete: 'btn-<colors>-outline' },
    ],

    [
      /^btn-(.+)-ghost$/,
      ([, c]) => resolveClass(c, `c-${c}-9 hover:(c-${c}-11 bg-${c}-4) active:bg-${c}-5`),
      { autocomplete: 'btn-<colors>-ghost' },
    ],

    [
      /^btn-(.+)-link$/,
      ([, c]) => resolveClass(c, `c-${c}-9 hover:c-${c}-11 active:c-${c}-10`),
      { autocomplete: 'btn-<colors>-link' },
    ],

    [
      /^btn-(.+)-inverse$/,
      ([, c]) => resolveClass(c, `c-${c}-9 bg-${c}-1 hover:(c-${c}-11 bg-${c}-2) active:bg-${c}-3/70`),
      { autocomplete: 'btn-<colors>-inverse' },
    ],
  ] satisfies Shortcuts
}
