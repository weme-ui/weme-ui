import type { Theme } from '../theme'
import { isThemeColorAliasName } from '@weme-ui/utilities'
import { colorAliasTracking, generateThemeVariable } from '../utils'

// #region color alias
/**
 * 解析颜色别名
 *
 * @example
 * ```ts
 * parseColorAlias(['accent']) // { color: 'var(--accent-9)', keys: ['accent', '9'], no: '9' }
 * parseColorAlias(['accent', '12']) // { color: 'var(--accent-12)', keys: ['accent', '12'], no: '12' }
 * parseColorAlias(['accent', 'base']) // undefined
 * ```
 *
 * @param keys 拆分键值，如：bg-accent-7 -> ['accent', '7']
 * @returns 颜色别名信息
 */
export function parseColorAlias(theme: Theme, keys: string[]) {
  const [alias, ...rest] = keys

  if (!isThemeColorAliasName(alias)) {
    return
  }

  if (rest.length === 0) {
    keys.push('9')
  }

  const color: string = generateThemeVariable('colors', keys)
  const no = keys.at(-1)

  if (isNaN(Number(no))) {
    return
  }

  colorAliasTracking(theme, alias, no)

  return {
    color,
    no,
    keys,
  }
}

// #endregion
