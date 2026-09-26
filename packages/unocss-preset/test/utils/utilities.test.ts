import type { Theme } from '~/theme'
import { symbols } from '@unocss/core'
import { beforeEach, describe, expect, it } from 'vitest'
import { colors } from '~/theme/colors'
import { trackedProperties, trackedTheme } from '~/utils/track'
import {
  colorableShadows,
  colorCSSGenerator,
  colorResolver,
  getThemeByKey,
  hasParseableColor,
  parseColor,
  parseThemeColor,
  splitShorthand,
} from '~/utils/utilities'

const theme = { colors: colors() } satisfies Theme
const blue = theme.colors.blue

describe('splitShorthand', () => {
  it('splits color bodies on / and : while respecting typed brackets', () => {
    expect(splitShorthand('red/50', 'color')).toEqual(['red', '50'])
    expect(splitShorthand('[color:red]/50', 'color')).toEqual(['[color:red]', '50'])
    expect(splitShorthand('[length:10px]/50', 'color')).toBeUndefined()
  })
})

describe('theme colors', () => {
  it('resolves light, dark and display-p3 scales from the real color object', () => {
    expect(getThemeByKey(theme, 'colors', ['blue', '1'])).toBe(blue['1'])
    expect(getThemeByKey(theme, 'colors', ['blue', '12'])).toBe(blue['12'])
    expect(getThemeByKey(theme, 'colors', ['blue', 'dark', '9'])).toBe(blue.dark['9'])
    expect(getThemeByKey(theme, 'colors', ['blue', 'p3', '9'])).toBe(blue.p3['9'])
    expect(getThemeByKey(theme, 'colors', ['blue', 'p3', 'dark', '12'])).toBe(blue.p3.dark['12'])
    expect(getThemeByKey(theme, 'colors', ['missing'])).toBeUndefined()

    expect(parseThemeColor(theme, ['blue'])).toEqual({
      color: blue['9'],
      no: '9',
      keys: ['blue', '9'],
    })
    expect(parseThemeColor(theme, ['blue', '1'])).toEqual({
      color: blue['1'],
      no: '1',
      keys: ['blue', '1'],
    })
    expect(parseThemeColor(theme, ['blue', 'dark'])).toEqual({
      color: blue.dark['9'],
      no: '9',
      keys: ['blue', 'dark', '9'],
    })
    expect(parseThemeColor(theme, ['blue', 'p3'])).toEqual({
      color: blue.p3['9'],
      no: '9',
      keys: ['blue', 'p3', '9'],
    })
    expect(parseThemeColor(theme, ['blue', 'p3', 'dark'])).toEqual({
      color: blue.p3.dark['9'],
      no: '9',
      keys: ['blue', 'p3', 'dark', '9'],
    })
    expect(parseThemeColor(theme, ['missing'])).toBeUndefined()
  })
})

describe('parseColor', () => {
  it('parses theme scales, opacity and nested dark or display-p3 steps', () => {
    const step = parseColor('blue', theme)
    expect(step?.color).toBe(blue['9'])
    expect(step?.keys).toEqual(['blue', '9'])
    expect(step?.no).toBe('9')

    const faded = parseColor('blue-9/20', theme)
    expect(faded?.color).toBe(blue['9'])
    expect(faded?.opacity).toBe('20')
    expect(faded?.alpha).toBe('20%')
    expect(faded?.keys).toEqual(['blue', '9'])

    expect(parseColor('blue-dark-9', theme)?.keys).toEqual(['blue', 'dark', '9'])
    expect(parseColor('blue-dark', theme)?.color).toBe(blue.dark['9'])
    expect(parseColor('blue-p3-1', theme)?.color).toBe(blue.p3['1'])
    expect(parseColor('blue-p3-dark-12', theme)?.color).toBe(blue.p3.dark['12'])
  })

  it('parses special colors, hex shortcuts, brackets and interpolation methods', () => {
    expect(parseColor('transparent', theme)?.color).toBe('transparent')
    expect(parseColor('current', theme)?.color).toBe('currentColor')
    expect(parseColor('hex-fff', theme)?.color).toBe('#fff')
    expect(parseColor('[#abc]', theme)?.color).toBe('#abc')
    expect(parseColor('$brand', theme)?.color).toBe('var(--brand)')

    const bracket = parseColor('[rgb(100_2_3)]/[var(--op)]/[in_oklab]', theme)
    expect(bracket?.color).toBe('rgb(100 2 3)')
    expect(bracket?.alpha).toBe('var(--op)')
    expect(bracket?.modifier).toBe('in oklab')
    expect(bracket?.keys).toBeUndefined()
  })

  it('rejects size-like values and unknown colors', () => {
    expect(parseColor('10px', theme)).toBeUndefined()
    expect(parseColor('not-a-color', theme)?.color).toBeUndefined()
  })
})

