export function minifyCss(css: string) {
  return css.trim().replace(/\s+/g, ' ').replace(/\/\*[\s\S]*?\*\//g, '')
}

export function isThemeColorName(name: string) {
  return ['accent', 'neutral', 'info', 'success', 'warning', 'error'].includes(name)
}

export function resolveColor(color: string, scale?: number, opacity?: number) {
  let colorVar = `var(--ui-${color})`

  if (scale !== undefined) {
    colorVar = `var(--ui-${color}-${scale})`
  }

  if (opacity !== undefined) {
    colorVar = `color-mix(in oklch, ${colorVar} ${opacity}%, transparent)`
  }

  return colorVar
}
