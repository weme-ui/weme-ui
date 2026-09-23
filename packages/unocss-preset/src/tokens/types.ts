import type { FillRecord } from '../utils/types'

/**
 * 设计令牌值
 *
 * @category Tokens
 */
export type TokenValue<T extends string> = FillRecord<string, T>

/**
 * 设计令牌
 *
 * @category Tokens
 */
export interface Tokens {
  /**
   * Text color
   *
   * - `--text-color-highlighted`
   * - `--text-color`
   * - `--text-color-subtle`
   * - `--text-color-muted`
   * - `--text-color-inverted`
   */
  text: TokenValue<'highlighted' | 'base' | 'subtle' | 'muted' | 'inverted'>

  /**
   * Background color
   *
   * - `--bg-color`
   * - `--bg-color-muted`
   * - `--bg-color-elevated`
   * - `--bg-color-inverted`
   */
  background: TokenValue<'base' | 'muted' | 'elevated' | 'inverted'>

  /**
   * Border color
   *
   * - `--border-color`
   * - `--border-color-elevated`
   * - `--border-color-inverted`
   */
  border: TokenValue<'base' | 'elevated' | 'inverted'>

  /**
   * Additional tokens
   */
  [key: string]: string | Record<string, string>
}
