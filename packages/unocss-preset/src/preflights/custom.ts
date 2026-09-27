import type { Preflight } from '@unocss/core'
import type { PresetWemeUIOptions } from '../options'
import type { Theme } from '../theme'
import type { CustomTheme } from '../tokens'
import { resolveRadixColorScales } from '../colors'
import { DEFAULT_NAME } from '../tokens'
import { compressCSS } from '../utils'

export function custom(options: PresetWemeUIOptions): Preflight<Theme> | undefined {
  if (options.themes?.length === 0) {
    return undefined
  }

  const themeCSS = options.themes?.map((theme) => {
    const colorsCSS = resolveCustomThemeColors(theme as CustomTheme)

    return `${colorsCSS}`
  }).filter(Boolean).join('\n')

  if (!themeCSS) {
    return undefined
  }

  return {
    getCSS: ({ generator }) => {
      return compressCSS(themeCSS, generator.config.envMode === 'dev')
    },
    layer: 'theme',
  }
}

function resolveCustomThemeColors(theme: CustomTheme): string {
  const lightCSS: string[] = []
  const darkCSS: string[] = []

  const lightSelector = `${theme.name === DEFAULT_NAME ? ':root, ' : ''}:where([data-theme='${theme.name}'])`
  const darkSelector = `.dark:where([data-theme='${theme.name}'])`

  Object.entries(theme.colors).forEach(([name, color]) => {
    if (
      color.startsWith('#')
      || color.startsWith('rgb(')
      || color.startsWith('hsl(')
      || color.startsWith('lch(')
      || color.startsWith('oklch(')
    ) {
      const lightColorScales = resolveRadixColorScales({
        color,
        mode: 'light',
      })

      lightColorScales.p3.forEach((color, index) => {
        lightCSS.push(`--${name}-${index + 1}: var(--custom-${name}-${index + 1}, ${color})`)
      })

      const darkColorScales = resolveRadixColorScales({
        color,
        mode: 'dark',
      })

      darkColorScales.p3.forEach((color, index) => {
        darkCSS.push(`--${name}-${index + 1}: var(--custom-${name}-${index + 1}, ${color})`)
      })
    }
    else {
      for (let i = 0; i <= 11; i++) {
        lightCSS.push(`--${name}-${i + 1}: var(--custom-${name}-${i + 1}, var(--${color}-${i + 1}))`)
      }
    }
  })

  return `${lightSelector} {
${lightCSS.join(';\n')}
}
${darkCSS.length > 0
  ? `${darkSelector} {
${darkCSS.join(';\n')}
}`
  : ''}`
}
