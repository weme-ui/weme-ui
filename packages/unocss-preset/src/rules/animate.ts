import type { CSSValueInput, Rule, Shortcut } from '@unocss/core'
import type { Theme } from '../theme'
import { defineProperty, h, numberResolver, themeTracking } from '../utils'

const ENTER = 'un-enter'
const EXIT = 'un-exit'

const DEFAULT_FADE_OPACITY = '0'
const DEFAULT_ZOOM_SCALE = '0'
const DEFAULT_SPIN_DEGREE = '30deg'
const DEFAULT_SLIDE_TRANSLATE = '100%'

const DIRECTIONS_AUTOCOMPLETE = '(t|b|l|r|top|bottom|left|right)'

function normalizeDirection(dir: string) {
  const dirMap: Record<string, string> = {
    t: 'top',
    b: 'bottom',
    l: 'left',
    r: 'right',
  }
  return dirMap[dir] ?? dir
}

function handleSlide(val: string | undefined, dir: string, theme: Theme): [string, string] | undefined {
  const direction = normalizeDirection(dir)
  const needsNegate = direction === 'top' || direction === 'left'
  let value: string | undefined

  if (!val) {
    value = needsNegate ? `-${DEFAULT_SLIDE_TRANSLATE}` : DEFAULT_SLIDE_TRANSLATE
  }
  else {
    const num = numberResolver(val)
    if (num != null) {
      themeTracking('spacing')
      value = needsNegate
        ? `calc(var(--spacing) * ${num} * -1)`
        : `calc(var(--spacing) * ${num})`
    }
    else {
      value = h.bracket.cssvar.fraction.percent.rem(val, theme)
      if (value && needsNegate && !value.startsWith('var(--') && value !== '0' && !value.startsWith('-'))
        value = `-${value}`
    }
  }

  if (!value)
    return

  return [value, direction]
}

function* yieldEnterExitProperties(prefix: 'enter' | 'exit'): Generator<CSSValueInput> {
  yield defineProperty(`--un-${prefix}-opacity`, { initialValue: 1 })
  yield defineProperty(`--un-${prefix}-scale`, { initialValue: 1 })
  yield defineProperty(`--un-${prefix}-rotate`, { initialValue: 0 })
  yield defineProperty(`--un-${prefix}-translate-x`, { initialValue: 0 })
  yield defineProperty(`--un-${prefix}-translate-y`, { initialValue: 0 })
  yield defineProperty(`--un-${prefix}-blur`, { initialValue: 0 })
}

function* yieldAnimationParamProperties(): Generator<CSSValueInput> {
  yield defineProperty('--un-animation-delay', { initialValue: '0s' })
  yield defineProperty('--un-animation-direction', { initialValue: 'normal' })
  yield defineProperty('--un-animation-duration')
  yield defineProperty('--un-animation-ease', { initialValue: 'ease' })
  yield defineProperty('--un-animation-fill-mode', { initialValue: 'none' })
  yield defineProperty('--un-animation-iteration-count', { initialValue: 1 })
}

function baseAnimationStyles(name: typeof ENTER | typeof EXIT) {
  return {
    'animation-name': name,
    'animation-duration': 'var(--un-animation-duration, 150ms)',
    'animation-timing-function': 'var(--un-animation-ease, ease)',
    'animation-delay': 'var(--un-animation-delay, 0s)',
    'animation-iteration-count': 'var(--un-animation-iteration-count, 1)',
    'animation-direction': 'var(--un-animation-direction, normal)',
    'animation-fill-mode': 'var(--un-animation-fill-mode, none)',
  }
}

/**
 * Internal rules that emit `@property` for enter/exit animations.
 * Triggered by `animate-in` / `animate-out` shortcuts (same pattern as `__container`).
 *
 * @category Rules
 */
export const animatePropertyRules: Rule<Theme>[] = [
  [/^__un-animate-enter$/, function* () {
    yield* yieldEnterExitProperties('enter')
    yield* yieldAnimationParamProperties()
  }, { internal: true }],
  [/^__un-animate-exit$/, function* () {
    yield* yieldEnterExitProperties('exit')
    yield* yieldAnimationParamProperties()
  }, { internal: true }],
]

/**
 * Enter / exit base shortcuts (`animate-in` / `animate-out`).
 * Registered as shortcuts so they never hit the `animate-*` catch-all.
 *
 * @category Shortcuts
 */
