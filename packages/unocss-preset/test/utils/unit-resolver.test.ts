import type { UtilObject } from '@unocss/core'
import { describe, expect, it } from 'vitest'
import { createRemToPxProcessor } from '~/utils/unit-resolver'

describe('createRemToPxProcessor', () => {
  it('converts rem values on a css entry with the default 16px base', () => {
    const process = createRemToPxProcessor()
    const entry: [string, string] = ['width', '1rem']

    process(entry)

    expect(entry).toEqual(['width', '16px'])
  })

  it('supports a custom rem base', () => {
    const process = createRemToPxProcessor(10)
    const entry: [string, string] = ['margin', '2.5rem']

    process(entry)

    expect(entry).toEqual(['margin', '25px'])
  })

  it('converts every rem token inside a util object', () => {
    const process = createRemToPxProcessor(16)
    const util = {
      entries: [
        ['margin', '0.5rem'],
        ['padding', '2em'],
        ['gap', '1.25rem'],
      ],
    } as unknown as UtilObject

    process(util)

    expect(util.entries).toEqual([
      ['margin', '8px'],
      ['padding', '2em'],
      ['gap', '20px'],
    ])
  })

  it('handles negative rem values and leaves non-rem values untouched', () => {
    const process = createRemToPxProcessor(16)
    const entry: [string, string] = ['left', '-0.25rem']
    const other: [string, string] = ['color', 'red']

    process(entry)
    process(other)

    expect(entry).toEqual(['left', '-4px'])
    expect(other).toEqual(['color', 'red'])
  })

  it('ignores non-string css entry values', () => {
    const process = createRemToPxProcessor()
    const entry = ['opacity', 1] as [string, number]

    process(entry as any)

    expect(entry).toEqual(['opacity', 1])
  })
})
