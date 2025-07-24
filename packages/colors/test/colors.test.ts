import { describe, expect, it } from 'vitest'
import { getColors } from '../src/colors'

describe('colors', () => {
  it('should get color objects', () => {
    expect(getColors('light')).toMatchSnapshot()
  })
})
