import { describe, expect, it } from 'vitest'
import { generateColor, generateGrayColor } from '../src/colors/generator'

describe('generator', () => {
  it('should generate color', () => {
    expect(generateColor('#05f', 'light')).toMatchSnapshot()
    expect(generateColor('#05f', 'dark')).toMatchSnapshot()
  })

  it('should generate gray color', () => {
    expect(generateGrayColor('#888', 'light')).toMatchSnapshot()
    expect(generateGrayColor('#888', 'dark')).toMatchSnapshot()
  })
})
