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

export function normalizePath(suffix: string, path: string) {
  const normalized = path === '/'
    ? 'landing'
    : path
        .replace(/^\//, '')
        .replace(/\//g, '-')

  return `${normalized}:${suffix}`
}
