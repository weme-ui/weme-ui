import { describe, expect, it } from 'vitest'
import { resolveOptions } from '../src/options'

describe('options', () => {
  it('should resolve default options', () => {
    const options = resolveOptions({})

    expect(options.variablePrefix).toEqual('ui')
    expect(options.themes).toMatchInlineSnapshot(`[]`)
    expect(options.colors).toMatchSnapshot()
  })

  it('should resolve themes', () => {
    const options = resolveOptions({
      themes: [
        {
          tokens: {
            foreground: {
              default: '#000',
            },
          },
        },
        {
          tokens: {
            foreground: {
              default: '#fff',
            },
          },
        },
      ],
    })

    expect(options.themes).toMatchSnapshot()
  })
})