export const animateInOutShortcuts: Shortcut<Theme>[] = [
  [
    /^animate-in$/,
    () => [
      `keyframes-${ENTER}`,
      '__un-animate-enter',
      {
        ...baseAnimationStyles(ENTER),
        '--un-enter-opacity': 'initial',
        '--un-enter-scale': 'initial',
        '--un-enter-rotate': 'initial',
        '--un-enter-translate-x': 'initial',
        '--un-enter-translate-y': 'initial',
        '--un-enter-blur': 'initial',
      },
    ],
    { autocomplete: 'animate-in' },
  ],
  [
    /^animate-out$/,
    () => [
      `keyframes-${EXIT}`,
      '__un-animate-exit',
      {
        ...baseAnimationStyles(EXIT),
        '--un-exit-opacity': 'initial',
        '--un-exit-scale': 'initial',
        '--un-exit-rotate': 'initial',
        '--un-exit-translate-x': 'initial',
        '--un-exit-translate-y': 'initial',
        '--un-exit-blur': 'initial',
      },
    ],
    { autocomplete: 'animate-out' },
  ],
]

/**
 * Enter / exit transform modifiers (CSS variables only).
 *
 * @category Rules
 */
export const animateModifiers: Rule<Theme>[] = [
  // fade
  [
    /^fade-in(?:-(.+))?$/,
    ([, op], { theme }) => {
      const value = h.bracket.cssvar.percent(op || DEFAULT_FADE_OPACITY, theme)
      if (value == null)
        return
      return { '--un-enter-opacity': value }
    },
    { autocomplete: ['fade-in', 'fade-in-<percent>'] },
  ],
  [
    /^fade-out(?:-(.+))?$/,
    ([, op], { theme }) => {
      const value = h.bracket.cssvar.percent(op || DEFAULT_FADE_OPACITY, theme)
      if (value == null)
        return
      return { '--un-exit-opacity': value }
    },
    { autocomplete: ['fade-out', 'fade-out-<percent>'] },
  ],

  // zoom
  [
    /^zoom-in(?:-(.+))?$/,
    ([, scale], { theme }) => {
      const value = h.bracket.cssvar.fraction.percent(scale || DEFAULT_ZOOM_SCALE, theme)
      if (value == null)
        return
      return { '--un-enter-scale': value }
    },
    { autocomplete: ['zoom-in', 'zoom-in-<percent>'] },
  ],
  [
    /^zoom-out(?:-(.+))?$/,
    ([, scale], { theme }) => {
      const value = h.bracket.cssvar.fraction.percent(scale || DEFAULT_ZOOM_SCALE, theme)
      if (value == null)
        return
      return { '--un-exit-scale': value }
    },
    { autocomplete: ['zoom-out', 'zoom-out-<percent>'] },
  ],

  // spin
  [
    /^spin-in(?:-(.+))?$/,
    ([, deg], { theme }) => {
      const value = h.bracket.cssvar.degree(deg || DEFAULT_SPIN_DEGREE, theme)
      if (value == null)
        return
      return { '--un-enter-rotate': value }
    },
    { autocomplete: ['spin-in', 'spin-in-<num>'] },
  ],
  [
    /^spin-out(?:-(.+))?$/,
    ([, deg], { theme }) => {
      const value = h.bracket.cssvar.degree(deg || DEFAULT_SPIN_DEGREE, theme)
      if (value == null)
        return
      return { '--un-exit-rotate': value }
    },
    { autocomplete: ['spin-out', 'spin-out-<num>'] },
  ],

  // slide in from
  [
    /^slide-in(?:-from)?-([tblr]|top|bottom|left|right)(?:-(.+))?$/,
    ([, dir, val], { theme }) => {
      const resolved = handleSlide(val, dir, theme)
      if (!resolved)
        return
      const [value, direction] = resolved
      if (direction === 'top' || direction === 'bottom')
        return { '--un-enter-translate-y': value }
      if (direction === 'left' || direction === 'right')
        return { '--un-enter-translate-x': value }
    },
    {
      autocomplete: [
        `slide-in-from-${DIRECTIONS_AUTOCOMPLETE}`,
        `slide-in-from-${DIRECTIONS_AUTOCOMPLETE}-<num>`,
        `slide-in-from-${DIRECTIONS_AUTOCOMPLETE}-full`,
      ],
    },
  ],

  // slide out to
  [
    /^slide-out(?:-to)?-([tblr]|top|bottom|left|right)(?:-(.+))?$/,
    ([, dir, val], { theme }) => {
      const resolved = handleSlide(val, dir, theme)
      if (!resolved)
        return
      const [value, direction] = resolved
      if (direction === 'top' || direction === 'bottom')
        return { '--un-exit-translate-y': value }
      if (direction === 'left' || direction === 'right')
        return { '--un-exit-translate-x': value }
    },
    {
      autocomplete: [
        `slide-out-to-${DIRECTIONS_AUTOCOMPLETE}`,
        `slide-out-to-${DIRECTIONS_AUTOCOMPLETE}-<num>`,
        `slide-out-to-${DIRECTIONS_AUTOCOMPLETE}-full`,
      ],
    },
  ],
]
