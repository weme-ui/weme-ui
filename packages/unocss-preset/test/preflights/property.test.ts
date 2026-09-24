import { beforeEach, describe, expect, it } from 'vitest'
import { property } from '~/preflights/property'
import { trackedProperties } from '~/utils/track'
import { createPreflightContext, resetTracking } from './_utils'

const defaultParent = '@supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b))))'

describe('property preflight', () => {
  beforeEach(resetTracking)

  it('is omitted when property preflights are disabled', () => {
    expect(property({ preflights: { property: false } })).toBeUndefined()
  })

  it('emits nothing until properties are tracked', () => {
    const preflight = property({})

    expect(preflight?.layer).toBe('properties')
    expect(preflight?.getCSS(createPreflightContext())).toBeUndefined()
  })

  it('writes tracked properties with the variable prefix and default supports query', () => {
    trackedProperties.set('--un-blur', 'initial')
    trackedProperties.set('--un-ring-offset-width', '0px')

    const css = property({ variablePrefix: 'weme-' })?.getCSS(createPreflightContext())

    expect(css).toBe(`${defaultParent}{*, ::before, ::after, ::backdrop{--weme-blur:initial;--weme-ring-offset-width:0px;}}`)
  })

  it('supports a custom parent, selector, or no parent', () => {
    trackedProperties.set('--un-ease', 'initial')

    expect(property({
      preflights: {
        property: {
          parent: '@layer utilities',
          selector: ':root',
        },
      },
    })?.getCSS(createPreflightContext())).toBe('@layer utilities{:root{--un-ease:initial;}}')

    expect(property({
      preflights: {
        property: { parent: false },
      },
    })?.getCSS(createPreflightContext())).toBe('*, ::before, ::after, ::backdrop{--un-ease:initial;}')
  })
})
