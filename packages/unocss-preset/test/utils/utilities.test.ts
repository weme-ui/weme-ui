import type { Theme } from '~/theme'
import { symbols } from '@unocss/core'
import { beforeEach, describe, expect, it } from 'vitest'
import { trackedProperties, trackedTheme } from '~/utils/track'
import {
  camelize,
  colorableShadows,
  colorCSSGenerator,
  colorResolver,
  compressCSS,
  defineProperty,
  getThemeByKey,
  hasParseableColor,
  hyphenate,
  isSize,
  makeGlobalStaticRules,
  parseColor,
  parseThemeColor,
  resolveBreakpoints,
  resolveVerticalBreakpoints,
  splitShorthand,
} from '~/utils/utilities'

const theme = {
  colors: {
    'blue': {
      1: '#dbeafe',
      9: '#0090ff',
      a1: '#0080ff04',
      dark: {
        9: '#3b82f6',
      },
    },
    'ocean-blue': '#05f',
  },
  breakpoint: {
    desktop: '1280px',
    mobile: '520px',
    tablet: '768px',
  },
  verticalBreakpoint: {
    wide: '1640px',
    mobile: '520px',
  },
} as unknown as Theme

describe('splitShorthand', () => {
  it('splits color bodies on / and : while respecting typed brackets', () => {
    expect(splitShorthand('red/50', 'color')).toEqual(['red', '50'])
    expect(splitShorthand('[color:red]/50', 'color')).toEqual(['[color:red]', '50'])
    expect(splitShorthand('[length:10px]/50', 'color')).toBeUndefined()
  })
})

describe('getThemeByKey', () => {
  it('resolves nested and flat theme keys', () => {
    expect(getThemeByKey(theme, 'colors', ['blue', '9'])).toBe('#0090ff')
    expect(getThemeByKey(theme, 'colors', ['blue', 'dark', '9'])).toBe('#3b82f6')
    expect(getThemeByKey(theme, 'colors', ['ocean', 'blue'])).toBe('#05f')
    expect(getThemeByKey(theme, 'colors', ['missing'])).toBeUndefined()
  })
})

describe('parseThemeColor', () => {
  it('uses step 9 for radix-like color objects', () => {
    expect(parseThemeColor(theme, ['blue'])).toEqual({
      color: '#0090ff',
      no: '9',
      keys: ['blue', '9'],
    })
  })

  it('resolves explicit scale steps and flat string colors', () => {
    expect(parseThemeColor(theme, ['blue', '1'])).toEqual({
      color: '#dbeafe',
      no: '1',
      keys: ['blue', '1'],
    })
    expect(parseThemeColor(theme, ['ocean', 'blue'])).toEqual({
      color: '#05f',
      no: 'blue',
      keys: ['ocean', 'blue'],
    })
    expect(parseThemeColor(theme, ['missing'])).toBeUndefined()
  })
})

describe('parseColor', () => {
  it('parses theme colors with opacity and alpha steps', () => {
    const blue = parseColor('blue', theme)
    expect(blue?.color).toBe('#0090ff')
    expect(blue?.keys).toEqual(['blue', '9'])
    expect(blue?.no).toBe('9')

    const faded = parseColor('blue-9/20', theme)
    expect(faded?.color).toBe('#0090ff')
    expect(faded?.opacity).toBe('20')
    expect(faded?.alpha).toBe('20%')

    const alpha = parseColor('blue-a1', theme)
    expect(alpha?.color).toBe('#0080ff04')
    expect(alpha?.keys).toEqual(['blue', 'a1'])
  })

  it('parses special colors, hex shortcuts and brackets', () => {
    expect(parseColor('transparent', theme)?.color).toBe('transparent')
    expect(parseColor('current', theme)?.color).toBe('currentColor')
    expect(parseColor('hex-fff', theme)?.color).toBe('#fff')
    expect(parseColor('[#abc]', theme)?.color).toBe('#abc')
    expect(parseColor('$brand', theme)?.color).toBe('var(--brand)')
  })

  it('rejects size-like values and unknown colors without a parseable value', () => {
    expect(parseColor('10px', theme)).toBeUndefined()
    expect(parseColor('not-a-color', theme)?.color).toBeUndefined()
  })

  it('merges trailing numeric segments when needed', () => {
    const localTheme = {
      colors: {
        foo: {
          bar1: '#123456',
        },
      },
    } as unknown as Theme

    expect(parseColor('foo-bar-1', localTheme)?.color).toBe('#123456')
    expect(parseColor('foo-bar-1', localTheme)?.keys).toEqual(['foo', 'bar1'])
  })
})

