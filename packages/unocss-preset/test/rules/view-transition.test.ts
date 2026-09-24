import { describe, expect, it } from 'vitest'
import { viewTransition } from '~/rules/view-transition'
import { matchRule } from './_utils'

describe('view transition rules', () => {
  it('resolves view transition names', () => {
    expect(matchRule(viewTransition, 'view-transition-main')).toEqual({ 'view-transition-name': 'main' })
    expect(matchRule(viewTransition, 'view-transition-hero-image')).toEqual({ 'view-transition-name': 'hero-image' })
    expect(matchRule(viewTransition, 'view-transition-')).toBeUndefined()
    expect(matchRule(viewTransition, 'view-transition-name')).toEqual({ 'view-transition-name': 'name' })
  })
})
