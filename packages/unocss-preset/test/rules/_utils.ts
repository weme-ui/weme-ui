import type { CSSObject, Rule, RuleContext } from '@unocss/core'
import type { Theme } from '~/theme'
import { symbols } from '@unocss/core'
import { expect } from 'vitest'
import { theme } from '~/theme/default'

export function createRuleContext(overrides: Record<string, unknown> = {}): RuleContext<Theme> {
  return {
    theme: theme({}),
    generator: {
      config: {
        separators: [':'],
      },
      userConfig: {},
    },
    symbols,
    variantHandlers: [],
    constructCSS: (css: CSSObject) => JSON.stringify(css),
    ...overrides,
  } as unknown as RuleContext<Theme>
}

function isGenerator(value: object): value is Generator {
  return Symbol.iterator in value && !Array.isArray(value)
}

function normalize(result: unknown) {
  if (result == null)
    return undefined
  if (typeof result === 'object' && isGenerator(result))
    return [...result]
  return result
}

function isEmpty(result: unknown) {
  if (result == null)
    return true
  if (typeof result !== 'object')
    return false
  if (Array.isArray(result))
    return result.length === 0 || result.every(value => value == null)

  const values = Object.values(result as CSSObject)
  return values.length === 0 || values.every(value => value == null)
}

export function matchAllRules(rules: Rule<Theme>[], matcher: string, overrides: Record<string, unknown> = {}) {
  const context = createRuleContext(overrides)
  const results: unknown[] = []

  for (const rule of rules) {
    const [pattern, body] = rule
    let match: RegExpMatchArray | undefined

    if (typeof pattern === 'string') {
      if (pattern !== matcher)
        continue
      match = [matcher] as unknown as RegExpMatchArray
    }
    else {
      match = matcher.match(pattern) ?? undefined
      if (!match)
        continue
    }

    const result = normalize(typeof body === 'function' ? body(match, context) : body)
    if (isEmpty(result))
      continue

    results.push(result)
  }

  return results
}

export function matchRule(rules: Rule<Theme>[], matcher: string, overrides: Record<string, unknown> = {}) {
  return matchAllRules(rules, matcher, overrides)[0]
}

export function css(result: unknown): Record<string, unknown> {
  if (Array.isArray(result)) {
    const first = result[0]
    if (Array.isArray(first)) {
      const entries = Array.isArray(first[0]) ? first : result.filter(Array.isArray)
      return Object.fromEntries(entries.map((entry: unknown[]) => [entry[0], entry[1]]))
    }

    const object = result.find(item => item && typeof item === 'object' && !Array.isArray(item) && !('syntax' in (item as object)))
    if (object)
      return object as Record<string, unknown>
  }

  if (result && typeof result === 'object')
    return result as Record<string, unknown>

  throw new Error('expected a css result')
}

export function expectUtilities(rules: Rule<Theme>[], cases: Record<string, Record<string, unknown> | undefined>, overrides: Record<string, unknown> = {}) {
  for (const [utility, expected] of Object.entries(cases)) {
    const result = matchRule(rules, utility, overrides)
    if (expected == null) {
      expect(result, utility).toBeUndefined()
      continue
    }

    expect(css(result), utility).toMatchObject(expected)
  }
}
