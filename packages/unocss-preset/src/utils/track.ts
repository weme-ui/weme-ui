import type { Arrayable } from '@unocss/core'
import type { CustomThemeColorAliases } from '../custom/types'
import type { Theme } from '../theme/types'
import { toArray } from '@unocss/core'
import { DEFAULT_COLOR_ALIASES, isColorAlias, isRawColor } from '../custom'
import { getThemeByKey } from './utilities'

// #region Theme

/**
 * Tracked theme keys of one generator.
 *
 * eg: colors:red-100
 *
 * @internal
 */
const trackedThemeByTheme = new WeakMap<Theme, Set<string>>()

export function getTrackedTheme(theme: Theme): Set<string> {
  let set = trackedThemeByTheme.get(theme)
  if (!set) {
    set = new Set()
    trackedThemeByTheme.set(theme, set)
  }
  return set
}

export function themeTracking(theme: Theme, key: string, props: Arrayable<string> = 'DEFAULT') {
  const tracked = getTrackedTheme(theme)
  const k = `${key}:${toArray(props).join('-')}`
  if (!tracked.has(k)) {
    tracked.add(k)
  }
}

export function generateThemeVariable(key: string, props: Arrayable<string>) {
  return `var(--${key === 'colors' ? '' : `${key}-`}${toArray(props).join('-')})`
}

export function detectThemeValue(value: string, theme: Theme) {
  if (value.startsWith('var(')) {
    const variable = value.match(/var\(--([\w-]+)(?:,.*)?\)/)?.[1]
    if (variable) {
      const [key, ...path] = variable.split('-')
      const themeValue = getThemeByKey(theme, key as keyof Theme, path)

      if (typeof themeValue === 'string') {
        themeTracking(theme, key, path)
        detectThemeValue(themeValue, theme)
      }
    }
  }
}

// #endregion

// #region Properties

const trackedPropertiesByTheme = new WeakMap<Theme, Map<string, string>>()

export function getTrackedProperties(theme: Theme): Map<string, string> {
  let map = trackedPropertiesByTheme.get(theme)
  if (!map) {
    map = new Map()
    trackedPropertiesByTheme.set(theme, map)
  }
  return map
}

export function propertyTracking(theme: Theme, property: string, value: string) {
  const tracked = getTrackedProperties(theme)

  if (!tracked.has(property)) {
    tracked.set(property, value)
  }
}

// #endregion

// #region Custom CSS Variables

export const trackedCSSVars = new Set<string>([])

export function cssVarTracking(key: string) {
  if (!trackedCSSVars.has(key)) {
    trackedCSSVars.add(key)
  }
}

// #endregion

// #region Custom Color Aliases

let colorAliasMap: CustomThemeColorAliases[] = []

/**
 * 设置颜色别名映射
 *
 * @param map - 颜色别名映射
 * @internal
 */
export function setColorAliasMap(maps: CustomThemeColorAliases[]) {
  colorAliasMap = maps && maps.length > 0 ? maps : [DEFAULT_COLOR_ALIASES]
}

export const trackedColorAliases = new Set<string>([])

/**
 * 跟踪颜色别名, 用于跟踪颜色别名所使用的颜色
 *
 * @param alias - 颜色别名
 * @param scale - 颜色刻度
 */
export function colorAliasTracking(theme: Theme, alias: string, scale?: string) {
  const no = scale ?? '9'
  const key = `${alias}:${no}`

  if (isColorAlias(alias) && !trackedColorAliases.has(key)) {
    trackedColorAliases.add(key)

    for (const colorAlias of colorAliasMap) {
      const color = colorAlias[alias as keyof CustomThemeColorAliases]

      if (typeof color === 'string' && !isRawColor(color)) {
        themeTracking(theme, 'colors', [color, no])
      }
    }
  }
}

/**
 * 获取跟踪的颜色别名分组
 *
 * @returns 跟踪的颜色别名分组
 */
export function getTrackedColorAliasGroups(): Record<string, string[]> {
  return Array.from(trackedColorAliases)
    .toSorted((a, b) => a.localeCompare(b))
    .reduce(
      (acc, alias) => {
        const [name, no] = alias.split(':')
        acc[name] ??= []
        acc[name].push(no)
        return acc
      },
      {} as Record<string, string[]>,
    )
}

// #endregion
