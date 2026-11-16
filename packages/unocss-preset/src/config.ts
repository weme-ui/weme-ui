import type { ThemeConfig } from '@weme-ui/utilities'
import { ProjectConfigSchema } from '@weme-ui/schema'
import createJiti from 'jiti'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path/posix'
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

  const themesPath = getThemesPath()
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
 * 获取主题路径
 *
 * @returns 主题路径
 * @internal
 */
function getThemesPath() {
  let rootPath = ''
  let themesPath = ''

  if (wemeConfig && wemeConfig.paths) {
    rootPath = wemeConfig.paths['~'] || 'src'
    themesPath = wemeConfig.paths['theme'] || '~/themes'

    return join('.', themesPath.replace('~', rootPath))
  }

  return join('.', 'src', 'themes')
}
