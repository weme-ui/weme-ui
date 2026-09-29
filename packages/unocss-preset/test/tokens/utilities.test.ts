import { symbols } from '@unocss/core'
import { beforeEach, describe, expect, it } from 'vitest'
import {
  CUSTOM_CSSVAR_FUZZY_MAP,
  CUSTOM_THEME_COLOR_ALIASES,
  CUSTOM_THEME_TOKENS_MAP,
  customThemeColorCSSGenerator,
  customThemeColorResolver,
  generateColorAliasCssVar,
  isRawColor,
  parseColorAlias,
  parseCustomCssVar,
  parseCustomThemeToken,
  splitCustomThemeTokenKey,
} from '~/tokens'
import { trackedColorAliases, trackedProperties } from '~/utils/track'

type FuzzyMapKey = keyof typeof CUSTOM_CSSVAR_FUZZY_MAP

describe('isRawColor', () => {
  it('recognizes literal colors and css variables', () => {
    expect(isRawColor('#fff')).toBe(true)
    expect(isRawColor('rgb(0 0 0)')).toBe(true)
    expect(isRawColor('hsl(0 0% 0%)')).toBe(true)
    expect(isRawColor('lab(0% 0 0)')).toBe(true)
    expect(isRawColor('lch(0% 0 0)')).toBe(true)
    expect(isRawColor('oklch(0% 0 0)')).toBe(true)
    expect(isRawColor('color(display-p3 0 0 0)')).toBe(true)
    expect(isRawColor('var(--brand)')).toBe(true)
    expect(isRawColor('primary')).toBe(false)
    expect(isRawColor('red.9')).toBe(false)
  })
})

describe('splitCustomThemeTokenKey', () => {
  it('rejects a css variable before any token match', () => {
    expect(splitCustomThemeTokenKey('var(--foreground)')).toBeUndefined()
    expect(splitCustomThemeTokenKey('var(--card-text)')).toBeUndefined()
    expect(splitCustomThemeTokenKey('var(--foreground)/50')).toBeUndefined()
  })

  it('rejects an alpha outside 0 to 100', () => {
    expect(splitCustomThemeTokenKey('primary/foo')).toBeUndefined()
    expect(splitCustomThemeTokenKey('primary/101')).toBeUndefined()
    expect(splitCustomThemeTokenKey('primary/-1')).toBeUndefined()
    expect(splitCustomThemeTokenKey('primary/')).toBeUndefined()
    expect(splitCustomThemeTokenKey('foreground-base/101')).toBeUndefined()
  })

  it('keeps a valid alpha and drops it from the name', () => {
    expect(splitCustomThemeTokenKey('foreground-base')).toEqual({
      name: 'foreground-base',
      alpha: undefined,
    })
    expect(splitCustomThemeTokenKey('foreground-base/0')).toEqual({
      name: 'foreground-base',
      alpha: 0,
    })
    expect(splitCustomThemeTokenKey('foreground-base/50')).toEqual({
      name: 'foreground-base',
      alpha: 50,
    })
    expect(splitCustomThemeTokenKey('primary/100')).toEqual({
      name: 'primary',
      alpha: 100,
    })
  })
})

describe('parseCustomThemeToken', () => {
  describe('returns undefined', () => {
    it('rejects a css variable before any token match', () => {
      expect(parseCustomThemeToken('var(--foreground)')).toBeUndefined()
      expect(parseCustomThemeToken('var(--card-text)')).toBeUndefined()
      expect(parseCustomThemeToken('var(--foreground)/50')).toBeUndefined()
    })

    it('rejects an alpha outside 0 to 100, including on a complete token', () => {
      expect(parseCustomThemeToken('primary/foo')).toBeUndefined()
      expect(parseCustomThemeToken('primary/101')).toBeUndefined()
      expect(parseCustomThemeToken('primary/-1')).toBeUndefined()
      expect(parseCustomThemeToken('primary/')).toBeUndefined()
      expect(parseCustomThemeToken('foreground-base/101')).toBeUndefined()
    })
  })

  describe('complete theme token', () => {
    it('parses every scope-variant pair', () => {
      const tokens = [
        ['foreground-highlighted', 'foreground', 'highlighted'],
        ['foreground-base', 'foreground', 'base'],
        ['foreground-subtle', 'foreground', 'subtle'],
        ['foreground-muted', 'foreground', 'muted'],
        ['foreground-inverted', 'foreground', 'inverted'],
        ['background-base', 'background', 'base'],
        ['background-muted', 'background', 'muted'],
        ['background-elevated', 'background', 'elevated'],
        ['background-inverted', 'background', 'inverted'],
        ['border-base', 'border', 'base'],
        ['border-elevated', 'border', 'elevated'],
        ['border-inverted', 'border', 'inverted'],
      ] as const

      for (const [body, scope, variant] of tokens) {
        expect(parseCustomThemeToken(body)).toEqual({
          name: body,
          keys: [scope, variant],
        })
      }
    })

    it('keeps a complete token even when an explicit front is provided', () => {
      expect(parseCustomThemeToken('foreground-base', 'border')).toEqual({
        name: 'foreground-base',
        keys: ['foreground', 'base'],
      })
    })

    it('keeps a valid alpha and drops it from the name', () => {
      expect(parseCustomThemeToken('foreground-base/0')).toEqual({
        name: 'foreground-base',
        keys: ['foreground', 'base'],
        alpha: 0,
      })
      expect(parseCustomThemeToken('foreground-base/50')).toEqual({
        name: 'foreground-base',
        keys: ['foreground', 'base'],
        alpha: 50,
      })
      expect(parseCustomThemeToken('foreground-highlighted/100')).toEqual({
        name: 'foreground-highlighted',
        keys: ['foreground', 'highlighted'],
        alpha: 100,
      })
    })
  })

  describe('explicit front token', () => {
    it('pairs each foreground variant with the given front', () => {
      for (const name of ['highlighted', 'base', 'subtle', 'muted', 'inverted'] as const) {
        expect(parseCustomThemeToken(name, 'foreground')).toEqual({
          name,
          keys: ['foreground', name],
        })
      }
    })

    it('pairs each background variant with the given front', () => {
      for (const name of ['base', 'muted', 'elevated', 'inverted'] as const) {
        expect(parseCustomThemeToken(name, 'background')).toEqual({
          name,
          keys: ['background', name],
        })
      }
    })

    it('pairs each border variant with the given front', () => {
      for (const name of ['base', 'elevated', 'inverted'] as const) {
        expect(parseCustomThemeToken(name, 'border')).toEqual({
          name,
          keys: ['border', name],
        })
      }
    })

    it('does not switch to another theme scope when the variant is absent', () => {
      expect(parseCustomThemeToken('highlighted', 'background')).toEqual({
        name: 'highlighted',
        keys: [],
      })
      expect(parseCustomThemeToken('elevated', 'foreground')).toEqual({
        name: 'elevated',
        keys: [],
      })
      expect(parseCustomThemeToken('base', 'nope')).toEqual({
        name: 'base',
        keys: [],
      })
    })

    it('keeps a valid alpha on the bare variant', () => {
      expect(parseCustomThemeToken('base/40', 'foreground')).toEqual({
        name: 'base',
        keys: ['foreground', 'base'],
        alpha: 40,
      })
    })
  })

  describe('unmatched name', () => {
    it('keeps names that are not theme tokens', () => {
      expect(parseCustomThemeToken('foreground')).toEqual({
        name: 'foreground',
        keys: [],
      })
      expect(parseCustomThemeToken('card-title')).toEqual({
        name: 'card-title',
        keys: [],
      })
      expect(parseCustomThemeToken('primary-9')).toEqual({
        name: 'primary-9',
        keys: [],
      })
      expect(parseCustomThemeToken('foreground-nope')).toEqual({
        name: 'foreground-nope',
        keys: [],
      })
      expect(parseCustomThemeToken('base')).toEqual({
        name: 'base',
        keys: [],
      })
    })

    it('splits a valid alpha without inventing keys', () => {
      expect(parseCustomThemeToken('primary/0')).toEqual({
        name: 'primary',
        keys: [],
        alpha: 0,
      })
      expect(parseCustomThemeToken('primary/50')).toEqual({
        name: 'primary',
        keys: [],
        alpha: 50,
      })
      expect(parseCustomThemeToken('primary/100')).toEqual({
        name: 'primary',
        keys: [],
        alpha: 100,
      })
      expect(parseCustomThemeToken('primary-9/50')).toEqual({
        name: 'primary-9',
        keys: [],
        alpha: 50,
      })
    })
  })
})

