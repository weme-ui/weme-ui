import type { UserConfig } from '@unocss/core'
import type { CustomTheme } from './custom'
import type { Theme } from './theme/types'
import { defu } from 'defu'
import { existsSync } from 'node:fs'
import { join, resolve } from 'node:path/posix'
import { glob } from 'tinyglobby'

interface DefineUnoConfigOptions {
  /**
   * 扫描目录
   *
   * @default 'src'
   */
  scanDir?: string

  /**
   * 是否包含 style.ts 文件
   *
   * @default true
   */
  includeStyle?: boolean
}

/**
 * 定义 UnoCSS 配置
 *
 * @param config - UnoCSS 配置
 * @returns UnoCSS 配置
 */
export async function defineUnoConfig(
  config: UserConfig<Theme>,
  options?: DefineUnoConfigOptions,
): Promise<UserConfig<Theme>> {
  const { includeStyle = true, scanDir = 'src' } = options || {}

  // Configure the content pipeline to include *.style.ts files in the project.
  if (includeStyle) {
    if (
      config.content?.pipeline &&
      config.content?.pipeline.include &&
      Array.isArray(config.content?.pipeline.include)
    ) {
      config.content.pipeline.include.push(/\.(style.[jt]s)($|\?)/)
    } else {
      config.content = {
        pipeline: {
          include: [
            /\.(vue|svelte|[jt]sx|vine.ts|style.[jt]s|mdx?|astro|elm|php|phtml|marko|html)($|\?)/,
          ],
        },
      }
    }
  }

  if (scanDir) {
    // Load the component level unocss config from the *.uno.ts file.
    const componentUnoConfigs = await loadComponentUnoConfigs(scanDir)
    if (componentUnoConfigs) {
      config = defu({}, config, componentUnoConfigs)
    }
  }

  return config
}

export async function loadComponentUnoConfigs(baseDir: string) {
  const basePath = resolve(process.cwd(), baseDir)
  if (!existsSync(basePath)) {
    return
  }

  const files = await glob('**/*.uno.ts', {
    cwd: basePath,
    onlyFiles: true,
  })

  if (files.length === 0) {
    return
  }

  const unoConfigs: UserConfig<Theme>[] = await Promise.all(
    files.map(async (file) => {
      const filePath = join(basePath, file)
      const unoConfig = await import(filePath).then((r) => r.default)
      return unoConfig
    }),
  ).then((r) => r.filter(Boolean))

  return defu({}, ...unoConfigs) as UserConfig<Theme>
}

export async function loadCustomThemes(baseDir: string = './src'): Promise<CustomTheme[]> {
  const basePath = resolve(process.cwd(), baseDir)
  if (!existsSync(basePath)) {
    return []
  }

  const files = await glob('**/*.theme.ts', {
    cwd: basePath,
    onlyFiles: true,
  })

  if (files.length === 0) {
    return []
  }

  return await Promise.all(
    files.map(async (file) => {
      const filePath = join(basePath, file)
      if (existsSync(filePath)) {
        const theme = await import(filePath).then((r) => r.default)
        if (theme) {
          return theme as CustomTheme
        }
      }
      return
    }),
  ).then((r) => r.filter(Boolean) as CustomTheme[])
}
