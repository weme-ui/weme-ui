import { describe, expect, it } from 'vitest'
import {
  variantCssLayer,
  variantImplicitGroup,
  variantInternalLayer,
  variantScope,
  variantSelector,
  variantStartingStyle,
  variantStickyHover,
  variantTheme,
  variantVariables,
} from '~/variants'
import { applyHandle, createContext, matchVariant } from './_utils'

describe('selector and layer variants', () => {
  it('matches arbitrary selectors and css layers', () => {
    expect(matchVariant(variantSelector, 'selector-[.foo_&]:flex').selector('.x')).toBe('.foo &')
    expect(applyHandle(matchVariant(variantCssLayer, 'layer-components:flex'))).toMatchObject({
      parent: '@layer components',
    })
    expect(matchVariant(variantInternalLayer, 'uno-layer-theme:flex')).toMatchObject({
      matcher: 'flex',
      layer: 'theme',
    })
  })
})

describe('scope and variables variants', () => {
  it('matches selector scope and arbitrary parent/selector variants', () => {
    expect(matchVariant(variantScope, 'scope-[.card]:flex').selector('.x')).toBe('.card $$ .x')
    expect(applyHandle(matchVariant(variantVariables, '[@media_(min-width:1px)]:flex'))).toMatchObject({
      parent: '@media (min-width:1px)',
    })
    expect(applyHandle(matchVariant(variantVariables, '[&>*]:flex'))).toMatchObject({
      selector: '.x>*',
    })
  })
})

describe('starting, theme, hover and implicit group variants', () => {
  it('matches starting style', () => {
    expect(applyHandle(matchVariant(variantStartingStyle, 'starting:flex'))).toMatchObject({
      parent: '@starting-style',
    })
  })

  it('transforms theme() calls in entries', () => {
    const result = matchVariant(variantTheme, 'theme(spacing.md)', createContext())
    const out = applyHandle(result, {
      entries: [['margin', 'theme(spacing.md)']],
    })

    expect(out.entries).toEqual([['margin', 'calc(0.75rem * var(--scaling))']])
  })

  it('matches sticky hover and implicit groups', () => {
    expect(applyHandle(matchVariant(variantStickyHover[0], '@hover:flex'))).toMatchObject({
      parent: '@media (hover: hover) and (pointer: fine)',
      selector: '.x:hover',
    })
    expect(applyHandle(matchVariant(variantImplicitGroup, 'in-[.menu]:flex'))).toMatchObject({
      parent: '.x',
      selector: ':where(*:is(.menu)) &',
    })
  })
})
