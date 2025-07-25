import { describe, expect, it } from 'vitest'
import { preflightCssVars } from '../src/preflights/cssvars'

describe('css variables', () => {
  it('should preflight css variables', () => {
    const cssVars = preflightCssVars(
      'test-',
      {
        background: {
          default: '#fff',
          dimmed: '#eee',
        },
        panel: {
          default: '#eee',
          background: '#eee',
          foreground: '#333',
        },
      },
    )

    expect(cssVars.getCSS({} as any)).toMatchSnapshot()
  })
})
