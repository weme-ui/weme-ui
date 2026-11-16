import type { UserConfig } from '@unocss/core'
import type { Theme } from './theme/types'

interface DefineUnoConfigOptions {
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
export function defineUnoConfig(
  config: UserConfig<Theme>,
  options?: DefineUnoConfigOptions,
): UserConfig<Theme> {
  const { includeStyle = true } = options || {}

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

  return config
}
