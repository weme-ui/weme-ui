import type { Shortcuts, WemePresetOptions } from '../types'
import { DEFAULT_THEME_COLORS } from '../constants'

export function getColors(options: WemePresetOptions) {
  const colorNames = [
    ...DEFAULT_THEME_COLORS,
    ...Object.keys(options.accentColors),
    ...Object.keys(options.neutralColors),
  ]

  function resolveClassName(color: string, classes: string) {
    if (colorNames.includes(color))
      return classes
  }

  return [
    // Normal
    [/^ui-(.*)$/, ([, c]) => resolveClassName(c, `c-${c}-1 bg-${c}-9 selection:bg-${c}-8`), { autocomplete: ['ui-<theme-colors>', 'ui-<colors>'] }],
    [/^ui-(.*)-soft$/, ([, c]) => resolveClassName(c, `c-${c}-9 bg-${c}-3 selection:bg-${c}-5`), { autocomplete: ['ui-<theme-colors>-soft', 'ui-<colors>-soft'] }],
    [/^ui-(.*)-surface$/, ([, c]) => resolveClassName(c, `c-${c}-9 bg-${c}-2 ring-(~ ${c}-6)`), { autocomplete: ['ui-<theme-colors>-surface', 'ui-<colors>-surface'] }],
    [/^ui-(.*)-outline$/, ([, c]) => resolveClassName(c, `c-${c}-9 ring-(~ ${c}-6)`), { autocomplete: ['ui-<theme-colors>-outline', 'ui-<colors>-outline'] }],
    [/^ui-(.*)-ghost$/, ([, c]) => resolveClassName(c, `c-${c}-9`), { autocomplete: ['ui-<theme-colors>-ghost', 'ui-<colors>-ghost'] }],
    [/^ui-(.*)-link$/, ([, c]) => resolveClassName(c, `c-${c}-9`), { autocomplete: ['ui-<theme-colors>-link', 'ui-<colors>-link'] }],
    [/^ui-(.*)-inverse$/, ([, c]) => resolveClassName(c, `c-${c}-9 bg-${c}-1`), { autocomplete: ['ui-<theme-colors>-inverse', 'ui-<colors>-inverse'] }],

    // Hover
    [/^ui-(.*)-hover$/, ([, c]) => resolveClassName(c, `hover:c-${c}-1 hover:bg-${c}-10`), { autocomplete: ['ui-<theme-colors>-hover', 'ui-<colors>-hover'] }],
    [/^ui-(.*)-soft-hover$/, ([, c]) => resolveClassName(c, `hover:c-${c}-10 hover:bg-${c}-4`), { autocomplete: ['ui-<theme-colors>-soft-hover', 'ui-<colors>-soft-hover'] }],
    [/^ui-(.*)-surface-hover$/, ([, c]) => resolveClassName(c, `hover:c-${c}-10 hover:bg-${c}-3 hover:ring-(~ ${c}-7)`), { autocomplete: ['ui-<theme-colors>-surface-hover', 'ui-<colors>-surface-hover'] }],
    [/^ui-(.*)-outline-hover$/, ([, c]) => resolveClassName(c, `hover:c-${c}-9 hover:bg-${c}-4 hover:ring-(~ ${c}-7)`), { autocomplete: ['ui-<theme-colors>-outline-hover', 'ui-<colors>-outline-hover'] }],
    [/^ui-(.*)-ghost-hover$/, ([, c]) => resolveClassName(c, `hover:c-${c}-10 hover:bg-${c}-4`), { autocomplete: ['ui-<theme-colors>-ghost-hover', 'ui-<colors>-ghost-hover'] }],
    [/^ui-(.*)-link-hover$/, ([, c]) => resolveClassName(c, `hover:c-${c}-10`), { autocomplete: ['ui-<theme-colors>-link-hover', 'ui-<colors>-link-hover'] }],
    [/^ui-(.*)-inverse-hover$/, ([, c]) => resolveClassName(c, `hover:c-${c}-10 hover:bg-${c}-2`), { autocomplete: ['ui-<theme-colors>-inverse-hover', 'ui-<colors>-inverse-hover'] }],

    // Active
    [/^ui-(.*)-active$/, ([, c]) => resolveClassName(c, `active:c-${c}-1 active:bg-${c}-11`), { autocomplete: ['ui-<theme-colors>-active', 'ui-<colors>-active'] }],
    [/^ui-(.*)-soft-active$/, ([, c]) => resolveClassName(c, `active:c-${c}-10 active:bg-${c}-5`), { autocomplete: ['ui-<theme-colors>-soft-active', 'ui-<colors>-soft-active'] }],
    [/^ui-(.*)-surface-active$/, ([, c]) => resolveClassName(c, `active:c-${c}-10 active:bg-${c}-4 active:ring-(~ ${c}-8)`), { autocomplete: ['ui-<theme-colors>-surface-active', 'ui-<colors>-surface-active'] }],
    [/^ui-(.*)-outline-active$/, ([, c]) => resolveClassName(c, `active:c-${c}-9 active:bg-${c}-5 active:ring-(~ ${c}-8)`), { autocomplete: ['ui-<theme-colors>-outline-active', 'ui-<colors>-outline-active'] }],
    [/^ui-(.*)-ghost-active$/, ([, c]) => resolveClassName(c, `active:c-${c}-11 active:bg-${c}-5`), { autocomplete: ['ui-<theme-colors>-ghost-active', 'ui-<colors>-ghost-active'] }],
    [/^ui-(.*)-link-active$/, ([, c]) => resolveClassName(c, `active:c-${c}-11`), { autocomplete: ['ui-<theme-colors>-link-active', 'ui-<colors>-link-active'] }],
    [/^ui-(.*)-inverse-active$/, ([, c]) => resolveClassName(c, `active:c-${c}-11 active:bg-${c}-3`), { autocomplete: ['ui-<theme-colors>-inverse-active', 'ui-<colors>-inverse-active'] }],
  ] satisfies Shortcuts
}
