import type { DeepPartial } from './utils'

export interface WemeTheme {
  id: string
  name: string
  priority?: number
  translucent?: boolean
  radius?: string
  colors?: Partial<WemeThemeColors>
  tokens?: DeepPartial<WemeThemeTokens> & {
    dark?: DeepPartial<WemeThemeTokens>
  }
}

export type WemeThemeTokens = {
  /**
   * Foreground colors
   *
   * `--ui-fg-*`
   */
  foreground: {
    /**
     * Disabled/Muted text color.
     *
     * `--ui-fg-muted`
     *
     * @default 'color.neutral.7'
     */
    muted: string
    /**
     * Toned text color.
     *
     * `--ui-fg-toned`
     *
     * @default 'color.neutral.9'
     */
    toned: string
    /**
     * Default text color.
     *
     * `--ui-fg`
     *
     * @default 'color.neutral.11'
     */
    default: string
    /**
     * Highlighted text color.
     *
     * `--ui-fg-highlighted`
     *
     * @default 'color.neutral.12'
     */
    highlighted: string
  }

  /**
   * Background colors
   *
   * `--ui-bg-*`
   */
  background: {
    /**
     * Default background color.
     *
     * `--ui-bg`
     *
     * @default 'color.neutral.1'
     */
    default: string
    /**
     * Dimmed background color.
     *
     * `--ui-bg-dimmed`
     *
     * @default 'color.neutral.2'
     */
    dimmed: string
    /**
     * Muted background color.
     *
     * `--ui-bg-muted`
     *
     * @default 'color.neutral.3'
     */
    muted: string
    /**
     * Elevated background color.
     *
     * `--ui-bg-elevated`
     *
     * @default 'color.neutral.4'
     */
    elevated: string
  }

  /**
   * Border colors
   *
   * `--ui-border-*`
   */
  border: {
    /**
     * Default border color.
     *
     * `--ui-border`
     *
     * @default 'color.neutral.5'
     */
    default: string
    /**
     * Elevated border color.
     *
     * `--ui-border-elevated`
     *
     * @default 'color.neutral.6'
     */
    elevated: string
  }

  /**
   * Ring colors
   *
   * `--ui-ring`
   *
   * @default '$border.default'
   */
  ring: string
} | Record<string, string | Record<string, string>>

export interface WemeThemeColors {
  /**
   * Accent color
   *
   * `--accent-*`
   *
   * @default 'indigo'
   */
  accent: string
  /**
   * Neutral color
   *
   * `--neutral-*`
   *
   * @default 'gray'
   */
  neutral: string
  /**
   * Info color
   *
   * `--info-*`
   *
   * @default 'blue'
   */
  info: string
  /**
   * Success color
   *
   * `--success-*`
   *
   * @default 'green'
   */
  success: string
  /**
   * Warning color
   *
   * `--warning-*`
   *
   * @default 'orange'
   */
  warning: string
  /**
   * Error color
   *
   * `--error-*`
   *
   * @default 'red'
   */
  error: string
}
