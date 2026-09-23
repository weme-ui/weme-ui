import { describe, expect, it } from 'vitest'
import { NonEmptyTrimmedString, TrimmedString } from '~/config/schema/utils'

describe('trimmedString', () => {
  it('trims surrounding whitespace', () => {
    expect(TrimmedString.parse('  hello  ')).toBe('hello')
  })

  it('allows empty string after trim', () => {
    expect(TrimmedString.parse('   ')).toBe('')
  })
})

describe('nonEmptyTrimmedString', () => {
  it('trims surrounding whitespace', () => {
    expect(NonEmptyTrimmedString.parse('  hello  ')).toBe('hello')
  })

  it('rejects empty and whitespace-only values', () => {
    expect(NonEmptyTrimmedString.safeParse('').success).toBe(false)
    expect(NonEmptyTrimmedString.safeParse('   ').success).toBe(false)
  })
})
