import { describe, expect, it } from 'vitest'
import { variantChildren } from '~/variants/children'
import { variantCombinators, variantSvgCombinators } from '~/variants/combinators'
import { variantColorsMediaOrClass, variantColorsScheme } from '~/variants/dark'
import { variantLanguageDirections } from '~/variants/directions'
import { variantInert } from '~/variants/inert'
import { applyHandle, matchVariant } from './_utils'

describe('children variants', () => {
  it('matches direct and deep children', () => {
    expect(applyHandle(matchVariant(variantChildren[0], '*:flex'))).toMatchObject({ selector: '.x > *' })
    expect(applyHandle(matchVariant(variantChildren[1], '**:flex'))).toMatchObject({ selector: '.x *' })
  })
})

describe('combinator variants', () => {
  it('matches default and bracketed combinators', () => {
    expect(matchVariant(variantCombinators[0], 'all:flex').selector('.x')).toBe('.x *')
    expect(matchVariant(variantCombinators[1], 'children-[.item]:flex').selector('.x')).toBe('.x>.item')
    expect(matchVariant(variantCombinators[4], 'siblings-[button]:flex').selector('.x')).toBe('.x~button')
  })

  it('matches svg combinator', () => {
    expect(applyHandle(matchVariant(variantSvgCombinators[0], 'svg:flex'))).toMatchObject({ selector: '.x svg' })
  })
})

describe('dark and direction variants', () => {
  it('uses class selectors by default and media selectors in media mode', () => {
    expect(applyHandle(matchVariant(variantColorsMediaOrClass({ dark: 'class' })[0], 'dark:flex'))).toMatchObject({
      prefix: '.dark $$ ',
    })
    expect(applyHandle(matchVariant(variantColorsMediaOrClass({ dark: 'media' })[0], 'dark:flex'))).toMatchObject({
      parent: '@media (prefers-color-scheme: dark)',
    })
  })

  it('matches explicit color scheme and direction variants', () => {
    expect(applyHandle(matchVariant(variantColorsScheme[0], '.dark:flex'))).toMatchObject({ prefix: '.dark $$ ' })
    expect(applyHandle(matchVariant(variantLanguageDirections[0], 'rtl:flex'))).toMatchObject({ prefix: '[dir="rtl"] $$ ' })
  })
})

describe('variantInert', () => {
  it('matches inert variant', () => {
    expect(applyHandle(matchVariant(variantInert, 'inert:flex'))).toMatchObject({
      parent: '.x',
      selector: '&:is([inert],[inert] *)',
    })
  })
})