describe('colorCSSGenerator and colorResolver', () => {
  beforeEach(() => {
    trackedTheme.clear()
    trackedProperties.clear()
  })

  it('emits special colors directly when no alpha is provided', () => {
    const data = parseColor('transparent', theme)
    expect(colorCSSGenerator(data, 'color', 'text')).toEqual([
      { color: 'transparent' },
    ])
  })

  it('emits color-mix output and opacity properties for theme colors', () => {
    const data = parseColor('blue-9/50', theme)
    const result = colorCSSGenerator(data, 'color', 'text', {
      theme,
      generator: { config: { envMode: 'build' } },
    } as any)

    expect(result?.[0].color).toBe(
      'color-mix(in srgb, var(--colors-blue-9) 50%, transparent)',
    )
    expect(result?.[1]).toMatchObject({
      'syntax': '"<percentage>"',
      'inherits': 'false',
      'initial-value': '100%',
    })
    expect([...trackedTheme]).toContain('colors:blue-9')
  })

  it('resolves colors through colorResolver', () => {
    const resolve = colorResolver('background-color', 'bg')
    const result = resolve(['', 'blue-9'], {
      theme,
      generator: { config: { envMode: 'build' } },
    } as any)

    expect(result?.[0]).toMatchObject({
      'background-color': expect.stringContaining('var(--colors-blue-9)'),
    })
  })
})

describe('colorableShadows', () => {
  it('extracts colors into a css variable fallback', () => {
    expect(colorableShadows('0 1px 2px #000000', '--un-shadow-color')).toEqual([
      '0 1px 2px var(--un-shadow-color, rgb(0 0 0))',
    ])
  })

  it('preserves inset shadows and supports alpha overrides', () => {
    expect(colorableShadows('inset 0 1px #000', '--c', '0.5')).toEqual([
      'inset 0 1px var(--c, oklab(from rgb(0 0 0) l a b / 0.5))',
    ])
  })

  it('returns the original value when the shadow cannot be parsed', () => {
    expect(colorableShadows('none', '--c')).toEqual(['none'])
  })
})

describe('hasParseableColor', () => {
  it('checks whether a color body resolves to a concrete value', () => {
    expect(hasParseableColor('blue', theme)).toBe(true)
    expect(hasParseableColor('transparent', theme)).toBe(true)
    expect(hasParseableColor('missing', theme)).toBe(false)
    expect(hasParseableColor(undefined, theme)).toBe(false)
  })
})

describe('resolveBreakpoints', () => {
  it('sorts breakpoints by numeric size and caches by theme key', () => {
    const context = { theme } as any
    const horizontal = resolveBreakpoints(context)
    const again = resolveBreakpoints(context)

    expect(horizontal).toEqual([
      { point: 'mobile', size: '520px' },
      { point: 'tablet', size: '768px' },
      { point: 'desktop', size: '1280px' },
    ])
    expect(again).toBe(horizontal)

    expect(resolveVerticalBreakpoints(context)).toEqual([
      { point: 'mobile', size: '520px' },
      { point: 'wide', size: '1640px' },
    ])
  })

  it('returns undefined when breakpoints are missing', () => {
    expect(resolveBreakpoints({ theme: {} } as any)).toBeUndefined()
  })
})

describe('makeGlobalStaticRules', () => {
  it('builds static rules for every global keyword', () => {
    expect(makeGlobalStaticRules('margin')).toEqual([
      ['margin-inherit', { margin: 'inherit' }],
      ['margin-initial', { margin: 'initial' }],
      ['margin-revert', { margin: 'revert' }],
      ['margin-revert-layer', { margin: 'revert-layer' }],
      ['margin-unset', { margin: 'unset' }],
    ])
    expect(makeGlobalStaticRules('m', 'margin')[0]).toEqual([
      'm-inherit',
      { margin: 'inherit' },
    ])
  })
})

describe('defineProperty', () => {
  beforeEach(() => {
    trackedProperties.clear()
  })

  it('creates a no-merge @property value and tracks it', () => {
    const value = defineProperty('--un-text-opacity', {
      syntax: '<percentage>',
      initialValue: '100%',
    })

    expect(value).toMatchObject({
      [symbols.noMerge]: true,
      [symbols.noScope]: true,
      'syntax': '"<percentage>"',
      'inherits': 'false',
      'initial-value': '100%',
    })
    expect(trackedProperties.get('--un-text-opacity')).toBe('100%')
  })
})

describe('basic util functions', () => {
  it('detects size-like values', () => {
    expect(isSize('10px')).toBe(true)
    expect(isSize('calc(1px + 2px)')).toBe(true)
    expect(isSize('[10px]')).toBe(true)
    expect(isSize('auto')).toBe(false)
  })

  it('camelizes and hyphenates identifiers', () => {
    expect(camelize('background-color')).toBe('backgroundColor')
    expect(hyphenate('backgroundColor')).toBe('background-color')
  })

  it('compresses css unless running in dev mode', () => {
    const css = '  .a { color: red; /* note */ }  '

    expect(compressCSS(css, true)).toBe('.a { color: red; /* note */ }')
    expect(compressCSS(css, false)).toBe('.a { color: red;  }')
  })
})
