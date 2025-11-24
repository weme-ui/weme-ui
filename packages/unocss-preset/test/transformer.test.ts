import { describe, expect, it } from 'vitest'
import { transformColor } from '../src/colors/transformer'

describe('transformer', () => {
  it('should transform color', () => {
    expect(transformColor('#05f', 'light')).toMatchSnapshot()
    expect(transformColor('#05f', 'dark')).toMatchSnapshot()
    expect(transformColor('#ccc', 'light', true)).toMatchSnapshot()
    expect(transformColor('#ccc', 'dark', true)).toMatchSnapshot()

    expect(transformColor('gray', 'light')).toMatchSnapshot()
    expect(transformColor('slate', 'dark')).toMatchSnapshot()
  })
})
