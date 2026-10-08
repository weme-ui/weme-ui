import * as v from 'valibot'

/**
 * 字符串, 并去除空格
 *
 * @category Schema
 */
export const TrimmedString = v.pipe(v.string(), v.trim())

/**
 * 非空字符串, 并去除空格
 *
 * @category Schema
 */
export const NonEmptyTrimmedString = v.pipe(v.string(), v.trim(), v.nonEmpty())

/**
 * 去除空格的 URL 字符串
 *
 * @category Schema
 */
export const TrimmedURLString = v.pipe(v.string(), v.url(), v.trim())

/**
 * CSS 变量
 *
 * @category Schema
 */
export const CSSVariables = v.pipe(
  v.record(
    v.pipe(NonEmptyTrimmedString, v.toLowerCase()),
    v.record(
      v.pipe(NonEmptyTrimmedString, v.toLowerCase()),
      NonEmptyTrimmedString,
    ),
  ),
  v.metadata({
    title: 'CSS 变量',
    description: '嵌套的 CSS 自定义属性映射，结构为 theme-key → variable-name → value。取值会合并进 UnoCSS preset options。',
    examples: [{ theme: { 'color-primary': 'oklch(0.55 0.2 250)' } }],
  }),
)
