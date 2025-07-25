import { describe, expect, it } from 'vitest'
import { preflightThemes } from '../src/preflights/themes'
import { resolveThemes } from '../src/themes'

describe('themes', () => {
  it('should resolved themes', () => {
    const themes = resolveThemes(
      [
        {
          id: 'light',
          name: 'Light',
        },
      ],
      { light: '#fff', dark: '#111' },
      'test-',
    )

    expect(themes).toMatchSnapshot()
  })

  it('should create theme css variables', () => {
    const themes = resolveThemes(
      [
        {
          id: 'light',
          name: 'Light',
        },
      ],
      { light: '#fff', dark: '#111' },
      'test-',
    )

    expect(preflightThemes('test-', themes)[0].getCSS({} as any)).toMatchSnapshot()
  })
})