describe('colorCSSGenerator and colorResolver', () => {
  const context = {
    theme,
    generator: { config: { envMode: 'build' } },
  } as any

  beforeEach(() => {
    trackedTheme.clear()
    trackedProperties.clear()
  })

  it('emits theme colors as variables and mixes them only when alpha is set', () => {
    const plain = colorCSSGenerator(parseColor('blue', theme), 'color', 'text', context)
    expect(plain?.[0]).toEqual({ color: 'var(--blue-9)' })
    expect(plain).toHaveLength(2)
    expect(plain?.[1]).toMatchObject({
      'syntax': '"<percentage>"',
      'inherits': 'false',
      'initial-value': '100%',
    })
    expect(trackedProperties.get('--un-text-opacity')).toBe('100%')
    expect([...trackedTheme]).toEqual(['colors:blue-9'])

    const faded = colorCSSGenerator(parseColor('blue-9/50', theme), 'color', 'text', context)
    expect(faded?.[0].color).toBe('color-mix(in srgb, var(--blue-9) 50%, transparent)')
    expect(faded?.[2]).toMatchObject({
      [symbols.parent]: '@supports (color: color-mix(in lab, red, red))',
      [symbols.noMerge]: true,
      color: 'color-mix(in oklab, var(--blue-9) 50%, transparent)',
    })

    expect(colorCSSGenerator(parseColor('blue-dark-9', theme), 'color', 'text', context)?.[0]).toEqual({
      color: 'var(--blue-dark-9)',
    })
    expect(colorCSSGenerator(parseColor('blue-p3-dark-9', theme), 'color', 'text', context)?.[0]).toEqual({
      color: 'var(--blue-p3-dark-9)',
    })
  })

  it('mixes special colors in oklab and leaves raw colors untracked', () => {
    expect(colorCSSGenerator(parseColor('transparent', theme), 'color', 'text')).toEqual([
      { color: 'transparent' },
    ])

    const faded = colorCSSGenerator(parseColor('transparent/50', theme), 'color', 'text', context)
    expect(faded?.[0].color).toBe('color-mix(in oklab, transparent 50%, transparent)')
    expect(faded).toHaveLength(2)

    const hex = colorCSSGenerator(parseColor('hex-fff/20', theme), 'color', 'text', context)
    expect(hex?.[0].color).toBe('color-mix(in oklab, #fff 20%, transparent)')
    expect(colorCSSGenerator(parseColor('$brand', theme), 'color', 'text', context)?.[0].color).toBe('var(--brand)')
    expect(trackedTheme.size).toBe(0)
  })

  it('keeps an oklab opacity variable for shadow colors', () => {
    const plain = colorCSSGenerator(parseColor('blue-9', theme), '--un-shadow-color', 'shadow', context)
    expect(plain?.[0]).toEqual({ '--un-shadow-color': 'var(--blue-9)' })
    expect(plain?.[2]).toMatchObject({
      '--un-shadow-color': 'color-mix(in oklab, var(--blue-9) var(--un-shadow-opacity), transparent)',
    })

    const faded = colorCSSGenerator(parseColor('blue-9/40', theme), '--un-shadow-color', 'shadow', context)
    expect(faded?.[2]).toMatchObject({
      '--un-shadow-color': 'color-mix(in oklab, color-mix(in oklab, var(--blue-9) 40%, transparent) var(--un-shadow-opacity), transparent)',
    })
  })

  it('uses an interpolation modifier, skips the fallback, and comments raw colors in development', () => {
    const mixed = colorCSSGenerator(parseColor('blue-9/50/[in_oklab]', theme), 'color', 'text', context)
    expect(mixed?.[0].color).toBe('color-mix(in oklab, var(--blue-9) 50%, transparent)')
    expect(mixed).toHaveLength(2)

    const dev = colorCSSGenerator(parseColor('blue-9/50', theme), 'color', 'text', {
      theme,
      generator: { config: { envMode: 'dev' } },
    } as any)
    expect(dev?.[0].color).toBe(`color-mix(in srgb, var(--blue-9) 50%, transparent) /* ${blue['9']} */`)
    expect(dev?.[2]).toMatchObject({
      color: `color-mix(in oklab, var(--blue-9) 50%, transparent) /* ${blue['9']} */`,
    })
  })

  it('resolves theme colors to variables and ignores unknown colors', () => {
    const resolve = colorResolver('background-color', 'bg')
    const result = resolve(['', 'blue-9'], context)

    expect(result?.[0]).toEqual({ 'background-color': 'var(--blue-9)' })
    expect(result).toHaveLength(2)
    expect(resolve(['', 'not-a-color'], context)).toBeUndefined()
  })
})

describe('colorableShadows', () => {
  it('extracts leading, trailing and variable colors, including inset alpha', () => {
    expect(colorableShadows('0 1px 2px #000000', '--un-shadow-color')).toEqual([
      '0 1px 2px var(--un-shadow-color, rgb(0 0 0))',
    ])
    expect(colorableShadows('#000 0 1px 2px', '--un-shadow-color')).toEqual([
      '0 1px 2px var(--un-shadow-color, rgb(0 0 0))',
    ])
    expect(colorableShadows('0 1px 2px var(--brand)', '--un-shadow-color')).toEqual([
      '0 1px 2px var(--un-shadow-color, var(--brand))',
    ])
    expect(colorableShadows('inset 0 1px #000', '--c', '0.5')).toEqual([
      'inset 0 1px var(--c, oklab(from rgb(0 0 0) l a b / 0.5))',
    ])
    expect(colorableShadows('none', '--c')).toEqual(['none'])
  })
})

describe('hasParseableColor', () => {
  it('checks whether a color body resolves to a concrete value', () => {
    expect(hasParseableColor('blue', theme)).toBe(true)
    expect(hasParseableColor('blue-p3-dark-9', theme)).toBe(true)
    expect(hasParseableColor('transparent', theme)).toBe(true)
    expect(hasParseableColor('missing', theme)).toBe(false)
    expect(hasParseableColor(undefined, theme)).toBe(false)
  })
})
