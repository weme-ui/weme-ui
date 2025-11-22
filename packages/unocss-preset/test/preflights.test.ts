import { describe, expect, it } from 'vitest'
import { resolveOptions } from '../src/options'
import { reset } from '../src/preflights/reset'
import { themes } from '../src/preflights/themes'

describe('preflights', () => {
  const options = resolveOptions({
    variablePrefix: 'test',
    themes: [
      {
        colors: {
          primary: 'gunmetal',
        },
      },
    ],
    cssVars: {
      'box-fg': '#fff',
      'box-bg': '#000',
      'box-border': '#ccc',
    },
  })

  const context = {
    generator: {
      config: {
        envMode: 'dev',
      },
    },
  } as any

  it('should preflight reset', () => {
    expect(reset(options).getCSS(context)).toMatchSnapshot()
  })

  it('should preflight themes', () => {
    const preflights = themes(options)

    preflights.forEach((preflight) => {
      expect(preflight.getCSS(context)).toMatchSnapshot()
    })
  })
})
