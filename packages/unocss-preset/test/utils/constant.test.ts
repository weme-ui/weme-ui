import { describe, expect, it } from 'vitest'
import { CONTROL_NO_NEGATIVE, PRESET_NAME, SpecialColorKey } from '~/utils/constant'

describe('constant', () => {
  it('exposes the preset name', () => {
    expect(PRESET_NAME).toBe('@weme-ui/unocss-preset')
  })

  it('exposes the no-negative control token', () => {
    expect(CONTROL_NO_NEGATIVE).toBe('$$mini-no-negative')
  })

  it('maps special color keys to css keywords', () => {
    expect(SpecialColorKey).toEqual({
      transparent: 'transparent',
      current: 'currentColor',
      inherit: 'inherit',
    })
  })
})
