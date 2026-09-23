/**
 * 松散的自动补全类型
 *
 * @category Utils
 */
export type LooseAutocomplete<T> = T | (string & {})

/**
 * 美化类型，提供高可读性的类型提示
 *
 * @category Utils
 */
export type Prettify<T> = { [K in keyof T]: T[K] } & {}

/**
 * 填充记录类型
 *
 * @category Utils
 */
export type FillRecord<T, K extends string> = { [key in K]: T }
