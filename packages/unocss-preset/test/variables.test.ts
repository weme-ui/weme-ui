import { describe, expect, it } from 'vitest'
import { resolveOptions } from '../src/options'
import { resolveCssVar } from '../src/utils'

describe('css variables', () => {
  it('should resolved css variables', () => {
    const options = resolveOptions({
      cssVars: {
        component: {
          background: 'color.neutral.1',
          foreground: 'color.neutral.11',
          width: '1rem',
          height: '1rem',
          border: '1px',
        },
        bad: {},
      },
    })

    // bg-component
    expect(resolveCssVar('background-color', 'component', options)).toEqual({
      'background-color': 'var(--ui-component-bg)',
    })

    // c-component
    expect(resolveCssVar('color', 'component', options)).toEqual({
      color: 'var(--ui-component-fg)',
    })

    // b-width-component
    expect(resolveCssVar('border-width', 'component', options)).toEqual({
      'border-width': 'var(--ui-component-border)',
    })

    // w-component
    expect(resolveCssVar('width', 'component', options)).toEqual({
      width: 'var(--ui-component-width)',
    })

    // h-component
    expect(resolveCssVar('height', 'component', options)).toEqual({
      height: 'var(--ui-component-height)',
    })

    // b-bad
    expect(resolveCssVar('border-color', 'bad', options)).toBeUndefined()
  })
})
