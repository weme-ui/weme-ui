import { beforeEach, describe, expect, it } from 'vitest'
import { reset } from '~/preflights/reset'
import { trackedTheme } from '~/utils/track'
import { createPreflightContext, resetTracking } from './_utils'

describe('reset preflight', () => {
  beforeEach(resetTracking)

  it('is omitted when reset is disabled', () => {
    expect(reset({ preflights: { reset: false } })).toBeUndefined()
  })

  it('emits compressed base reset css and tracks font tokens', () => {
    const preflight = reset({})

    expect(preflight?.layer).toBe('base')

    const css = preflight?.getCSS(createPreflightContext())

    expect(css).toContain('box-sizing: border-box;')
    expect(css).toContain('[hidden]:where(:not([hidden~=\'until-found\']))')
    expect(css).not.toContain('Prevent padding and border')
    expect(trackedTheme).toEqual(new Set([
      'font:sans',
      'font:mono',
      'default:font-family',
      'default:monoFont-family',
    ]))
  })

  it('keeps comments in development', () => {
    const css = reset({})?.getCSS(createPreflightContext({ envMode: 'dev' }))

    expect(css).toContain('Prevent padding and border')
    expect(css).toContain('box-sizing: border-box;')
  })
})
