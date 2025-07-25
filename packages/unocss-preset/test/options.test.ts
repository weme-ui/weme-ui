import { describe, expect, it } from 'vitest'
import { resolveOptions } from '../src/options'

describe('options', () => {
  it('should options resolved', () => {
    expect(resolveOptions({
      themes: [
        {
          id: 'light',
          name: 'Light',
        },
      ],
    })).toMatchSnapshot()
  })

  it('should custom accent colors resolved', () => {
    expect(resolveOptions({
      accentColors: {
        ocean: '#05f',
      },
    })).toHaveProperty('accentColors.ocean', expect.any(Array))
  })

  it('should options css variables resolved', () => {
    const result = resolveOptions({
      cssVars: {
        'font-size': '1rem',
      },
    })

    expect(result).toMatchSnapshot()
  })
})
