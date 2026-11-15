import { describe, it, expect } from 'vitest'
import {
  matchCustomCssVariable,
  parseCustomCssVariable,
  applyTokenShortKeys,
  flattenCssVariables,
  parseTokenCssVariable,
} from '../src'

describe('utils', () => {
  const data = [
    'test',
    'test-bg',
    'test-border',
    'test-width',
    'test-height',
    'test-hover-bg',
    'test-hover',
  ]

  it('should match custom css variable', () => {
    const tests: [string, string[]][] = [
      [
        'test',
        [
          'test',
          'test-bg',
          'test-border',
          'test-width',
          'test-height',
          'test-hover-bg',
          'test-hover',
        ],
      ],
      ['test-bg', ['test-bg']],
      ['test-border', ['test-border']],
      ['test-width', ['test-width']],
      ['test-height', ['test-height']],
      ['test-hover', ['test-hover-bg', 'test-hover']],
    ]

    for (const [name, value] of tests) {
      expect(matchCustomCssVariable(name, data)).toEqual([name, value])
    }
  })

  it('should parse custom css variable', () => {
    const tests: [[string, string[]], string, string][] = [
      [
        [
          'test',
          ['test-bg', 'test-border', 'test-width', 'test-height', 'test-hover-bg', 'test-hover'],
        ],
        'bg',
        'var(--test-bg)',
      ],
      [
        [
          'test',
          ['test-bg', 'test-border', 'test-width', 'test-height', 'test-hover-bg', 'test-hover'],
        ],
        'border',
        'var(--test-border)',
      ],
      [
        [
          'test',
          ['test-bg', 'test-border', 'test-width', 'test-height', 'test-hover-bg', 'test-hover'],
        ],
        'width',
        'var(--test-width)',
      ],
      [
        [
          'test',
          ['test-bg', 'test-border', 'test-width', 'test-height', 'test-hover-bg', 'test-hover'],
        ],
        'height',
        'var(--test-height)',
      ],
      [['test-hover', ['test-hover-bg', 'test-hover']], 'bg', 'var(--test-hover-bg)'],
      [['test-hover', ['test-hover-bg', 'test-hover']], 'text', 'var(--test-hover)'],
    ]

    for (const [matched, varName, expected] of tests) {
      expect(parseCustomCssVariable(matched, varName)).toBe(expected)
    }
  })

  it('should apply token short keys', () => {
    const tests: [string, string][] = [
      ['test', 'test'],
      ['test-base', 'test'],
      ['test-default', 'test'],
      ['test-color', 'test'],
      ['test-bg', 'test-bg'],
      ['test-background', 'test-bg'],
      ['test-border-color', 'test-border'],
      ['test-text', 'test-text'],
    ]

    for (const [name, expected] of tests) {
      expect(applyTokenShortKeys(name)).toBe(expected)
    }
  })

  it('should flatten css variables', () => {
    expect(
      flattenCssVariables({
        test: {
          base: '#000',
          default: '#f00',
          background: '#000',
          color: '#fff',
        },
      }),
    ).toMatchInlineSnapshot(`
      {
        "test-background": "#000",
        "test-base": "#000",
        "test-color": "#fff",
        "test-default": "#f00",
      }
    `)
  })

  it('should parse token css variable', () => {
    const tests: [string[], string, string][] = [
      [['highlighted'], 'text', 'var(--text-highlighted)'],
      [['text', 'highlighted'], 'bg', 'var(--text-highlighted)'],
      [['text', 'highlighted'], 'border', 'var(--text-highlighted)'],
    ]

    for (const [tokens, varName, expected] of tests) {
      expect(parseTokenCssVariable(tokens, varName)).toBe(expected)
    }
  })
})
