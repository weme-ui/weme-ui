import type { UserConfig } from '@unocss/core'
import type { Theme } from './theme/types'

/**
 * 定义 UnoCSS 配置
 *
 * @param config - UnoCSS 配置
 * @returns UnoCSS 配置
 */
export function defineUnoConfig(config: UserConfig<Theme>): UserConfig<Theme> {
  // Configure the content pipeline to include *.style.ts and *.uno.ts files in the project.
  if (
    config.content?.pipeline &&
    config.content?.pipeline.include &&
    Array.isArray(config.content?.pipeline.include)
  ) {
    config.content.pipeline.include.push(/\.(style.[jt]s|uno.[jt]s)($|\?)/)
  } else {
    config.content = {
      pipeline: {
        include: [
          /\.(vue|svelte|[jt]sx|vine.ts|style.[jt]s|uno.[jt]s|mdx?|astro|elm|php|phtml|marko|html)($|\?)/,
        ],
      },
    }
  }

  return config
}
