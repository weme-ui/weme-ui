import { describe, expect, it } from 'vitest'
import { resolveOptions } from '../src/options'
import { preflightColors } from '../src/preflights/colors'
import { preflightCssVars } from '../src/preflights/cssvars'
import { preflightThemes } from '../src/preflights/themes'

describe('preflights', () => {
  it('should preflight themes and colors', () => {
    const options = resolveOptions({
      accentColors: {
        ocean: '#05f',
      },
      neutralColors: {
        metal: '#86909c',
      },
      themes: [
        {
          id: 'test',
          name: 'Test',
          colors: {
            accent: '#1d2129',
          },
          tokens: {
            foreground: {
              default: '#fff',
              muted: 'color.slate.2',
            },
            dark: {
              foreground: {
                default: '#000',
                muted: 'color.neutral.12',
              },
            },
          },
        },
      ],
      cssVars: {
        card: {
          background: 'color.neutral.1',
        },
      },
    })

    const themes = preflightThemes(options).map(p => p.getCSS({} as any))
    const colors = preflightColors(options).getCSS({} as any)
    const cssVars = preflightCssVars(options).getCSS({} as any)

    expect(options.colors).haveOwnProperty('ocean')
    expect(options.colors).haveOwnProperty('metal')

    expect(options).toMatchSnapshot()
    expect(themes).toMatchSnapshot()
    expect(colors).toMatchSnapshot()
    expect(cssVars).toMatchSnapshot()
  })
})
