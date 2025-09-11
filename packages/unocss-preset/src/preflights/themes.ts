import type { DeepPartial, Preflight, WemePresetResolvedOptions, WemeTheme, WemeThemeTokens } from '../types'
import { transformColor } from '@weme-ui/colors'
import { defu } from 'defu'
import { defaultTheme } from '../defaults'
import { minifyCss, trackColor } from '../utils'

export function preflightThemes(options: WemePresetResolvedOptions): Preflight[] {
  return options.themes
    .sort((a, b) => (b.priority || 0) - (a.priority || 0))
    .map((theme) => {
      return {
        layer: 'theme',
        getCSS() {
          const selector = theme.id === 'ROOT'
            ? ':root'
            : `[data-theme=${theme.id}]`

          // If color is custom, transform it to color scales
          // If color is not custom, use the color scales from options.colors
          const {
            lightColors,
            darkColors,
          } = resolveThemeColors(theme)

          const {
            lightTheme,
            darkTheme,
          } = resolveThemeTokens(options.variablePrefix, theme)

          return minifyCss(`${
            lightColors || lightTheme
              ? `${selector} { ${lightColors} ${lightTheme} } `
              : ''
          }

${
  darkColors || darkTheme
    ? `${selector}:where(.dark) { ${darkColors} ${darkTheme} } `
    : ''
}
`)
        },
      }
    })
}

function resolveThemeColors(theme: WemeTheme): Record<'lightColors' | 'darkColors', string> {
  const light: string[] = []
  const dark: string[] = []

  if (theme.colors) {
    Object.entries(theme.colors).forEach(([name, color]) => {
      if (
        color.startsWith('#')
        || color.startsWith('rgb(')
        || color.startsWith('hsl(')
        || color.startsWith('lch(')
        || color.startsWith('oklch(')
      ) {
        transformColor({ color }).forEach((c, i) => {
          light.push(`--${name}-${i + 1}: ${c};`)
        })

        transformColor({ color, appearance: 'dark' }).forEach((c, i) => {
          dark.push(`--${name}-${i + 1}: ${c};`)
        })
      }
      else {
        for (let i = 1; i <= 12; i++) {
          light.push(`--${name}-${i}: var(--${color}-${i});`)
        }
      }
    })
  }

  return {
    lightColors: light.join(''),
    darkColors: dark.join(''),
  }
}

function resolveThemeTokens(prefix: string, theme: WemeTheme): Record<'lightTheme' | 'darkTheme', string> {
  const light: string[] = []
  const dark: string[] = []

  const resolvedTheme = defu(theme, defaultTheme) as WemeTheme

  const shortcuts: Record<string, string> = {
    foreground: 'fg',
    background: 'bg',
    default: '',
  }

  function resolveTokenName(name: string) {
    return `--${prefix}-${name.split('-')
      .map(n => shortcuts[n] ?? n)
      .filter(Boolean)
      .join('-')}`
  }

  function resolveTokenValue(value: string) {
    if (value.startsWith('color.')) {
      const [color, scale] = value.replace(/^color\./, '').split('.')
      const trackKey = resolvedTheme.colors?.[color as any as keyof WemeTheme['colors']] ?? color

      trackColor(trackKey, Number(scale))

      return `var(--${color}-${scale})`
    }

    else if (value.startsWith('$')) {
      return `var(${resolveTokenName(value.slice(1).replace(/\./g, '-'))})`
    }

    return value
  }

  if (theme.radius)
    light.push(`${resolveTokenName('radius')}: ${theme.radius};`)

  if (theme.tokens) {
    Object.entries(theme.tokens).forEach(([name, value]) => {
      if (name !== 'dark') {
        if (typeof value === 'string')
          light.push(`${resolveTokenName(name)}: ${resolveTokenValue(value)};`)

        if (typeof value === 'object') {
          Object.entries(value).forEach(([subName, subValue]) => {
            light.push(`${resolveTokenName(`${name}-${subName}`)}: ${resolveTokenValue(subValue as string)};`)
          })
        }
      }

      else {
        const darkTokens = value as DeepPartial<WemeThemeTokens>

        Object.entries(darkTokens).forEach(([name, value]) => {
          if (typeof value === 'string')
            dark.push(`${resolveTokenName(name)}: ${resolveTokenValue(value)};`)

          if (typeof value === 'object') {
            Object.entries(value).forEach(([subName, subValue]) => {
              dark.push(`${resolveTokenName(`${name}-${subName}`)}: ${resolveTokenValue(subValue as string)};`)
            })
          }
        })
      }
    })
  }

  return {
    lightTheme: light.join(''),
    darkTheme: dark.join(''),
  }
}
