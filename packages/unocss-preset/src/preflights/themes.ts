import type { ColorScalesArray } from '@weme-ui/colors'
import type { HaloTheme, Preflight } from '../types'

export function preflightThemes(prefix: string, themes: HaloTheme[]): Preflight[] {
  return Object.entries(themes)
    .map(([_, theme]) => {
      return {
        getCSS() {
          return `
            [data-theme=${theme.id}] {
              color-scheme: ${theme.appearance};
              --${prefix}radius: ${theme.radius};
              ${createThemeColorCssVars(prefix, theme.colors)}
              ${createThemeTokenCssVars(prefix, theme.tokens)}
            }
          `
        },
        layer: 'base',
      }
    })
}

function createThemeColorCssVars(prefix: string, colors: HaloTheme['colors']): string {
  return Object.entries(colors)
    .map(([name, scales]: [string, ColorScalesArray]) => {
      // support custom color scales
      if (['accent', 'neutral'].includes(name)) {
        return [
          // default
          `--${prefix}${name}: var(--${prefix}${name}-9);`,
          // scales
          ...scales.map(
            (value, i) => `--${prefix}${name}-${i + 1}: var(--custom-${name}-${i + 1}, ${value});`,
          ),
        ].join('')
      }

      return [
        // default
        `--${prefix}${name}: var(--${prefix}${name}-9);`,
        // scales
        ...scales.map(
          (value, i) => `--${prefix}${name}-${i + 1}: ${value};`,
        ),
      ]
    })
    .join('')
}

function createThemeTokenCssVars(
  prefix: string,
  tokens: HaloTheme['tokens'],
): string {
  const maps: Record<string, string> = {
    foreground: 'fg',
    background: 'bg',
  }

  function getAlias(name: string) {
    return maps[name] ?? name
  }

  return Object.entries(tokens)
    .map(([name, values]: [string, Record<string, string | Record<string, string>>]) => {
      return Object.entries(values)
        .map(([tokenName, value]: [string, string | Record<string, string>]) => {
          if (typeof value === 'string')
            return `--${prefix}${getAlias(name)}${tokenName !== 'default' ? `-${getAlias(tokenName)}` : ''}: ${value};`

          return Object.entries(value)
            .map(
              ([subTokenName, subValue]) =>
                `--${prefix}${getAlias(name)}-${getAlias(tokenName)}-${subTokenName !== 'default' ? getAlias(subTokenName) : ''}: ${subValue};`,
            )
            .join('')
        })
        .join('')
    })
    .join('')
}
