import { describe, expect, it } from 'vitest'
import { transformColor } from '../src/transform'

describe('transform', () => {
  it('should transform color to scales', () => {
    const colors = [
      transformColor({ appearance: 'light', color: '#05f' }),
      transformColor({ appearance: 'dark', color: 'color(display-p3 0.733 0.864 0.724)' }),
      transformColor({ appearance: 'light', color: 'tomato' }),
      transformColor({ appearance: 'dark', color: 'ruby' }),
    ]

    expect(colors).toMatchSnapshot()
  })
})
