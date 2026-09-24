import { describe, expect, it } from 'vitest'
import { blur } from '~/theme/filters'

describe('blur', () => {
  it('exposes the wind4-compatible blur scale', () => {
    expect(blur).toEqual({
      'DEFAULT': '8px',
      'xs': '4px',
      'sm': '8px',
      'md': '12px',
      'lg': '16px',
      'xl': '24px',
      '2xl': '40px',
      '3xl': '64px',
    })
  })
})
