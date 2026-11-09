import { expect } from 'vitest'

export function expectTwelveStepScale(scale: readonly string[]) {
  expect(scale).toHaveLength(12)

  for (const value of scale) {
    expect(value).toEqual(expect.any(String))
    expect(value.length).toBeGreaterThan(0)
    expect(value).not.toMatch(/NaN|Infinity/)
  }
}
