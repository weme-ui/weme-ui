import { defu } from 'defu'
import { toRef } from 'vue'

export function toBoolValue(value: any) {
  return value === '' || value === true
}

export function toBoolDataAttrValue(value: any) {
  return toBoolValue(value) ? '' : undefined
}

export function mergeToRef<T>(props: T | undefined | boolean, defaults: T) {
  return toRef(() => defu(
    typeof props === 'object' ? props : {},
    defaults as any,
  ) as T)
}

export function get(object: Record<string, any> | undefined, path: (string | number)[] | string, defaultValue?: any): any {
  if (typeof path === 'string') {
    path = path.split('.').map((key) => {
      const numKey = Number(key)
      return Number.isNaN(numKey) ? key : numKey
    })
  }

  let result: any = object

  for (const key of path) {
    if (result === undefined || result === null) {
      return defaultValue
    }

    result = result[key]
  }

  return result !== undefined ? result : defaultValue
}

export function omit<D extends object, K extends keyof D>(
  data: D,
  keys: K[],
): Omit<D, K> {
  const result = { ...data }

  for (const key of keys) {
    delete result[key]
  }

  return result as Omit<D, K>
}

export function removeUndefined<T extends object>(obj: T): T {
  for (const key in obj) {
    if (obj[key] === undefined) {
      delete obj[key]
    }
  }
  return obj
}
