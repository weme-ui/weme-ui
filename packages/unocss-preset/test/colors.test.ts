import { describe, expect, it } from 'vitest'
import { resolveColors } from '../src/colors'

describe('colors', () => {
  it('should resolved custom colors', () => {
    expect(
      resolveColors(
        {
          ocean: '#05f',
        },
        { light: '#fff', dark: '#111' },
      ),
    ).toHaveProperty('oceanDark', expect.any(Array))
  })

  it('should resolved default colors', () => {
    expect(
      resolveColors(
        {},
        { light: '#fff', dark: '#111' },
      ),
    ).toMatchSnapshot()
  })
})
