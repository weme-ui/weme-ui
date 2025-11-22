import type { Preflight, WemePresetColorScales, WemePresetResolvedOptions } from '../types'
import { minifyCss, trackedColors } from '../utils'

export function colors(options: WemePresetResolvedOptions): Preflight[] {
  const colors: Preflight[] = []
  const colorNames = Object.keys(options.colors)

  if (colorNames.length === 0)
    return []

  // Light colors
  colors.push({
    layer: 'theme',
    getCSS({ generator }) {
      const light: string[] = []

      Array.from(trackedColors).forEach((key) => {
        const [name, scale] = key.split('-')

        if (colorNames.includes(name)) {
          const color = options.colors[name]

          light.push(`--${key}: ${color.light[scale as any as keyof WemePresetColorScales]};`)
        }
      })

      return minifyCss(`:root:where(:not(.dark)) {${light.join('\n')}}`, generator.config.envMode === 'dev')
    },
  })

  // Dark colors
  colors.push({
    layer: 'theme',
    getCSS({ generator }) {
      const dark: string[] = []

      Array.from(trackedColors).forEach((key) => {
        const [name, scale] = key.split('-')

        if (colorNames.includes(name)) {
          const color = options.colors[name]

          dark.push(`--${key}: ${color.dark[scale as any as keyof WemePresetColorScales]};`)
        }
      })

      return minifyCss(`:root:where(.dark) {${dark.join('\n')}}`, generator.config.envMode === 'dev')
    },
  })

  return colors
}
