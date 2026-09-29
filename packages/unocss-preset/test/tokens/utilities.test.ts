import type { Theme } from '~/theme'
import { symbols } from '@unocss/core'
import { beforeEach, describe, expect, it } from 'vitest'
import { colors } from '~/theme/colors'
import {
  isRawColor,
  parseCustomThemeColorAlias,
  parseCustomThemeToken,
  resolveAliasCssVar,
  resolveCustomThemeCssVars,
  resolveCustomThemeToken,
} from '~/tokens'
import { trackedColorAliases, trackedCssVars, trackedProperties, trackedTheme } from '~/utils/track'

const theme = { colors: colors() } satisfies Theme

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

describe('parseCustomThemeToken', () => {
  beforeEach(() => {
    trackedCssVars.clear()
  })

  describe('returns undefined', () => {
    it('rejects a css variable before any token match', () => {
      expect(parseCustomThemeToken('color', 'var(--foreground)')).toBeUndefined()
      expect(parseCustomThemeToken('color', 'var(--card-text)')).toBeUndefined()
      expect(parseCustomThemeToken('color', 'var(--foreground)/50')).toBeUndefined()
    })

    it('rejects an alpha outside 0 to 100, including on a complete token', () => {
      expect(parseCustomThemeToken('color', 'primary/foo')).toBeUndefined()
      expect(parseCustomThemeToken('color', 'primary/101')).toBeUndefined()
      expect(parseCustomThemeToken('color', 'primary/-1')).toBeUndefined()
      expect(parseCustomThemeToken('color', 'primary/')).toBeUndefined()
      expect(parseCustomThemeToken('color', 'foreground-base/101')).toBeUndefined()
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
        expect(parseCustomThemeToken('color', body)).toEqual({
          name: body,
          keys: [scope, variant],
        })
      }
    })

    it('ignores property, an explicit token, and a tracked suffix', () => {
      trackedCssVars.add('foreground-base-text')

      expect(parseCustomThemeToken('width', 'foreground-base', 'border')).toEqual({
        name: 'foreground-base',
        keys: ['foreground', 'base'],
      })
    })

    it('keeps a valid alpha and drops it from the name', () => {
      expect(parseCustomThemeToken('color', 'foreground-base/0')).toEqual({
        name: 'foreground-base',
        keys: ['foreground', 'base'],
        alpha: 0,
      })
      expect(parseCustomThemeToken('color', 'foreground-base/50')).toEqual({
        name: 'foreground-base',
        keys: ['foreground', 'base'],
        alpha: 50,
      })
      expect(parseCustomThemeToken('color', 'foreground-highlighted/100')).toEqual({
        name: 'foreground-highlighted',
        keys: ['foreground', 'highlighted'],
        alpha: 100,
      })
    })
  })

  describe('explicit token', () => {
    it('pairs each foreground variant with the given token', () => {
      for (const name of ['highlighted', 'base', 'subtle', 'muted', 'inverted'] as const) {
        expect(parseCustomThemeToken('outline-color', name, 'foreground')).toEqual({
          name,
          keys: ['foreground', name],
        })
      }
    })

    it('pairs each background variant with the given token', () => {
      for (const name of ['base', 'muted', 'elevated', 'inverted'] as const) {
        expect(parseCustomThemeToken('color', name, 'background')).toEqual({
          name,
          keys: ['background', name],
        })
      }
    })

    it('pairs each border variant with the given token', () => {
      for (const name of ['base', 'elevated', 'inverted'] as const) {
        expect(parseCustomThemeToken('background-color', name, 'border')).toEqual({
          name,
          keys: ['border', name],
        })
      }
    })

    it('prefers the explicit token over the property', () => {
      expect(parseCustomThemeToken('background-color', 'base', 'foreground')).toEqual({
        name: 'base',
        keys: ['foreground', 'base'],
      })
    })

    it('keeps the explicit token when a css var is also tracked', () => {
      trackedCssVars.add('base-text')

      expect(parseCustomThemeToken('color', 'base', 'foreground')).toEqual({
        name: 'base',
        keys: ['foreground', 'base'],
      })
    })

    it('does not switch to another theme scope when the variant is absent', () => {
      expect(parseCustomThemeToken('color', 'highlighted', 'background')).toEqual({
        name: 'highlighted',
        keys: [],
      })
      expect(parseCustomThemeToken('background-color', 'elevated', 'foreground')).toEqual({
        name: 'elevated',
        keys: [],
      })
      expect(parseCustomThemeToken('color', 'base', 'nope')).toEqual({
        name: 'base',
        keys: [],
      })
    })

    it('still matches a tracked suffix after the explicit token misses', () => {
      trackedCssVars.add('elevated-background')

      expect(parseCustomThemeToken('background-color', 'elevated', 'foreground')).toEqual({
        name: 'elevated',
        keys: ['elevated', 'background'],
      })
    })

    it('keeps a valid alpha on the bare variant', () => {
      expect(parseCustomThemeToken('color', 'base/40', 'foreground')).toEqual({
        name: 'base',
        keys: ['foreground', 'base'],
        alpha: 40,
      })
    })
  })

  describe('property infers a theme scope', () => {
    it('maps background-color variants through the background suffix', () => {
      for (const name of ['base', 'muted', 'elevated', 'inverted'] as const) {
        expect(parseCustomThemeToken('background-color', name)).toEqual({
          name,
          keys: ['background', name],
        })
      }
    })

    it('keeps that background token ahead of later tracked suffixes', () => {
      trackedCssVars.add('base-bg')
      trackedCssVars.add('base-color')

      expect(parseCustomThemeToken('background-color', 'base')).toEqual({
        name: 'base',
        keys: ['background', 'base'],
      })
    })

    it('maps border-color variants through border when border-color is not tracked', () => {
      for (const name of ['base', 'elevated', 'inverted'] as const) {
        expect(parseCustomThemeToken('border-color', name)).toEqual({
          name,
          keys: ['border', name],
        })
      }
    })

    it('prefers a tracked border-color suffix over the border theme token', () => {
      trackedCssVars.add('base-border-color')

      expect(parseCustomThemeToken('border-color', 'base')).toEqual({
        name: 'base',
        keys: ['base', 'border-color'],
      })
    })

    it('maps fill variants through background when fill is not tracked', () => {
      for (const name of ['base', 'muted', 'elevated', 'inverted'] as const) {
        expect(parseCustomThemeToken('fill', name)).toEqual({
          name,
          keys: ['background', name],
        })
      }
    })

    it('prefers a tracked fill suffix over the background theme token', () => {
      trackedCssVars.add('base-fill')

      expect(parseCustomThemeToken('fill', 'base')).toEqual({
        name: 'base',
        keys: ['base', 'fill'],
      })
    })

    it('does not infer foreground from color', () => {
      expect(parseCustomThemeToken('color', 'base')).toEqual({
        name: 'base',
        keys: [],
      })
      expect(parseCustomThemeToken('color', 'highlighted')).toEqual({
        name: 'highlighted',
        keys: [],
      })
    })

    it('leaves a variant empty when it is outside the inferred scope', () => {
      expect(parseCustomThemeToken('background-color', 'highlighted')).toEqual({
        name: 'highlighted',
        keys: [],
      })
      expect(parseCustomThemeToken('border-color', 'muted')).toEqual({
        name: 'muted',
        keys: [],
      })
      expect(parseCustomThemeToken('fill', 'highlighted')).toEqual({
        name: 'highlighted',
        keys: [],
      })
    })
  })

  describe('tracked css var suffix', () => {
    it('prefers text over color', () => {
      trackedCssVars.add('card-color')
      trackedCssVars.add('card-text')

      expect(parseCustomThemeToken('color', 'card')).toEqual({
        name: 'card',
        keys: ['card', 'text'],
      })
    })

    it('uses color when text is absent', () => {
      trackedCssVars.add('card-color')

      expect(parseCustomThemeToken('color', 'card')).toEqual({
        name: 'card',
        keys: ['card', 'color'],
      })
    })

    it('prefers background, then bg, then color', () => {
      trackedCssVars.add('card-color')
      trackedCssVars.add('card-bg')
      trackedCssVars.add('card-background')

      expect(parseCustomThemeToken('background-color', 'card')).toEqual({
        name: 'card',
        keys: ['card', 'background'],
      })

      trackedCssVars.delete('card-background')

      expect(parseCustomThemeToken('background-color', 'card')).toEqual({
        name: 'card',
        keys: ['card', 'bg'],
      })

      trackedCssVars.delete('card-bg')

      expect(parseCustomThemeToken('background-color', 'card')).toEqual({
        name: 'card',
        keys: ['card', 'color'],
      })
    })

    it('prefers border-color over border', () => {
      trackedCssVars.add('card-border')
      trackedCssVars.add('card-border-color')

      expect(parseCustomThemeToken('border-color', 'card')).toEqual({
        name: 'card',
        keys: ['card', 'border-color'],
      })

      trackedCssVars.delete('card-border-color')

      expect(parseCustomThemeToken('border-color', 'card')).toEqual({
        name: 'card',
        keys: ['card', 'border'],
      })
    })

    it('prefers fill, then background, then bg, then color', () => {
      trackedCssVars.add('card-color')
      trackedCssVars.add('card-bg')
      trackedCssVars.add('card-background')
      trackedCssVars.add('card-fill')

      expect(parseCustomThemeToken('fill', 'card')).toEqual({
        name: 'card',
        keys: ['card', 'fill'],
      })

      trackedCssVars.delete('card-fill')

      expect(parseCustomThemeToken('fill', 'card')).toEqual({
        name: 'card',
        keys: ['card', 'background'],
      })

      trackedCssVars.delete('card-background')

      expect(parseCustomThemeToken('fill', 'card')).toEqual({
        name: 'card',
        keys: ['card', 'bg'],
      })

      trackedCssVars.delete('card-bg')

      expect(parseCustomThemeToken('fill', 'card')).toEqual({
        name: 'card',
        keys: ['card', 'color'],
      })
    })

    it('matches the only border-width suffix', () => {
      trackedCssVars.add('card-border-width')

      expect(parseCustomThemeToken('border-width', 'card')).toEqual({
        name: 'card',
        keys: ['card', 'border-width'],
      })
    })

    it('prefers width, then w, then size', () => {
      trackedCssVars.add('card-size')

      expect(parseCustomThemeToken('width', 'card')).toEqual({
        name: 'card',
        keys: ['card', 'size'],
      })

      trackedCssVars.add('card-w')

      expect(parseCustomThemeToken('width', 'card')).toEqual({
        name: 'card',
        keys: ['card', 'w'],
      })

      trackedCssVars.add('card-width')

      expect(parseCustomThemeToken('width', 'card')).toEqual({
        name: 'card',
        keys: ['card', 'width'],
      })
    })

    it('prefers height, then h, then size', () => {
      trackedCssVars.add('card-size')

      expect(parseCustomThemeToken('height', 'card')).toEqual({
        name: 'card',
        keys: ['card', 'size'],
      })

      trackedCssVars.add('card-h')

      expect(parseCustomThemeToken('height', 'card')).toEqual({
        name: 'card',
        keys: ['card', 'h'],
      })

      trackedCssVars.add('card-height')

      expect(parseCustomThemeToken('height', 'card')).toEqual({
        name: 'card',
        keys: ['card', 'height'],
      })
    })

    it('prefers padding, then p, then space', () => {
      trackedCssVars.add('card-space')

      expect(parseCustomThemeToken('padding', 'card')).toEqual({
        name: 'card',
        keys: ['card', 'space'],
      })

      trackedCssVars.add('card-p')

      expect(parseCustomThemeToken('padding', 'card')).toEqual({
        name: 'card',
        keys: ['card', 'p'],
      })

      trackedCssVars.add('card-padding')

      expect(parseCustomThemeToken('padding', 'card')).toEqual({
        name: 'card',
        keys: ['card', 'padding'],
      })
    })

    it('prefers margin, then m, then space', () => {
      trackedCssVars.add('card-space')

      expect(parseCustomThemeToken('margin', 'card')).toEqual({
        name: 'card',
        keys: ['card', 'space'],
      })

      trackedCssVars.add('card-m')

      expect(parseCustomThemeToken('margin', 'card')).toEqual({
        name: 'card',
        keys: ['card', 'm'],
      })

      trackedCssVars.add('card-margin')

      expect(parseCustomThemeToken('margin', 'card')).toEqual({
        name: 'card',
        keys: ['card', 'margin'],
      })
    })

    it('keeps a valid alpha on the tracked name', () => {
      trackedCssVars.add('card-text')

      expect(parseCustomThemeToken('color', 'card/50')).toEqual({
        name: 'card',
        keys: ['card', 'text'],
        alpha: 50,
      })
    })

    it('returns an empty key list for an unknown property', () => {
      trackedCssVars.add('card-text')

      expect(parseCustomThemeToken('outline-color', 'card')).toEqual({
        name: 'card',
        keys: [],
      })
      expect(parseCustomThemeToken('outline-color', 'base')).toEqual({
        name: 'base',
        keys: [],
      })
    })
  })

  describe('unmatched name', () => {
    it('keeps names that are not theme tokens', () => {
      expect(parseCustomThemeToken('color', 'foreground')).toEqual({
        name: 'foreground',
        keys: [],
      })
      expect(parseCustomThemeToken('color', 'card-title')).toEqual({
        name: 'card-title',
        keys: [],
      })
      expect(parseCustomThemeToken('color', 'primary-9')).toEqual({
        name: 'primary-9',
        keys: [],
      })
      expect(parseCustomThemeToken('color', 'foreground-nope')).toEqual({
        name: 'foreground-nope',
        keys: [],
      })
    })

    it('splits a valid alpha without inventing keys', () => {
      expect(parseCustomThemeToken('color', 'primary/0')).toEqual({
        name: 'primary',
        keys: [],
        alpha: 0,
      })
      expect(parseCustomThemeToken('color', 'primary/50')).toEqual({
        name: 'primary',
        keys: [],
        alpha: 50,
      })
      expect(parseCustomThemeToken('color', 'primary/100')).toEqual({
        name: 'primary',
        keys: [],
        alpha: 100,
      })
      expect(parseCustomThemeToken('color', 'primary-9/50')).toEqual({
        name: 'primary-9',
        keys: [],
        alpha: 50,
      })
    })
  })
})

