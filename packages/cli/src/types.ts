// ============================================================================
// Utils Type
// ============================================================================

/**
 * 松散的自动补全类型
 *
 * @category Utils
 */
export type LooseAutocomplete<T> = T | (string & {})

/**
 * 美化类型
 *
 * @category Utils
 */
export type Prettify<T> = { [K in keyof T]: T[K] } & {}
