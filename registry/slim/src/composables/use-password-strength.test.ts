import { describe, expect, it } from 'vitest'
import { usePasswordStrength } from './use-password-strength'

describe('usePasswordStrength', () => {
  it('returns default options for each strength tier', () => {
    const { options } = usePasswordStrength({})
    expect(options.tooWeak).toEqual({ minLength: 0, minDiversity: 0 })
    expect(options.weak).toEqual({ minLength: 8, minDiversity: 2 })
    expect(options.medium).toEqual({ minLength: 10, minDiversity: 3 })
    expect(options.strong).toEqual({ minLength: 12, minDiversity: 4 })
  })

  describe('given default thresholds', () => {
    const { checkPassword } = usePasswordStrength({})

    it('rates an empty password as tooWeak', () => {
      expect(checkPassword('')).toEqual({
        diversity: 0,
        key: 'tooWeak',
        contains: [],
        message: 'Too weak',
        length: 0,
      })
    })

    it('detects lowercase, uppercase, number, and symbol classes', () => {
      expect(checkPassword('a').contains).toEqual(['lowercase'])
      expect(checkPassword('A').contains).toEqual(['uppercase'])
      expect(checkPassword('1').contains).toEqual(['number'])
      expect(checkPassword('!').contains).toEqual(['symbol'])
      expect(checkPassword('aA1!').contains).toEqual(['lowercase', 'uppercase', 'number', 'symbol'])
    })

    it('rates short single-class passwords as tooWeak', () => {
      expect(checkPassword('abcdefg')).toMatchObject({
        diversity: 0,
        key: 'tooWeak',
        length: 7,
        message: 'Too weak',
      })
    })

    it('rates length 8 with two character classes as weak', () => {
      expect(checkPassword('abcdefgA')).toEqual({
        diversity: 1,
        key: 'weak',
        contains: ['lowercase', 'uppercase'],
        message: 'Weak',
        length: 8,
      })
    })

    it('rates length 10 with three character classes as medium', () => {
      expect(checkPassword('abcdefgA12')).toEqual({
        diversity: 2,
        key: 'medium',
        contains: ['lowercase', 'uppercase', 'number'],
        message: 'Medium',
        length: 10,
      })
    })

    it('rates length 12 with all four character classes as strong', () => {
      expect(checkPassword('abcdefgA12!@')).toEqual({
        diversity: 3,
        key: 'strong',
        contains: ['lowercase', 'uppercase', 'number', 'symbol'],
        message: 'Strong',
        length: 12,
      })
    })

    it('stays below a tier when diversity is insufficient despite length', () => {
      // length 12, only lowercase → fails weak (needs minDiversity 2)
      expect(checkPassword('abcdefghijkl')).toMatchObject({
        diversity: 0,
        key: 'tooWeak',
        contains: ['lowercase'],
        length: 12,
      })
    })

    it('stays below a tier when length is insufficient despite diversity', () => {
      // four character classes, length 4 → only tooWeak
      expect(checkPassword('aA1!')).toMatchObject({
        diversity: 0,
        key: 'tooWeak',
        contains: ['lowercase', 'uppercase', 'number', 'symbol'],
        length: 4,
      })
    })
  })

  describe('given custom options and messages', () => {
    it('merges option overrides and keeps unset tiers', () => {
      const { checkPassword } = usePasswordStrength({
        options: {
          weak: { minLength: 4, minDiversity: 1 },
        },
      })

      expect(checkPassword('abcd')).toEqual({
        diversity: 1,
        key: 'weak',
        contains: ['lowercase'],
        length: 4,
        message: 'Weak',
      })
      // medium / strong thresholds still use defaults
      expect(checkPassword('abcdefgA12')).toMatchObject({
        diversity: 2,
        key: 'medium',
      })
    })

    it('merges message overrides', () => {
      const { checkPassword } = usePasswordStrength({
        messages: {
          strong: '很强',
          tooWeak: '太弱',
        },
      })

      expect(checkPassword('').message).toBe('太弱')
      expect(checkPassword('abcdefgA12!@').message).toBe('很强')
      expect(checkPassword('abcdefgA').message).toBe('Weak')
    })
  })
})