describe('parseCustomCssVar', () => {
  it('rejects a css variable or invalid alpha before any match', () => {
    const cssVars = { 'card-text': 'foreground.base' }

    expect(parseCustomCssVar('color', 'var(--foreground)', cssVars)).toBeUndefined()
    expect(parseCustomCssVar('color', 'card/foo', cssVars)).toBeUndefined()
    expect(parseCustomCssVar('color', 'card/101', cssVars)).toBeUndefined()
  })

  it('matches name-suffix keys from cssVars using the fuzzy map', () => {
    expect(parseCustomCssVar('color', 'card', { 'card-text': 'foreground.base' })).toEqual({
      name: 'card',
      keys: ['card', 'text'],
    })
    expect(parseCustomCssVar('color', 'card', { 'card-color': 'primary.9' })).toEqual({
      name: 'card',
      keys: ['card', 'color'],
    })
    expect(parseCustomCssVar('background-color', 'card', { 'card-background': 'background.base' })).toEqual({
      name: 'card',
      keys: ['card', 'background'],
    })
    expect(parseCustomCssVar('background-color', 'card', { 'card-bg': 'background.muted' })).toEqual({
      name: 'card',
      keys: ['card', 'bg'],
    })
    expect(parseCustomCssVar('border-color', 'card', { 'card-border-color': 'border.base' })).toEqual({
      name: 'card',
      keys: ['card', 'border', 'color'],
    })
    expect(parseCustomCssVar('border-color', 'card', { 'card-border': 'border.elevated' })).toEqual({
      name: 'card',
      keys: ['card', 'border'],
    })
    expect(parseCustomCssVar('fill', 'card', { 'card-fill': 'background.base' })).toEqual({
      name: 'card',
      keys: ['card', 'fill'],
    })
    expect(parseCustomCssVar('width', 'card', { 'card-w': '50%' })).toEqual({
      name: 'card',
      keys: ['card', 'w'],
    })
    expect(parseCustomCssVar('padding', 'card', { 'card-space': '1rem' })).toEqual({
      name: 'card',
      keys: ['card', 'space'],
    })
  })

  it('keeps a valid alpha on the matched name', () => {
    expect(parseCustomCssVar('color', 'card/50', { 'card-text': 'foreground.base' })).toEqual({
      name: 'card',
      keys: ['card', 'text'],
      alpha: 50,
    })
  })

  it('prefers the first matching css var key when multiple suffixes exist', () => {
    expect(parseCustomCssVar('color', 'card', {
      'card-color': 'primary.9',
      'card-text': 'foreground.base',
    })).toEqual({
      name: 'card',
      keys: ['card', 'color'],
    })

    expect(parseCustomCssVar('color', 'card', {
      'card-text': 'foreground.base',
      'card-color': 'primary.9',
    })).toEqual({
      name: 'card',
      keys: ['card', 'text'],
    })
  })

  it('returns undefined when no name-suffix key exists', () => {
    expect(parseCustomCssVar('color', 'card', {})).toBeUndefined()
    expect(parseCustomCssVar('color', 'card', { 'panel-text': 'foreground.base' })).toBeUndefined()
    expect(parseCustomCssVar('color', 'card', { 'card-background': 'background.base' })).toBeUndefined()
    expect(parseCustomCssVar('width', 'card', { 'card-text': 'foreground.base' })).toBeUndefined()
  })
})

describe('parseColorAlias', () => {
  beforeEach(() => {
    trackedColorAliases.clear()
  })

  it('defaults a bare alias to step 9 and tracks it', () => {
    const keys = ['primary']

    expect(parseColorAlias(keys)).toEqual({
      color: 'var(--primary-9)',
      no: '9',
      keys: ['primary', '9'],
    })
    expect(keys).toEqual(['primary', '9'])
    expect([...trackedColorAliases]).toEqual(['primary:9'])
  })

  it('keeps an explicit step and ignores unknown aliases', () => {
    expect(parseColorAlias(['error', '1'])).toEqual({
      color: 'var(--error-1)',
      no: '1',
      keys: ['error', '1'],
    })
    expect(parseColorAlias(['foreground', 'base'])).toBeUndefined()
    expect([...trackedColorAliases]).toEqual(['error:1'])
  })
})

