import * as z from 'zod'

/**
 * 字符串, 并去除空格
 *
 * @category Schema
 */
export const TrimmedString = z.string().trim()

/**
 * 非空字符串, 并去除空格
 *
 * @category Schema
 */
export const NonEmptyTrimmedString = z.string().trim().min(1)

/**
 * 去除空格的 URL 字符串
 *
 * @category Schema
 */
export const TrimmedURLString = z.url().trim()

/**
 * CSS 变量
 *
 * @category Schema
 */
export const CSSVariables = z.record(
  NonEmptyTrimmedString.lowercase(),
  z.record(NonEmptyTrimmedString.lowercase(), NonEmptyTrimmedString),
)
  .meta({
    title: 'CSS variables',
    description:
      'A nested map of CSS custom properties, structured as theme-key → variable-name → value. Values are merged into UnoCSS preset options.',
    examples: [{ theme: { 'color-primary': 'oklch(0.55 0.2 250)' } }],
  })
