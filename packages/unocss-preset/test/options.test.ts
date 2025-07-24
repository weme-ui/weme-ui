import { describe, expect, it } from 'vitest'
import { resolveOptions } from '../src/options'

describe('options', () => {
  it('should options resolved', () => {
    expect(resolveOptions({})).toMatchSnapshot()

    expect(resolveOptions({
      themes: [
        {
          id: 'light',
          name: 'Light',
        },
      ],
    })).toMatchSnapshot()

    expect(resolveOptions({
      accentColors: {
        ocean: '#05f',
      },
    })).toHaveProperty('accentColors.ocean', expect.any(Array))
  })
})
