import { describe, expect, it } from 'vitest'
import { container, containerParent, containerShortcuts } from '~/rules/container'
import { createRuleContext, expectUtilities, matchRule } from './_utils'

describe('container rules', () => {
  it('resolves container parent type and name', () => {
    expectUtilities(containerParent, {
      '@container': { 'container-type': 'inline-size' },
      '@container/sidebar': { 'container-type': 'inline-size', 'container-name': 'sidebar' },
      '@container-normal': { 'container-type': 'normal' },
      '@container/main-normal': { 'container-type': 'normal', 'container-name': 'main' },
    })
  })

  it('resolves the internal container rule from theme and variants', () => {
    expect(matchRule(container, '__container')).toEqual({ width: '100%' })

    const centered = matchRule(container, '__container', {
      theme: {
        ...createRuleContext().theme,
        containers: { center: true, padding: '1rem', maxWidth: { mobile: '520px' } },
      },
    })
    expect(centered).toMatchObject({
      'width': '100%',
      'margin-left': 'auto',
      'margin-right': 'auto',
      'padding-left': '1rem',
      'padding-right': '1rem',
    })

    const queried = matchRule(container, '__container', {
      theme: {
        ...createRuleContext().theme,
        containers: { padding: { DEFAULT: '1rem', mobile: '2rem' }, maxWidth: { mobile: '40rem' } },
      },
      variantHandlers: [{
        handle: (_input: unknown, next: (value: unknown) => unknown) => next({ parent: '@media (min-width: 520px)' }),
      }],
    })
    expect(queried).toEqual({
      'max-width': '40rem',
      'padding-left': '2rem',
      'padding-right': '2rem',
    })
  })

  it('expands container shortcuts across breakpoints', () => {
    const [, body] = containerShortcuts[0]
    const context = createRuleContext()
    const expand = body as (match: RegExpMatchArray, ctx: ReturnType<typeof createRuleContext>) => string[] | undefined

    expect(expand(['container'] as unknown as RegExpMatchArray, context)).toEqual([
      '__container',
      'mobile:__container',
      'tablet:__container',
      'laptop:__container',
      'desktop:__container',
      'wide:__container',
    ])
    expect(expand(['tablet:container', 'tablet'] as unknown as RegExpMatchArray, context)).toEqual([
      'tablet:__container',
      'laptop:__container',
      'desktop:__container',
      'wide:__container',
    ])
    expect(expand(['missing:container', 'missing'] as unknown as RegExpMatchArray, context)).toBeUndefined()
  })
})
