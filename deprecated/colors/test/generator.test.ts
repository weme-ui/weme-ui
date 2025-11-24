import { describe, expect, it } from 'vitest'
import { getColors } from '../src/colors'
import { generateColor } from '../src/generator'

describe('generator', () => {
  it('should get color objects', () => {
    expect(generateColor('#05f', getColors('light'), '#fff')).toMatchSnapshot()
    expect(generateColor('gray', getColors('dark', true), '#111')).toMatchSnapshot()
  })
})
