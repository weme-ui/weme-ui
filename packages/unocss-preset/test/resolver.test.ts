import { describe, expect, it } from 'vitest'
import { resolveOptions } from '../src/options'
import { resolveColor } from '../src/utils'

describe('resolver', () => {
  const options = resolveOptions({
    cssVars: {
      'test-fg': '#fff',
      'test-bg': '#000',
      'test-border': '#ccc',
      'test-border-width': '1px',
      'test-width': '100px',
      'test-height': '100px',
    },
  })

  it('should resolve color', () => {
    [
      // Colors
      ['background-color', 'bg', 'primary', 'var(--primary-9)'],
      ['background-color', 'bg', 'primary-9', 'var(--primary-9)'],
      ['background-color', 'bg', 'primary-9/10', 'color-mix(in oklch, var(--primary-9) 10%, transparent)'],
      ['border-color', 'bg', 'primary', 'var(--primary-9)'],
      ['border-color', 'bg', 'primary-9', 'var(--primary-9)'],
      ['border-color', 'bg', 'primary-9/10', 'color-mix(in oklch, var(--primary-9) 10%, transparent)'],
      ['color', 'fg', 'primary', 'var(--primary-9)'],
      ['color', 'fg', 'primary-9', 'var(--primary-9)'],
      ['color', 'fg', 'primary-9/10', 'color-mix(in oklch, var(--primary-9) 10%, transparent)'],

      // Tokens with property
      ['color', 'fg', 'default', 'var(--ui-fg)'],
      ['color', 'fg', 'toned', 'var(--ui-fg-toned)'],
      ['color', 'fg', 'toned/10', 'color-mix(in oklch, var(--ui-fg-toned) 10%, transparent)'],
      ['background-color', 'bg', 'default', 'var(--ui-bg)'],
      ['background-color', 'bg', 'elevated', 'var(--ui-bg-elevated)'],
      ['background-color', 'bg', 'elevated/10', 'color-mix(in oklch, var(--ui-bg-elevated) 10%, transparent)'],
      ['border-color', 'border', 'default', 'var(--ui-border)'],
      ['border-color', 'border', 'default/10', 'color-mix(in oklch, var(--ui-border) 10%, transparent)'],
      ['border-color', 'border', 'elevated', 'var(--ui-border-elevated)'],
      ['border-color', 'border', 'elevated/10', 'color-mix(in oklch, var(--ui-border-elevated) 10%, transparent)'],

      // Tokens with value
      ['color', 'fg', 'bg', 'var(--ui-bg)'],
      ['color', 'fg', 'bg-dimmed', 'var(--ui-bg-dimmed)'],
      ['color', 'fg', 'bg-muted/10', 'color-mix(in oklch, var(--ui-bg-muted) 10%, transparent)'],
      ['color', 'fg', 'border', 'var(--ui-border)'],
      ['color', 'fg', 'border-elevated', 'var(--ui-border-elevated)'],
      ['color', 'fg', 'border-elevated/10', 'color-mix(in oklch, var(--ui-border-elevated) 10%, transparent)'],
      ['background-color', 'bg', 'fg', 'var(--ui-fg)'],
      ['background-color', 'bg', 'fg-toned', 'var(--ui-fg-toned)'],
      ['background-color', 'bg', 'fg-toned/10', 'color-mix(in oklch, var(--ui-fg-toned) 10%, transparent)'],
      ['background-color', 'bg', 'border', 'var(--ui-border)'],
      ['background-color', 'bg', 'border-elevated', 'var(--ui-border-elevated)'],
      ['background-color', 'bg', 'border-elevated/10', 'color-mix(in oklch, var(--ui-border-elevated) 10%, transparent)'],
      ['border-color', 'border', 'fg', 'var(--ui-fg)'],
      ['border-color', 'border', 'fg-toned', 'var(--ui-fg-toned)'],
      ['border-color', 'border', 'fg-toned/10', 'color-mix(in oklch, var(--ui-fg-toned) 10%, transparent)'],
      ['border-color', 'border', 'bg', 'var(--ui-bg)'],
      ['border-color', 'border', 'bg-dimmed', 'var(--ui-bg-dimmed)'],
      ['border-color', 'border', 'bg-dimmed/10', 'color-mix(in oklch, var(--ui-bg-dimmed) 10%, transparent)'],

      // Css Variables
      ['color', 'fg', 'test', 'var(--ui-test-fg)'],
      ['color', 'fg', 'test/10', 'color-mix(in oklch, var(--ui-test-fg) 10%, transparent)'],
      ['background-color', 'bg', 'test', 'var(--ui-test-bg)'],
      ['background-color', 'bg', 'test/10', 'color-mix(in oklch, var(--ui-test-bg) 10%, transparent)'],
      ['border-color', 'border', 'test', 'var(--ui-test-border)'],
      ['border-color', 'border', 'test/10', 'color-mix(in oklch, var(--ui-test-border) 10%, transparent)'],
      ['border-width', '', 'test', 'var(--ui-test-border-width)'],
      ['width', '', 'test', 'var(--ui-test-width)'],
      ['height', '', 'test', 'var(--ui-test-height)'],
    ].forEach(([property, varName, args, expected]) => {
      expect(resolveColor(property, varName, args, options)).toEqual({
        [property]: expected,
      })
    })
  })
})
