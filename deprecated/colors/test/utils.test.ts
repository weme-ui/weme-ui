import { describe, expect, it } from 'vitest'
import { getColorNames, getRadixColor, getRadixColorName, isRadixColorName, toColorString } from '../src/utils'

describe('utils', () => {
  it('should be radix color name', () => {
    [
      ['black', true],
      ['crimson', true],
      ['olive', true],
      ['tomato', true],
      ['bad', false],
    ].forEach(
      ([color, result]) => {
        expect(isRadixColorName(color as string)).toEqual(result)
      },
    )
  })

  it('should get color names', () => {
    expect(getColorNames()).toMatchSnapshot()
    expect(getColorNames('accent')).toMatchSnapshot()
    expect(getColorNames('neutral')).toMatchSnapshot()
  })

  it('should get radix color name', () => {
    [
      ['black', 'light', 'blackP3A'],
      ['white', 'light', 'whiteP3A'],
      ['gray', 'light', 'grayP3'],
      ['tomato', 'light', 'tomatoP3'],
      ['gray', 'dark', 'grayDarkP3'],
      ['tomato', 'dark', 'tomatoDarkP3'],
    ].forEach(
      ([name, appearance, result]) => {
        expect(getRadixColorName(name, appearance as any)).toEqual(result)
      },
    )
  })

  it('should get radix color', () => {
    expect(getRadixColor('light', 'black', true)).toMatchSnapshot()
  })

  it('should transform color to string', () => {
    expect(toColorString('#06f')).toMatchSnapshot()
    expect(toColorString('color(display-p3 0.733 0.864 0.724)')).toMatchSnapshot()
    expect(toColorString('oklch(0% 0 0)')).toMatchSnapshot()
    expect(toColorString('white')).toMatchSnapshot()
  })
})
