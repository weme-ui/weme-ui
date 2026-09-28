import type { CSSEntry, Preflight } from '@unocss/core'
import type { Theme } from '../theme/types'
import type { PreflightsTheme, PresetWemeUIOptions } from '~/options'
import { escapeSelector, toArray, uniq } from '@unocss/core'
import { alphaPlaceholdersRE } from '@unocss/rule-utils'
import { compressCSS, detectThemeValue, getThemeByKey, themeTracking, trackedTheme } from '../utils'

/** Exclude output for CSS Variables */
const ExcludeCssVarKeys = [
  'colors',
  'spacing',
  'breakpoint',
  'verticalBreakpoint',
  'shadow',
  'insetShadow',
  'dropShadow',
  'textShadow',
  'animation',
  'property',
  'aria',
  'media',
  'supports',
  'containers',
]

function getThemeVarsMap(theme: Theme, keys: string[]): Map<string, string> {
  const themeMap = new Map<string, string>([
    ['--spacing', theme.spacing!.DEFAULT],
  ])

  const normalizeValue = (value: string) => value.replace(alphaPlaceholdersRE, '1')

  function process(obj: any, prefix: string) {
    for (const key in obj) {
      if (Array.isArray(obj[key])) {
        themeMap.set(`--${prefix}-${key}`, normalizeValue(obj[key].join(',')))
      }
      else if (typeof obj[key] === 'object') {
        process(obj[key], `${prefix}-${key}`)
      }
      else {
        themeMap.set(`--${prefix}-${key}`, normalizeValue(obj[key]))
      }
    }
  }

  for (const key in theme) {
    if (!keys.includes(key))
      continue
    process((theme as any)[key], key)
  }

  return themeMap
}

export function theme(options: PresetWemeUIOptions): Preflight<Theme> {
  const preflightsTheme: PreflightsTheme = (typeof options.preflights?.theme === 'boolean' || typeof options.preflights?.theme === 'string')
    ? { mode: options.preflights.theme ?? 'on-demand' }
    : { mode: options.preflights?.theme?.mode ?? 'on-demand', ...options.preflights?.theme }

  return {
    layer: 'theme',
    getCSS(ctx) {
      const { theme, generator } = ctx
      const safelist = uniq(generator.config.safelist.flatMap(s => typeof s === 'function' ? s(ctx) : s))
      const { mode, process } = preflightsTheme
      if (mode === false) {
        return undefined
      }

      if (safelist.length > 0) {
        for (const s of safelist) {
          const [key, ...prop] = s.trim().split(':')
          if (key in theme && prop.length <= 1) {
            const props = prop.length === 0 ? ['DEFAULT'] : prop[0].split('-')
            const v = getThemeByKey(theme, key as keyof Theme, props)

            if (typeof v === 'string') {
              themeTracking(key, props)
              detectThemeValue(v, theme)
            }
          }
        }
      }

      let colors: CSSEntry[] = []
      let deps: CSSEntry[]
      const generateCSS = (deps: CSSEntry[], colors: CSSEntry[]) => {
        if (process) {
          for (const utility of deps) {
            for (const p of toArray(process)) {
              p(utility, ctx)
            }
          }

          for (const color of colors) {
            for (const p of toArray(process)) {
              p(color, ctx)
            }
          }
        }

        const resolvedDeps = deps.map(([key, value]) => (key && value) ? `${escapeSelector(key)}: ${value};` : undefined).filter(Boolean)
        if (resolvedDeps.length === 0) {
          return undefined
        }
        const depCSS = resolvedDeps.join('\n')

        const resolvedDarkColors: string[] = []
        const resolvedP3Colors: string[] = []
        const resolvedP3DarkColors: string[] = []
        const resolvedColors = colors.sort((a, b) => a[0].localeCompare(b[0])).map(
          ([key, value]) => {
            if (key && value) {
              const darkKey = key.replace(/^--/, '').split('-').join('-dark-')
              const darkValue = getThemeByKey(theme, 'colors', darkKey.split('-'))

              if (darkKey && darkValue) {
                resolvedDarkColors.push(`${escapeSelector(key)}: ${darkValue};`)
              }

              const p3Key = key.replace(/^--/, '').split('-').join('-p3-')
              const p3Value = getThemeByKey(theme, 'colors', p3Key.split('-'))

              if (p3Key && p3Value) {
                resolvedP3Colors.push(`${escapeSelector(key)}: ${p3Value};`)
              }

              const p3DarkKey = key.replace(/^--/, '').split('-').join('-p3-dark-')
              const p3DarkValue = getThemeByKey(theme, 'colors', p3DarkKey.split('-'))

              if (p3DarkKey && p3DarkValue) {
                resolvedP3DarkColors.push(`${escapeSelector(key)}: ${p3DarkValue};`)
              }

              return `${escapeSelector(key)}: ${value};`
            }

            return undefined
          },
        ).filter(Boolean)

        const colorCSS = resolvedColors.length > 0
          ? `
:root, .light {
${resolvedColors.join('\n')}
}`
          : ''
        const darkColorCSS = resolvedDarkColors.length > 0
          ? `
.dark {
${resolvedDarkColors.join('\n')}
}`
          : ''
        const p3ColorCSS = resolvedP3Colors.length > 0
          ? `
@supports (color: color(display-p3 1 1 1)) {
  @media (color-gamut: p3) {
    :root,
    .light {
${resolvedP3Colors.join('\n')}
    }

    .dark {
${resolvedP3DarkColors.join('\n')}
    }
  }
}`
          : ''

        return compressCSS(`
:root, :host {
${depCSS}
}
${colorCSS}
${darkColorCSS}
${p3ColorCSS}
`, generator.config.envMode === 'dev')
      }

      if (mode === 'on-demand') {
        if (trackedTheme.size === 0)
          return undefined

        colors = Array.from(trackedTheme).map((k) => {
          const [key, prop] = k.split(':') as [keyof Theme, string]

          if (key !== 'colors') {
            return undefined
          }

          const v = getThemeByKey(theme, key, prop.split('-'))

          if (typeof v === 'string') {
            return [`--${prop}`, v]
          }

          return undefined
        }).filter(Boolean) as CSSEntry[]

        deps = Array.from(trackedTheme).map((k) => {
          const [key, prop] = k.split(':') as [keyof Theme, string]

          // 跳过颜色主题变量，改为 tokens 接管
          if (key === 'colors')
            return undefined

          const v = getThemeByKey(theme, key, prop.split('-'))

          if (typeof v === 'string') {
            return [`--${key}${`${key === 'spacing' && prop === 'DEFAULT' ? '' : `-${prop}`}`}`, v]
          }

          return undefined
        }).filter(Boolean) as CSSEntry[]
      }
      else {
        const keys = Object.keys(theme).filter(k => !ExcludeCssVarKeys.includes(k))
        deps = Array.from(getThemeVarsMap(theme, keys))
        colors = Array.from(getThemeVarsMap(theme, ['colors']))
      }

      return generateCSS(deps, colors)
    },
  }
}
