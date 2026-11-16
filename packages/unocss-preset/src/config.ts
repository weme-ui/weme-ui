import type { RegistryItemTypeEnum } from '@weme-ui/schema'
import type { ThemeConfig, UserExtendUnoConfig } from '@weme-ui/utilities'
import type { Theme } from './theme'
import { ProjectConfigSchema } from '@weme-ui/schema'
import createJiti from 'jiti'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path/posix'
import { mergeDeep } from 'unocss'
import * as v from 'valibot'

/**
 * Weme UI 配置对象
 */
const wemeConfig = loadWemeConfigFile()

/**
 * 加载 Weme UI 自定义颜色
 *
 * @returns 自定义颜色对象，如果不存在则返回 undefined
 */
export function loadCustomColors() {
  return wemeConfig ? wemeConfig.unocss?.colors : undefined
}

/**
 * 加载 Weme UI 自定义 CSS 变量
 *
 * @returns 自定义 CSS 变量对象，如果不存在则返回 undefined
 */
export function loadCustomCssVars() {
  return wemeConfig ? wemeConfig.unocss?.cssVars : undefined
}

/**
 * 加载 Weme UI 自定义主题
 *
 * @returns 自定义主题列表
 */
export function loadCustomTheme() {
  if (!wemeConfig) {
    return []
  }

  const themesPath = getPaths('theme')
  const jiti = createJiti(join(process.cwd(), themesPath))
  const dir = join(process.cwd(), themesPath)

  if (!existsSync(dir)) {
    return []
  }

  return readdirSync(dir)
    .filter((file) => file.endsWith('.theme.ts'))
    .map((file) => jiti(join(dir, file)).default as ThemeConfig)
    .filter(Boolean)
}

export function loadUserExtendUnoConfig(): UserExtendUnoConfig<Theme> | undefined {
  if (!wemeConfig) {
    return undefined
  }

  const componentsPath = getPaths('component')
  const jiti = createJiti(join(process.cwd(), componentsPath))
  const dir = join(process.cwd(), componentsPath)

  if (!existsSync(dir)) {
    return undefined
  }

  const files = readdirSync(dir, { recursive: true })
    .filter((file) => file.toString().endsWith('.uno.ts'))
    .map((file) => jiti(join(dir, file.toString())).default as UserExtendUnoConfig<Theme>)
    .filter(Boolean)

  return files.reduce((acc, file) => {
    acc.shortcuts = mergeDeep(acc.shortcuts || [], file.shortcuts || [])
    acc.animations = mergeDeep(acc.animations || {}, file.animations || {})
    return acc
  }, {} as UserExtendUnoConfig<Theme>)
}

/**
 * 加载 Weme UI 配置文件
 *
 * @returns 解析后的配置对象，如果不存在则返回 undefined
 * @internal
 */
function loadWemeConfigFile() {
  const wemeConfigPath = join(process.cwd(), 'weme.config.json')
  if (!existsSync(wemeConfigPath)) {
    return
  }

  const wemeConfigContent = readFileSync(wemeConfigPath, 'utf-8')
  if (!wemeConfigContent) {
    return
  }

  try {
    const wemeConfig = JSON.parse(wemeConfigContent)

    if (!wemeConfig.unocss) {
      return
    }

    const parsed = v.safeParse(ProjectConfigSchema, wemeConfig)

    if (!parsed.success) {
      return
    }

    return parsed.output
  } catch {
    return
  }
}

/**
 * 获取路径
 *
 * @param path 路径类型
 * @returns 路径
 * @internal
 */
function getPaths(path: v.InferOutput<typeof RegistryItemTypeEnum>) {
  let rootPath = ''
  let themesPath = ''

  if (wemeConfig && wemeConfig.paths) {
    rootPath = wemeConfig.paths['~'] || 'src'
    themesPath = wemeConfig.paths[path] || `~/${path}s`

    return join('.', themesPath.replace('~', rootPath))
  }

  return join('.', 'src', `${path}s`)
}