describe('resolveCustomThemeToken', () => {
  beforeEach(() => {
    trackedCssVars.clear()
    trackedProperties.clear()
  })

  it('returns undefined when the body cannot be parsed', () => {
    expect(resolveCustomThemeToken('color', 'text', 'var(--foreground)')).toBeUndefined()
    expect(resolveCustomThemeToken('color', 'text', 'var(--foreground)/50')).toBeUndefined()
    expect(resolveCustomThemeToken('color', 'text', 'primary/foo')).toBeUndefined()
    expect(resolveCustomThemeToken('color', 'text', 'primary/101')).toBeUndefined()
    expect(resolveCustomThemeToken('color', 'text', 'foreground-base/101')).toBeUndefined()
  })

  it('emits a theme variable and an opacity property for a complete token', () => {
    const result = resolveCustomThemeToken('border-color', 'border', 'foreground-base')

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
    const result = resolveCustomThemeToken('color', 'text', 'foreground-base/50')

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
    const result = resolveCustomThemeToken('color', 'text', 'foreground-highlighted/0')

    expect(result?.[0]).toEqual({
      color: 'color-mix(in oklab, var(--foreground-highlighted) 0%, transparent)',
    })
    expect(result).toHaveLength(3)
  })

  it('resolves an explicit token and a property-inferred token', () => {
    expect(resolveCustomThemeToken('outline-color', 'text', 'base', 'foreground')?.[0]).toEqual({
      'outline-color': 'var(--foreground-base)',
    })
    expect(resolveCustomThemeToken('background-color', 'bg', 'elevated')?.[0]).toEqual({
      'background-color': 'var(--background-elevated)',
    })
    expect(resolveCustomThemeToken('border-color', 'border', 'inverted')?.[0]).toEqual({
      'border-color': 'var(--border-inverted)',
    })
  })

  it('joins a tracked suffix into the variable name', () => {
    trackedCssVars.add('card-text')

    const result = resolveCustomThemeToken('color', 'text', 'card/40')

    expect(result?.[0]).toEqual({
      color: 'color-mix(in oklab, var(--card-text) 40%, transparent)',
    })
    expect(result).toHaveLength(3)
  })

  it('returns undefined when the name does not match', () => {
    expect(resolveCustomThemeToken('color', 'text', 'primary')).toBeUndefined()
    expect(trackedProperties.has('--un-text-opacity')).toBe(false)
  })

  it('adds a color-mix fallback for shadow-like variables without alpha', () => {
    for (const varName of ['shadow', 'inset-shadow', 'text-shadow', 'drop-shadow'] as const) {
      const result = resolveCustomThemeToken('color', varName, 'foreground-base')

      expect(result?.[0]).toEqual({ color: 'var(--foreground-base)' })
      expect(result).toHaveLength(3)
      expect(result?.[2]).toMatchObject({
        [symbols.parent]: '@supports (color: color-mix(in lab, red, red))',
        [symbols.noMerge]: true,
        color: `color-mix(in oklab, var(--foreground-base) var(--un-${varName}-opacity), transparent)`,
      })
      expect(trackedProperties.get(`--un-${varName}-opacity`)).toBe('100%')
    }
  })

  it('nests a positive alpha inside the shadow fallback', () => {
    const result = resolveCustomThemeToken('--un-shadow-color', 'shadow', 'foreground-base/40')

    expect(result?.[0]).toEqual({
      '--un-shadow-color': 'color-mix(in oklab, var(--foreground-base) 40%, transparent)',
    })
    expect(result?.[2]).toMatchObject({
      '--un-shadow-color': 'color-mix(in oklab, color-mix(in oklab, var(--foreground-base) 40%, transparent) var(--un-shadow-opacity), transparent)',
    })
  })
})

