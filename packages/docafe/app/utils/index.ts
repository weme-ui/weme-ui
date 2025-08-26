export function getUseValue<T = any>(...values: T[]): T {
  let result: T | null = null

  for (const value of values) {
    if (value !== undefined && value !== null) {
      result = value
      break
    }
  }

  return result as T
}
