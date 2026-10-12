import escapeStringRegexp from 'escape-string-regexp'

type PasswordStrengthRuleKey = 'lowercase' | 'uppercase' | 'number' | 'symbol'
type PasswordStrengthKey = 'tooWeak' | 'weak' | 'medium' | 'strong'

type PasswordStrengthMessages = Record<PasswordStrengthKey, string>

interface PasswordStrengthOptionValue {
  minDiversity: 0 | 1 | 2 | 3 | 4
  minLength: number
}

type PasswordStrengthOptions = Record<PasswordStrengthKey, PasswordStrengthOptionValue>

interface PasswordStrengthRule {
  key: PasswordStrengthRuleKey
  regex: string
}

export interface UsePasswordStrengthOptions {
  options?: Partial<Omit<PasswordStrengthOptions, 'tooWeak'>>
  messages?: Partial<PasswordStrengthMessages>
}

export interface PasswordStrengthCheckResult {
  diversity: number
  key: PasswordStrengthKey
  contains: PasswordStrengthRuleKey[]
  message: string
  length: number
}

const DEFAULT_PASSWORD_STRENGTH_MESSAGES: PasswordStrengthMessages = {
  tooWeak: 'Too weak',
  weak: 'Weak',
  medium: 'Medium',
  strong: 'Strong',
}

const DEFAULT_PASSWORD_STRENGTH_OPTIONS: PasswordStrengthOptions = {
  tooWeak: {
    minLength: 0,
    minDiversity: 0,
  },
  weak: {
    minLength: 8,
    minDiversity: 2,
  },
  medium: {
    minLength: 10,
    minDiversity: 3,
  },
  strong: {
    minLength: 12,
    minDiversity: 4,
  },
}

export function usePasswordStrength(userOptions: UsePasswordStrengthOptions) {
  const options: PasswordStrengthOptions = { ...DEFAULT_PASSWORD_STRENGTH_OPTIONS, ...userOptions.options ?? {} }
  const messages: PasswordStrengthMessages = { ...DEFAULT_PASSWORD_STRENGTH_MESSAGES, ...userOptions.messages ?? {} }
  const rules: PasswordStrengthRule[] = [
    { key: 'lowercase', regex: '[a-z]' },
    { key: 'uppercase', regex: '[A-Z]' },
    { key: 'number', regex: '[0-9]' },
    // Character class; escaping keeps `[` / `\` / `]` valid inside the set.
    { key: 'symbol', regex: `[${escapeStringRegexp('!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~')}]` },
  ]

  function checkPassword(userPassword: string): PasswordStrengthCheckResult {
    const password = userPassword ?? ''

    const strength: PasswordStrengthCheckResult = {
      diversity: 0,
      key: 'tooWeak',
      contains: [],
      message: '',
      length: 0,
    }

    strength.contains = rules
      .filter(rule => new RegExp(rule.regex).test(password))
      .map(rule => rule.key)

    strength.length = password.length

    const fulfilledOptions = Object.entries(options)
      .filter(([, option]) => strength.contains.length >= Number(option.minDiversity))
      .filter(([, option]) => strength.length >= option.minLength)
      .map(([key], diversity) => ({ diversity, key, message: messages[key as PasswordStrengthKey] }))

    // Object.entries order is tooWeak → weak → medium → strong; take the strongest match.
    return Object.assign(strength, fulfilledOptions.at(-1))
  }

  return {
    options,
    checkPassword,
  }
}