describe('generateColorAliasCssVar', () => {
  it('turns dotted aliases into css variables and leaves plain values alone', () => {
    expect(generateColorAliasCssVar('primary.1')).toBe('var(--primary-1)')
    expect(generateColorAliasCssVar('foreground.base')).toBe('var(--foreground-base)')
    expect(generateColorAliasCssVar('a.b.c')).toBe('var(--a-b-c)')
    expect(generateColorAliasCssVar('card-bg')).toBe('card-bg')
  })
})

describe('customThemeCSSGenerator', () => {
  beforeEach(() => {
    trackedProperties.clear()
  })

  it('returns undefined when keys are empty', () => {
    expect(customThemeColorCSSGenerator({ name: 'primary', keys: [], alpha: undefined }, 'color')).toBeUndefined()
    expect(trackedProperties.size).toBe(0)
  })

  it('emits a theme variable and an opacity property without alpha', () => {
    const result = customThemeColorCSSGenerator({
      name: 'foreground-base',
      keys: ['foreground', 'base'],
      alpha: undefined,
    }, 'border-color')

    expect(result?.[0]).toEqual({ 'border-color': 'var(--foreground-base)' })
    expect(result).toHaveLength(2)
    expect(result?.[1]).toMatchObject({
      'syntax': '"<percentage>"',
      'inherits': 'false',
      'initial-value': '100%',
    })
    expect(trackedProperties.get('--un-border-opacity')).toBe('100%')
  })

  it('mixes a positive alpha in oklab and adds a color-mix fallback', () => {
    const result = customThemeColorCSSGenerator({
      name: 'foreground-base',
      keys: ['foreground', 'base'],
      alpha: 50,
    }, 'color')

    expect(result?.[0]).toEqual({
      color: 'color-mix(in oklab, var(--foreground-base) 50%, transparent)',
    })
    expect(result).toHaveLength(3)
    expect(result?.[2]).toMatchObject({
      [symbols.parent]: '@supports (color: color-mix(in lab, red, red))',
      [symbols.noMerge]: true,
      color: 'color-mix(in oklab, var(--foreground-base) 50%, transparent)',
    })
  })

  it('mixes alpha 0 as a percentage', () => {
    const result = customThemeColorCSSGenerator({
      name: 'foreground-highlighted',
      keys: ['foreground', 'highlighted'],
      alpha: 0,
    }, 'color')

    expect(result?.[0]).toEqual({
      color: 'color-mix(in oklab, var(--foreground-highlighted) 0%, transparent)',
    })
    expect(result).toHaveLength(3)
  })

  it('adds a color-mix fallback for shadow-like properties without alpha', () => {
    for (const property of ['shadow-color', 'inset-shadow-color', 'text-shadow-color', 'drop-shadow-color'] as const) {
      trackedProperties.clear()

      const result = customThemeColorCSSGenerator({
        name: 'foreground-base',
        keys: ['foreground', 'base'],
        alpha: undefined,
      }, property)

      const varName = property.replace(/-color/g, '')

      expect(result?.[0]).toEqual({ [property]: 'var(--foreground-base)' })
      expect(result).toHaveLength(3)
      expect(result?.[2]).toMatchObject({
        [symbols.parent]: '@supports (color: color-mix(in lab, red, red))',
        [symbols.noMerge]: true,
        [property]: `color-mix(in oklab, var(--foreground-base) var(--un-${varName}-opacity), transparent)`,
      })
      expect(trackedProperties.get(`--un-${varName}-opacity`)).toBe('100%')
    }
  })

  it('nests a positive alpha inside the shadow fallback', () => {
    const result = customThemeColorCSSGenerator({
      name: 'foreground-base',
      keys: ['foreground', 'base'],
      alpha: 40,
    }, 'shadow-color')

    expect(result?.[0]).toEqual({
      'shadow-color': 'color-mix(in oklab, var(--foreground-base) 40%, transparent)',
    })
    expect(result?.[2]).toMatchObject({
      'shadow-color': 'color-mix(in oklab, color-mix(in oklab, var(--foreground-base) 40%, transparent) var(--un-shadow-opacity), transparent)',
    })
  })
})

describe('customThemeCssVarResolver', () => {
  beforeEach(() => {
    trackedProperties.clear()
  })

  it('returns undefined when the body cannot be parsed or matched', () => {
    const resolve = customThemeColorResolver('color', 'color')

    expect(resolve('var(--foreground)', {})).toBeUndefined()
    expect(resolve('var(--foreground)/50', {})).toBeUndefined()
    expect(resolve('primary/foo', {})).toBeUndefined()
    expect(resolve('primary/101', {})).toBeUndefined()
    expect(resolve('foreground-base/101', {})).toBeUndefined()
    expect(resolve('primary', {})).toBeUndefined()
    expect(resolve('card', {})).toBeUndefined()
    expect(trackedProperties.has('--un-color-opacity')).toBe(false)
  })

  it('resolves a complete theme token', () => {
    const result = customThemeColorResolver('border-color', 'border-color')('foreground-base', {})

    expect(result?.[0]).toEqual({ 'border-color': 'var(--foreground-base)' })
    expect(result).toHaveLength(2)
    expect(trackedProperties.get('--un-border-opacity')).toBe('100%')
  })

  it('resolves a complete theme token with alpha', () => {
    const result = customThemeColorResolver('color', 'color')('foreground-base/50', {})

    expect(result?.[0]).toEqual({
      color: 'color-mix(in oklab, var(--foreground-base) 50%, transparent)',
    })
    expect(result).toHaveLength(3)
  })

  it('falls through to parseCustomCssVar when the theme token has no keys', () => {
    const result = customThemeColorResolver('color', 'color')('card/40', {
      'card-text': 'foreground.base',
    })

    expect(result?.[0]).toEqual({
      color: 'color-mix(in oklab, var(--card-text) 40%, transparent)',
    })
    expect(result).toHaveLength(3)
  })

  it('prefers a complete theme token over a css var with the same body', () => {
    const result = customThemeColorResolver('color', 'color')('foreground-base', {
      'foreground-base-text': 'primary.9',
    })

    expect(result?.[0]).toEqual({ color: 'var(--foreground-base)' })
  })
})

