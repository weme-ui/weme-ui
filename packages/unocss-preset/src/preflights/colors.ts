import type { Preflight, WemeColorScales, WemePresetOptions } from '../types'
import { minifyCss, trackedColors } from '../utils'

export function preflightColors(options: WemePresetOptions): Preflight {
  const colors = options.colors

  return {
    layer: 'theme',
    getCSS() {
      if (trackedColors.size === 0)
        return ''

      const light: string[] = []
      const dark: string[] = []

      Array.from(trackedColors).forEach((key) => {
        const [name, scale] = key.split('-')

        if (Object.keys(colors).includes(name)) {
          const color = colors[name]

          light.push(`--${key}: ${color.light[scale as any as keyof WemeColorScales]};`)
          dark.push(`--${key}: ${color.dark[scale as any as keyof WemeColorScales]};`)
        }
      })

      return minifyCss(`:root {
${light.join('\n')}
}

:root:where(.dark) {
${dark.join('\n')}
}
`)
    },
  }
}
