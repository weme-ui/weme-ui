import type { ColorAppearance } from '@weme-ui/colors'
import { getColorNames, toColorString, transformColor } from '@weme-ui/colors'

export function parseColor(str: string) {
  const result: {
    color: string
    scale?: number
    opacity?: number
  } = {
    color: str,
  }

  if (str.includes('/')) {
    const [colorPart, opacityStr] = str.split('/')
    const opacity = Number.parseInt(opacityStr, 10)

    if (!Number.isNaN(opacity) && opacity >= 0 && opacity <= 100) {
      result.color = colorPart
      result.opacity = opacity
    }
  }

  const parts = result.color.split('-')
  const lastPart = parts[parts.length - 1]
  const scale = Number.parseInt(lastPart, 10)

  if (!Number.isNaN(scale) && scale >= 1 && scale <= 12) {
    result.scale = scale
    result.color = parts.slice(0, -1).join('-')
  }

  return result
}

export function parseTokenValue(value: string, appearance: ColorAppearance, prefix: string): string {
  if (value.startsWith('#'))
    return toColorString(value)

  if (value.includes('.')) {
    const parts = value.split('.')
    const type = ['color', 'theme'].includes(parts[0]) ? parts.shift() : 'scales'
    const [name, scale] = parts

    const allColors = getColorNames() as any as string[]

    if (type === 'scales' && allColors.includes(name)) {
      const colorScales = transformColor({ color: name, appearance })
      const colorValue = Object.values(colorScales)[Number(scale) - 1]

      return toColorString(colorValue)
    }

    if (type === 'color')
      return `var(--${prefix}${name}${scale !== 'default' ? `-${scale}` : ''})`

    if (type === 'theme') {
      const mappings: Record<string, string> = {
        foreground: 'fg',
        background: 'bg',
        border: 'border',
        header: 'header',
        activity: 'activity',
        brand: 'brand',
        sidebar: 'sidebar',
        panel: 'panel',
      }

      return `var(--${prefix}${mappings[name]}${scale !== 'default' ? `-${scale}` : ''})`
    }
  }

  return value
}
