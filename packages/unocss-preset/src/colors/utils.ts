import type Color from 'colorjs.io'

/**
 * Convert color to oklch color string.
 */
export function toOklchString(color: Color): string {
  const oklch = color.to('oklch')
  const L = +((oklch.coords?.[0] ?? 0) * 100).toFixed(1)

  return oklch
    .toString({ precision: 4 })
    // eslint-disable-next-line regexp/no-misleading-capturing-group
    .replace(/(\S+)(.+)/, `oklch(${L}%$2`)
}

/**
 * Convert color to P3 color string.
 */
export function toP3String(color: Color): string {
  return color
    .to('p3')
    .toString({ precision: 4 })
    .replace('color(p3 ', 'color(display-p3 ')
}