describe('successful results snapshots', () => {
  it('splitCustomThemeTokenKey', () => {
    const inputs = [
      'foreground-base',
      'foreground-base/0',
      'foreground-base/50',
      'foreground-base/100',
      'primary',
      'primary/0',
      'primary/50',
      'primary/100',
    ]

    expect(
      Object.fromEntries(inputs.map(input => [input, splitCustomThemeTokenKey(input)])),
    ).toMatchInlineSnapshot(`
      {
        "foreground-base": {
          "alpha": undefined,
          "name": "foreground-base",
        },
        "foreground-base/0": {
          "alpha": 0,
          "name": "foreground-base",
        },
        "foreground-base/100": {
          "alpha": 100,
          "name": "foreground-base",
        },
        "foreground-base/50": {
          "alpha": 50,
          "name": "foreground-base",
        },
        "primary": {
          "alpha": undefined,
          "name": "primary",
        },
        "primary/0": {
          "alpha": 0,
          "name": "primary",
        },
        "primary/100": {
          "alpha": 100,
          "name": "primary",
        },
        "primary/50": {
          "alpha": 50,
          "name": "primary",
        },
      }
    `)
  })

  it('parseCustomThemeToken complete tokens', () => {
    const results: Record<string, ReturnType<typeof parseCustomThemeToken>> = {}

    for (const [scope, variants] of Object.entries(CUSTOM_THEME_TOKENS_MAP)) {
      for (const variant of variants) {
        const body = `${scope}-${variant}`
        results[body] = parseCustomThemeToken(body)
        results[`${body}/50`] = parseCustomThemeToken(`${body}/50`)
      }
    }

    expect(results).toMatchInlineSnapshot(`
      {
        "background-base": {
          "alpha": undefined,
          "keys": [
            "background",
            "base",
          ],
          "name": "background-base",
        },
        "background-base/50": {
          "alpha": 50,
          "keys": [
            "background",
            "base",
          ],
          "name": "background-base",
        },
        "background-elevated": {
          "alpha": undefined,
          "keys": [
            "background",
            "elevated",
          ],
          "name": "background-elevated",
        },
        "background-elevated/50": {
          "alpha": 50,
          "keys": [
            "background",
            "elevated",
          ],
          "name": "background-elevated",
        },
        "background-inverted": {
          "alpha": undefined,
          "keys": [
            "background",
            "inverted",
          ],
          "name": "background-inverted",
        },
        "background-inverted/50": {
          "alpha": 50,
          "keys": [
            "background",
            "inverted",
          ],
          "name": "background-inverted",
        },
        "background-muted": {
          "alpha": undefined,
          "keys": [
            "background",
            "muted",
          ],
          "name": "background-muted",
        },
        "background-muted/50": {
          "alpha": 50,
          "keys": [
            "background",
            "muted",
          ],
          "name": "background-muted",
        },
        "border-base": {
          "alpha": undefined,
          "keys": [
            "border",
            "base",
          ],
          "name": "border-base",
        },
        "border-base/50": {
          "alpha": 50,
          "keys": [
            "border",
            "base",
          ],
          "name": "border-base",
        },
        "border-elevated": {
          "alpha": undefined,
          "keys": [
            "border",
            "elevated",
          ],
          "name": "border-elevated",
        },
        "border-elevated/50": {
          "alpha": 50,
          "keys": [
            "border",
            "elevated",
          ],
          "name": "border-elevated",
        },
        "border-inverted": {
          "alpha": undefined,
          "keys": [
            "border",
            "inverted",
          ],
          "name": "border-inverted",
        },
        "border-inverted/50": {
          "alpha": 50,
          "keys": [
            "border",
            "inverted",
          ],
          "name": "border-inverted",
        },
        "foreground-base": {
          "alpha": undefined,
          "keys": [
            "foreground",
            "base",
          ],
          "name": "foreground-base",
        },
        "foreground-base/50": {
          "alpha": 50,
          "keys": [
            "foreground",
            "base",
          ],
          "name": "foreground-base",
        },
        "foreground-highlighted": {
          "alpha": undefined,
          "keys": [
            "foreground",
            "highlighted",
          ],
          "name": "foreground-highlighted",
        },
        "foreground-highlighted/50": {
          "alpha": 50,
          "keys": [
            "foreground",
            "highlighted",
          ],
          "name": "foreground-highlighted",
        },
        "foreground-inverted": {
          "alpha": undefined,
          "keys": [
            "foreground",
            "inverted",
          ],
          "name": "foreground-inverted",
        },
        "foreground-inverted/50": {
          "alpha": 50,
          "keys": [
            "foreground",
            "inverted",
          ],
          "name": "foreground-inverted",
        },
        "foreground-muted": {
          "alpha": undefined,
          "keys": [
            "foreground",
            "muted",
          ],
          "name": "foreground-muted",
        },
        "foreground-muted/50": {
          "alpha": 50,
          "keys": [
            "foreground",
            "muted",
          ],
          "name": "foreground-muted",
        },
        "foreground-subtle": {
          "alpha": undefined,
          "keys": [
            "foreground",
            "subtle",
          ],
          "name": "foreground-subtle",
        },
        "foreground-subtle/50": {
          "alpha": 50,
          "keys": [
            "foreground",
            "subtle",
          ],
          "name": "foreground-subtle",
        },
      }
    `)
  })

  it('parseCustomThemeToken explicit front tokens', () => {
    const results: Record<string, ReturnType<typeof parseCustomThemeToken>> = {}

    for (const [front, variants] of Object.entries(CUSTOM_THEME_TOKENS_MAP)) {
      for (const variant of variants) {
        results[`${front}:${variant}`] = parseCustomThemeToken(variant, front)
        results[`${front}:${variant}/50`] = parseCustomThemeToken(`${variant}/50`, front)
      }
    }

    expect(results).toMatchInlineSnapshot(`
      {
        "background:base": {
          "alpha": undefined,
          "keys": [
            "background",
            "base",
          ],
          "name": "base",
        },
        "background:base/50": {
          "alpha": 50,
          "keys": [
            "background",
            "base",
          ],
          "name": "base",
        },
        "background:elevated": {
          "alpha": undefined,
          "keys": [
            "background",
            "elevated",
          ],
          "name": "elevated",
        },
        "background:elevated/50": {
          "alpha": 50,
          "keys": [
            "background",
            "elevated",
          ],
          "name": "elevated",
        },
        "background:inverted": {
          "alpha": undefined,
          "keys": [
            "background",
            "inverted",
          ],
          "name": "inverted",
        },
        "background:inverted/50": {
          "alpha": 50,
          "keys": [
            "background",
            "inverted",
          ],
          "name": "inverted",
        },
        "background:muted": {
          "alpha": undefined,
          "keys": [
            "background",
            "muted",
          ],
          "name": "muted",
        },
        "background:muted/50": {
          "alpha": 50,
          "keys": [
            "background",
            "muted",
          ],
          "name": "muted",
        },
        "border:base": {
          "alpha": undefined,
          "keys": [
            "border",
            "base",
          ],
          "name": "base",
        },
        "border:base/50": {
          "alpha": 50,
          "keys": [
            "border",
            "base",
          ],
          "name": "base",
        },
        "border:elevated": {
          "alpha": undefined,
          "keys": [
            "border",
            "elevated",
          ],
          "name": "elevated",
        },
        "border:elevated/50": {
          "alpha": 50,
          "keys": [
            "border",
            "elevated",
          ],
          "name": "elevated",
        },
        "border:inverted": {
          "alpha": undefined,
          "keys": [
            "border",
            "inverted",
          ],
          "name": "inverted",
        },
        "border:inverted/50": {
          "alpha": 50,
          "keys": [
            "border",
            "inverted",
          ],
          "name": "inverted",
        },
        "foreground:base": {
          "alpha": undefined,
          "keys": [
            "foreground",
            "base",
          ],
          "name": "base",
        },
        "foreground:base/50": {
          "alpha": 50,
          "keys": [
            "foreground",
            "base",
          ],
          "name": "base",
        },
        "foreground:highlighted": {
          "alpha": undefined,
          "keys": [
            "foreground",
            "highlighted",
          ],
          "name": "highlighted",
        },
        "foreground:highlighted/50": {
          "alpha": 50,
          "keys": [
            "foreground",
            "highlighted",
          ],
          "name": "highlighted",
        },
        "foreground:inverted": {
          "alpha": undefined,
          "keys": [
            "foreground",
            "inverted",
          ],
          "name": "inverted",
        },
        "foreground:inverted/50": {
          "alpha": 50,
          "keys": [
            "foreground",
            "inverted",
          ],
          "name": "inverted",
        },
        "foreground:muted": {
          "alpha": undefined,
          "keys": [
            "foreground",
            "muted",
          ],
          "name": "muted",
        },
        "foreground:muted/50": {
          "alpha": 50,
          "keys": [
            "foreground",
            "muted",
          ],
          "name": "muted",
        },
        "foreground:subtle": {
          "alpha": undefined,
          "keys": [
            "foreground",
            "subtle",
          ],
          "name": "subtle",
        },
        "foreground:subtle/50": {
          "alpha": 50,
          "keys": [
            "foreground",
            "subtle",
          ],
          "name": "subtle",
        },
      }
    `)
  })

  it('parseCustomCssVar', () => {
    const results: Record<string, ReturnType<typeof parseCustomCssVar>> = {}

    for (const [property, suffixes] of Object.entries(CUSTOM_CSSVAR_FUZZY_MAP) as [FuzzyMapKey, string[]][]) {
      for (const suffix of suffixes) {
        const cssVars = { [`card-${suffix}`]: 'token' }
        results[`${property}:card-${suffix}`] = parseCustomCssVar(property, 'card', cssVars)
        results[`${property}:card-${suffix}/50`] = parseCustomCssVar(property, 'card/50', cssVars)
      }
    }

    expect(results).toMatchInlineSnapshot(`
      {
        "background-color:card-background": {
          "alpha": undefined,
          "keys": [
            "card",
            "background",
          ],
          "name": "card",
        },
        "background-color:card-background/50": {
          "alpha": 50,
          "keys": [
            "card",
            "background",
          ],
          "name": "card",
        },
        "background-color:card-bg": {
          "alpha": undefined,
          "keys": [
            "card",
            "bg",
          ],
          "name": "card",
        },
        "background-color:card-bg/50": {
          "alpha": 50,
          "keys": [
            "card",
            "bg",
          ],
          "name": "card",
        },
        "background-color:card-color": {
          "alpha": undefined,
          "keys": [
            "card",
            "color",
          ],
          "name": "card",
        },
        "background-color:card-color/50": {
          "alpha": 50,
          "keys": [
            "card",
            "color",
          ],
          "name": "card",
        },
        "border-color:card-border": {
          "alpha": undefined,
          "keys": [
            "card",
            "border",
          ],
          "name": "card",
        },
        "border-color:card-border-color": {
          "alpha": undefined,
          "keys": [
            "card",
            "border",
            "color",
          ],
          "name": "card",
        },
        "border-color:card-border-color/50": {
          "alpha": 50,
          "keys": [
            "card",
            "border",
            "color",
          ],
          "name": "card",
        },
        "border-color:card-border/50": {
          "alpha": 50,
          "keys": [
            "card",
            "border",
          ],
          "name": "card",
        },
        "border-width:card-border-width": {
          "alpha": undefined,
          "keys": [
            "card",
            "border",
            "width",
          ],
          "name": "card",
        },
        "border-width:card-border-width/50": {
          "alpha": 50,
          "keys": [
            "card",
            "border",
            "width",
          ],
          "name": "card",
        },
        "color:card-color": {
          "alpha": undefined,
          "keys": [
            "card",
            "color",
          ],
          "name": "card",
        },
        "color:card-color/50": {
          "alpha": 50,
          "keys": [
            "card",
            "color",
          ],
          "name": "card",
        },
        "color:card-text": {
          "alpha": undefined,
          "keys": [
            "card",
            "text",
          ],
          "name": "card",
        },
        "color:card-text/50": {
          "alpha": 50,
          "keys": [
            "card",
            "text",
          ],
          "name": "card",
        },
        "fill:card-background": {
          "alpha": undefined,
          "keys": [
            "card",
            "background",
          ],
          "name": "card",
        },
        "fill:card-background/50": {
          "alpha": 50,
          "keys": [
            "card",
            "background",
          ],
          "name": "card",
        },
        "fill:card-bg": {
          "alpha": undefined,
          "keys": [
            "card",
            "bg",
          ],
          "name": "card",
        },
        "fill:card-bg/50": {
          "alpha": 50,
          "keys": [
            "card",
            "bg",
          ],
          "name": "card",
        },
        "fill:card-color": {
          "alpha": undefined,
          "keys": [
            "card",
            "color",
          ],
          "name": "card",
        },
        "fill:card-color/50": {
          "alpha": 50,
          "keys": [
            "card",
            "color",
          ],
          "name": "card",
        },
        "fill:card-fill": {
          "alpha": undefined,
          "keys": [
            "card",
            "fill",
          ],
          "name": "card",
        },
        "fill:card-fill/50": {
          "alpha": 50,
          "keys": [
            "card",
            "fill",
          ],
          "name": "card",
        },
        "height:card-h": {
          "alpha": undefined,
          "keys": [
            "card",
            "h",
          ],
          "name": "card",
        },
        "height:card-h/50": {
          "alpha": 50,
          "keys": [
            "card",
            "h",
          ],
          "name": "card",
        },
        "height:card-height": {
          "alpha": undefined,
          "keys": [
            "card",
            "height",
          ],
          "name": "card",
        },
        "height:card-height/50": {
          "alpha": 50,
          "keys": [
            "card",
            "height",
          ],
          "name": "card",
        },
        "height:card-size": {
          "alpha": undefined,
          "keys": [
            "card",
            "size",
          ],
          "name": "card",
        },
        "height:card-size/50": {
          "alpha": 50,
          "keys": [
            "card",
            "size",
          ],
          "name": "card",
        },
        "margin:card-m": {
          "alpha": undefined,
          "keys": [
            "card",
            "m",
          ],
          "name": "card",
        },
        "margin:card-m/50": {
          "alpha": 50,
          "keys": [
            "card",
            "m",
          ],
          "name": "card",
        },
        "margin:card-margin": {
          "alpha": undefined,
          "keys": [
            "card",
            "margin",
          ],
          "name": "card",
        },
        "margin:card-margin/50": {
          "alpha": 50,
          "keys": [
            "card",
            "margin",
          ],
          "name": "card",
        },
        "margin:card-space": {
          "alpha": undefined,
          "keys": [
            "card",
            "space",
          ],
          "name": "card",
        },
        "margin:card-space/50": {
          "alpha": 50,
          "keys": [
            "card",
            "space",
          ],
          "name": "card",
        },
        "padding:card-p": {
          "alpha": undefined,
          "keys": [
            "card",
            "p",
          ],
          "name": "card",
        },
        "padding:card-p/50": {
          "alpha": 50,
          "keys": [
            "card",
            "p",
          ],
          "name": "card",
        },
        "padding:card-padding": {
          "alpha": undefined,
          "keys": [
            "card",
            "padding",
          ],
          "name": "card",
        },
        "padding:card-padding/50": {
          "alpha": 50,
          "keys": [
            "card",
            "padding",
          ],
          "name": "card",
        },
        "padding:card-space": {
          "alpha": undefined,
          "keys": [
            "card",
            "space",
          ],
          "name": "card",
        },
        "padding:card-space/50": {
          "alpha": 50,
          "keys": [
            "card",
            "space",
          ],
          "name": "card",
        },
        "width:card-size": {
          "alpha": undefined,
          "keys": [
            "card",
            "size",
          ],
          "name": "card",
        },
        "width:card-size/50": {
          "alpha": 50,
          "keys": [
            "card",
            "size",
          ],
          "name": "card",
        },
        "width:card-w": {
          "alpha": undefined,
          "keys": [
            "card",
            "w",
          ],
          "name": "card",
        },
        "width:card-w/50": {
          "alpha": 50,
          "keys": [
            "card",
            "w",
          ],
          "name": "card",
        },
        "width:card-width": {
          "alpha": undefined,
          "keys": [
            "card",
            "width",
          ],
          "name": "card",
        },
        "width:card-width/50": {
          "alpha": 50,
          "keys": [
            "card",
            "width",
          ],
          "name": "card",
        },
      }
    `)
  })

  it('parseColorAlias', () => {
    trackedColorAliases.clear()

    const results: Record<string, ReturnType<typeof parseColorAlias>> = {}

    for (const alias of CUSTOM_THEME_COLOR_ALIASES) {
      results[alias] = parseColorAlias([alias])
      results[`${alias}.1`] = parseColorAlias([alias, '1'])
      results[`${alias}.9`] = parseColorAlias([alias, '9'])
    }

    expect(results).toMatchInlineSnapshot(`
      {
        "error": {
          "color": "var(--error-9)",
          "keys": [
            "error",
            "9",
          ],
          "no": "9",
        },
        "error.1": {
          "color": "var(--error-1)",
          "keys": [
            "error",
            "1",
          ],
          "no": "1",
        },
        "error.9": {
          "color": "var(--error-9)",
          "keys": [
            "error",
            "9",
          ],
          "no": "9",
        },
        "info": {
          "color": "var(--info-9)",
          "keys": [
            "info",
            "9",
          ],
          "no": "9",
        },
        "info.1": {
          "color": "var(--info-1)",
          "keys": [
            "info",
            "1",
          ],
          "no": "1",
        },
        "info.9": {
          "color": "var(--info-9)",
          "keys": [
            "info",
            "9",
          ],
          "no": "9",
        },
        "neutral": {
          "color": "var(--neutral-9)",
          "keys": [
            "neutral",
            "9",
          ],
          "no": "9",
        },
        "neutral.1": {
          "color": "var(--neutral-1)",
          "keys": [
            "neutral",
            "1",
          ],
          "no": "1",
        },
        "neutral.9": {
          "color": "var(--neutral-9)",
          "keys": [
            "neutral",
            "9",
          ],
          "no": "9",
        },
        "primary": {
          "color": "var(--primary-9)",
          "keys": [
            "primary",
            "9",
          ],
          "no": "9",
        },
        "primary.1": {
          "color": "var(--primary-1)",
          "keys": [
            "primary",
            "1",
          ],
          "no": "1",
        },
        "primary.9": {
          "color": "var(--primary-9)",
          "keys": [
            "primary",
            "9",
          ],
          "no": "9",
        },
        "secondary": {
          "color": "var(--secondary-9)",
          "keys": [
            "secondary",
            "9",
          ],
          "no": "9",
        },
        "secondary.1": {
          "color": "var(--secondary-1)",
          "keys": [
            "secondary",
            "1",
          ],
          "no": "1",
        },
        "secondary.9": {
          "color": "var(--secondary-9)",
          "keys": [
            "secondary",
            "9",
          ],
          "no": "9",
        },
        "success": {
          "color": "var(--success-9)",
          "keys": [
            "success",
            "9",
          ],
          "no": "9",
        },
        "success.1": {
          "color": "var(--success-1)",
          "keys": [
            "success",
            "1",
          ],
          "no": "1",
        },
        "success.9": {
          "color": "var(--success-9)",
          "keys": [
            "success",
            "9",
          ],
          "no": "9",
        },
        "warning": {
          "color": "var(--warning-9)",
          "keys": [
            "warning",
            "9",
          ],
          "no": "9",
        },
        "warning.1": {
          "color": "var(--warning-1)",
          "keys": [
            "warning",
            "1",
          ],
          "no": "1",
        },
        "warning.9": {
          "color": "var(--warning-9)",
          "keys": [
            "warning",
            "9",
          ],
          "no": "9",
        },
      }
    `)
  })

  it('generateColorAliasCssVar', () => {
    const inputs = [
      ...CUSTOM_THEME_COLOR_ALIASES.map(alias => `${alias}.9`),
      ...Object.entries(CUSTOM_THEME_TOKENS_MAP).flatMap(([scope, variants]) =>
        variants.map(variant => `${scope}.${variant}`),
      ),
      'a.b.c',
      'card-bg',
      '#fff',
    ]

    expect(
      Object.fromEntries(inputs.map(input => [input, generateColorAliasCssVar(input)])),
    ).toMatchInlineSnapshot(`
      {
        "#fff": "#fff",
        "a.b.c": "var(--a-b-c)",
        "background.base": "var(--background-base)",
        "background.elevated": "var(--background-elevated)",
        "background.inverted": "var(--background-inverted)",
        "background.muted": "var(--background-muted)",
        "border.base": "var(--border-base)",
        "border.elevated": "var(--border-elevated)",
        "border.inverted": "var(--border-inverted)",
        "card-bg": "card-bg",
        "error.9": "var(--error-9)",
        "foreground.base": "var(--foreground-base)",
        "foreground.highlighted": "var(--foreground-highlighted)",
        "foreground.inverted": "var(--foreground-inverted)",
        "foreground.muted": "var(--foreground-muted)",
        "foreground.subtle": "var(--foreground-subtle)",
        "info.9": "var(--info-9)",
        "neutral.9": "var(--neutral-9)",
        "primary.9": "var(--primary-9)",
        "secondary.9": "var(--secondary-9)",
        "success.9": "var(--success-9)",
        "warning.9": "var(--warning-9)",
      }
    `)
  })

  it('customThemeCSSGenerator', () => {
    trackedProperties.clear()

    const cases: [string, { name: string, keys: string[], alpha: number | undefined }][] = [
      ['color', { name: 'foreground-base', keys: ['foreground', 'base'], alpha: undefined }],
      ['color', { name: 'foreground-base', keys: ['foreground', 'base'], alpha: 0 }],
      ['color', { name: 'foreground-base', keys: ['foreground', 'base'], alpha: 50 }],
      ['border-color', { name: 'border-inverted', keys: ['border', 'inverted'], alpha: undefined }],
      ['shadow-color', { name: 'foreground-base', keys: ['foreground', 'base'], alpha: undefined }],
      ['shadow-color', { name: 'foreground-base', keys: ['foreground', 'base'], alpha: 40 }],
      ['color', { name: 'card', keys: ['card', 'text'], alpha: 40 }],
    ]

    expect(
      Object.fromEntries(
        cases.map(([property, data]) => [
          `${property}:${data.keys.join('-')}${data.alpha === undefined ? '' : `/${data.alpha}`}`,
          customThemeColorCSSGenerator(data, property),
        ]),
      ),
    ).toMatchInlineSnapshot(`
      {
        "border-color:border-inverted": [
          {
            "border-color": "var(--border-inverted)",
          },
          {
            "$$symbol-no-merge": true,
            "$$symbol-no-scope": true,
            "$$symbol-shortcut-no-merge": true,
            "$$symbol-variants": [Function],
            "inherits": "false",
            "initial-value": "100%",
            "syntax": ""<percentage>"",
          },
        ],
        "color:card-text/40": [
          {
            "color": "color-mix(in oklab, var(--card-text) 40%, transparent)",
          },
          {
            "$$symbol-no-merge": true,
            "$$symbol-no-scope": true,
            "$$symbol-shortcut-no-merge": true,
            "$$symbol-variants": [Function],
            "inherits": "false",
            "initial-value": "100%",
            "syntax": ""<percentage>"",
          },
          {
            "$$symbol-no-merge": true,
            "$$symbol-parent": "@supports (color: color-mix(in lab, red, red))",
            "color": "color-mix(in oklab, var(--card-text) 40%, transparent)",
          },
        ],
        "color:foreground-base": [
          {
            "color": "var(--foreground-base)",
          },
          {
            "$$symbol-no-merge": true,
            "$$symbol-no-scope": true,
            "$$symbol-shortcut-no-merge": true,
            "$$symbol-variants": [Function],
            "inherits": "false",
            "initial-value": "100%",
            "syntax": ""<percentage>"",
          },
        ],
        "color:foreground-base/0": [
          {
            "color": "color-mix(in oklab, var(--foreground-base) 0%, transparent)",
          },
          {
            "$$symbol-no-merge": true,
            "$$symbol-no-scope": true,
            "$$symbol-shortcut-no-merge": true,
            "$$symbol-variants": [Function],
            "inherits": "false",
            "initial-value": "100%",
            "syntax": ""<percentage>"",
          },
          {
            "$$symbol-no-merge": true,
            "$$symbol-parent": "@supports (color: color-mix(in lab, red, red))",
            "color": "color-mix(in oklab, var(--foreground-base) 0%, transparent)",
          },
        ],
        "color:foreground-base/50": [
          {
            "color": "color-mix(in oklab, var(--foreground-base) 50%, transparent)",
          },
          {
            "$$symbol-no-merge": true,
            "$$symbol-no-scope": true,
            "$$symbol-shortcut-no-merge": true,
            "$$symbol-variants": [Function],
            "inherits": "false",
            "initial-value": "100%",
            "syntax": ""<percentage>"",
          },
          {
            "$$symbol-no-merge": true,
            "$$symbol-parent": "@supports (color: color-mix(in lab, red, red))",
            "color": "color-mix(in oklab, var(--foreground-base) 50%, transparent)",
          },
        ],
        "shadow-color:foreground-base": [
          {
            "shadow-color": "var(--foreground-base)",
          },
          {
            "$$symbol-no-merge": true,
            "$$symbol-no-scope": true,
            "$$symbol-shortcut-no-merge": true,
            "$$symbol-variants": [Function],
            "inherits": "false",
            "initial-value": "100%",
            "syntax": ""<percentage>"",
          },
          {
            "$$symbol-no-merge": true,
            "$$symbol-parent": "@supports (color: color-mix(in lab, red, red))",
            "shadow-color": "color-mix(in oklab, var(--foreground-base) var(--un-shadow-opacity), transparent)",
          },
        ],
        "shadow-color:foreground-base/40": [
          {
            "shadow-color": "color-mix(in oklab, var(--foreground-base) 40%, transparent)",
          },
          {
            "$$symbol-no-merge": true,
            "$$symbol-no-scope": true,
            "$$symbol-shortcut-no-merge": true,
            "$$symbol-variants": [Function],
            "inherits": "false",
            "initial-value": "100%",
            "syntax": ""<percentage>"",
          },
          {
            "$$symbol-no-merge": true,
            "$$symbol-parent": "@supports (color: color-mix(in lab, red, red))",
            "shadow-color": "color-mix(in oklab, color-mix(in oklab, var(--foreground-base) 40%, transparent) var(--un-shadow-opacity), transparent)",
          },
        ],
      }
    `)
  })

  it('customThemeCssVarResolver', () => {
    trackedProperties.clear()

    const resolveColor = customThemeColorResolver('color', 'color')
    const resolveBorder = customThemeColorResolver('border-color', 'border-color')
    const cssVars = { 'card-text': 'foreground.base', 'card-border-color': 'border.base' }

    const cases = {
      'color:foreground-base': resolveColor('foreground-base', {}),
      'color:foreground-base/50': resolveColor('foreground-base/50', {}),
      'color:card': resolveColor('card', cssVars),
      'color:card/40': resolveColor('card/40', cssVars),
      'border-color:border-inverted': resolveBorder('border-inverted', {}),
      'border-color:card': resolveBorder('card', cssVars),
    }

    expect(cases).toMatchInlineSnapshot(`
      {
        "border-color:border-inverted": [
          {
            "border-color": "var(--border-inverted)",
          },
          {
            "$$symbol-no-merge": true,
            "$$symbol-no-scope": true,
            "$$symbol-shortcut-no-merge": true,
            "$$symbol-variants": [Function],
            "inherits": "false",
            "initial-value": "100%",
            "syntax": ""<percentage>"",
          },
        ],
        "border-color:card": [
          {
            "border-color": "var(--card-border-color)",
          },
          {
            "$$symbol-no-merge": true,
            "$$symbol-no-scope": true,
            "$$symbol-shortcut-no-merge": true,
            "$$symbol-variants": [Function],
            "inherits": "false",
            "initial-value": "100%",
            "syntax": ""<percentage>"",
          },
        ],
        "color:card": [
          {
            "color": "var(--card-text)",
          },
          {
            "$$symbol-no-merge": true,
            "$$symbol-no-scope": true,
            "$$symbol-shortcut-no-merge": true,
            "$$symbol-variants": [Function],
            "inherits": "false",
            "initial-value": "100%",
            "syntax": ""<percentage>"",
          },
        ],
        "color:card/40": [
          {
            "color": "color-mix(in oklab, var(--card-text) 40%, transparent)",
          },
          {
            "$$symbol-no-merge": true,
            "$$symbol-no-scope": true,
            "$$symbol-shortcut-no-merge": true,
            "$$symbol-variants": [Function],
            "inherits": "false",
            "initial-value": "100%",
            "syntax": ""<percentage>"",
          },
          {
            "$$symbol-no-merge": true,
            "$$symbol-parent": "@supports (color: color-mix(in lab, red, red))",
            "color": "color-mix(in oklab, var(--card-text) 40%, transparent)",
          },
        ],
        "color:foreground-base": [
          {
            "color": "var(--foreground-base)",
          },
          {
            "$$symbol-no-merge": true,
            "$$symbol-no-scope": true,
            "$$symbol-shortcut-no-merge": true,
            "$$symbol-variants": [Function],
            "inherits": "false",
            "initial-value": "100%",
            "syntax": ""<percentage>"",
          },
        ],
        "color:foreground-base/50": [
          {
            "color": "color-mix(in oklab, var(--foreground-base) 50%, transparent)",
          },
          {
            "$$symbol-no-merge": true,
            "$$symbol-no-scope": true,
            "$$symbol-shortcut-no-merge": true,
            "$$symbol-variants": [Function],
            "inherits": "false",
            "initial-value": "100%",
            "syntax": ""<percentage>"",
          },
          {
            "$$symbol-no-merge": true,
            "$$symbol-parent": "@supports (color: color-mix(in lab, red, red))",
            "color": "color-mix(in oklab, var(--foreground-base) 50%, transparent)",
          },
        ],
      }
    `)
  })
})
