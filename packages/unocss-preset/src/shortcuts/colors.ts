import type { Shortcuts } from '../types'

export const colors = [
  // Normal
  [/^ui-solid-(.*)$/, ([, c]) => `c-${c}-1 bg-${c}-9`, { autocomplete: ['ui-solid-<theme-colors>', 'ui-solid-<colors>'] }],
  [/^ui-soft-(.*)$/, ([, c]) => `c-${c}-11 bg-${c}-3`, { autocomplete: ['ui-soft-<theme-colors>', 'ui-soft-<colors>'] }],
  [/^ui-surface-(.*)$/, ([, c]) => `c-${c}-11 bg-${c}-2 ring-(~ ${c}-6)`, { autocomplete: ['ui-surface-<theme-colors>', 'ui-surface-<colors>'] }],
  [/^ui-outline-(.*)$/, ([, c]) => `c-${c}-9 ring-(~ ${c}-6)`, { autocomplete: ['ui-outline-<theme-colors>', 'ui-outline-<colors>'] }],
  [/^ui-ghost-(.*)$/, ([, c]) => `c-${c}-9`, { autocomplete: ['ui-ghost-<theme-colors>', 'ui-ghost-<colors>'] }],
  [/^ui-link-(.*)$/, ([, c]) => `c-${c}-9`, { autocomplete: ['ui-link-<theme-colors>', 'ui-link-<colors>'] }],
  [/^ui-inverse-(.*)$/, ([, c]) => `c-${c}-9 bg-${c}-1`, { autocomplete: ['ui-inverse-<theme-colors>', 'ui-inverse-<colors>'] }],

  // Hover
  [/^ui-solid-(.*)-hover$/, ([, c]) => `c-${c}-1 bg-${c}-10`, { autocomplete: ['ui-solid-<theme-colors>-hover', 'ui-solid-<colors>-hover'] }],
  [/^ui-soft-(.*)-hover$/, ([, c]) => `c-${c}-11 bg-${c}-4`, { autocomplete: ['ui-soft-<theme-colors>-hover', 'ui-soft-<colors>-hover'] }],
  [/^ui-surface-(.*)-hover$/, ([, c]) => `c-${c}-11 bg-${c}-3 ring-(~ ${c}-7)`, { autocomplete: ['ui-surface-<theme-colors>-hover', 'ui-surface-<colors>-hover'] }],
  [/^ui-outline-(.*)-hover$/, ([, c]) => `c-${c}-9 bg-${c}-4 ring-(~ ${c}-7)`, { autocomplete: ['ui-outline-<theme-colors>-hover', 'ui-outline-<colors>-hover'] }],
  [/^ui-ghost-(.*)-hover$/, ([, c]) => `c-${c}-10 bg-${c}-4`, { autocomplete: ['ui-ghost-<theme-colors>-hover', 'ui-ghost-<colors>-hover'] }],
  [/^ui-link-(.*)-hover$/, ([, c]) => `c-${c}-10`, { autocomplete: ['ui-link-<theme-colors>-hover', 'ui-link-<colors>-hover'] }],
  [/^ui-inverse-(.*)-hover$/, ([, c]) => `c-${c}-10 bg-${c}-2`, { autocomplete: ['ui-inverse-<theme-colors>-hover', 'ui-inverse-<colors>-hover'] }],

  // Active
  [/^ui-solid-(.*)-active$/, ([, c]) => `c-${c}-1 bg-${c}-11`, { autocomplete: ['ui-solid-<theme-colors>-active', 'ui-solid-<colors>-active'] }],
  [/^ui-soft-(.*)-active$/, ([, c]) => `c-${c}-11 bg-${c}-5`, { autocomplete: ['ui-soft-<theme-colors>-active', 'ui-soft-<colors>-active'] }],
  [/^ui-surface-(.*)-active$/, ([, c]) => `c-${c}-11 bg-${c}-4 ring-(~ ${c}-8)`, { autocomplete: ['ui-surface-<theme-colors>-active', 'ui-surface-<colors>-active'] }],
  [/^ui-outline-(.*)-active$/, ([, c]) => `c-${c}-9 bg-${c}-5 ring-(~ ${c}-8)`, { autocomplete: ['ui-outline-<theme-colors>-active', 'ui-outline-<colors>-active'] }],
  [/^ui-ghost-(.*)-active$/, ([, c]) => `c-${c}-11 bg-${c}-5`, { autocomplete: ['ui-ghost-<theme-colors>-active', 'ui-ghost-<colors>-active'] }],
  [/^ui-link-(.*)-active$/, ([, c]) => `c-${c}-11`, { autocomplete: ['ui-link-<theme-colors>-active', 'ui-link-<colors>-active'] }],
  [/^ui-inverse-(.*)-active$/, ([, c]) => `c-${c}-11 bg-${c}-3`, { autocomplete: ['ui-inverse-<theme-colors>-active', 'ui-inverse-<colors>-active'] }],
] satisfies Shortcuts