describe('parseCustomThemeColorAlias', () => {
  beforeEach(() => {
    trackedColorAliases.clear()
  })

  it('defaults a bare alias to step 9 and tracks it', () => {
    const keys = ['primary']

    expect(parseCustomThemeColorAlias(keys)).toEqual({
      color: 'var(--primary-9)',
      no: '9',
      keys: ['primary', '9'],
    })
    expect(keys).toEqual(['primary', '9'])
    expect([...trackedColorAliases]).toEqual(['primary:9'])
  })

  it('keeps an explicit step and ignores unknown aliases', () => {
    expect(parseCustomThemeColorAlias(['error', '1'])).toEqual({
      color: 'var(--error-1)',
      no: '1',
      keys: ['error', '1'],
    })
    expect(parseCustomThemeColorAlias(['foreground', 'base'])).toBeUndefined()
    expect([...trackedColorAliases]).toEqual(['error:1'])
  })
})

describe('resolveAliasCssVar', () => {
  it('turns dotted aliases into css variables', () => {
    expect(resolveAliasCssVar('primary.1')).toBe('var(--primary-1)')
    expect(resolveAliasCssVar('foreground.base')).toBe('var(--foreground-base)')
    expect(resolveAliasCssVar('a.b.c')).toBe('var(--a-b-c)')
    expect(resolveAliasCssVar('card-bg')).toBe('var(--card-bg)')
  })
})

describe('resolveCustomThemeCssVars', () => {
  beforeEach(() => {
    trackedTheme.clear()
    trackedColorAliases.clear()
  })

  it('resolves theme colors, aliases and token references', () => {
    expect(resolveCustomThemeCssVars({
      brand: 'blue.9',
      card: {
        'background': 'primary.1',
        'error-color': 'red.9',
        'text': 'foreground.base',
      },
      label: 'foreground.base',
    }, theme)).toEqual({
      '--brand': 'var(--blue-9)',
      '--card-background': 'var(--primary-1)',
      '--card-error-color': 'var(--red-9)',
      '--card-text': 'var(--foreground-base)',
      '--label': 'var(--foreground-base)',
    })

    expect([...trackedTheme]).toEqual([
      'colors:blue-9',
      'colors:primary-1',
      'colors:red-9',
    ])
    expect([...trackedColorAliases]).toEqual(['primary:1'])
  })
})
