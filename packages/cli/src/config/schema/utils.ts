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
