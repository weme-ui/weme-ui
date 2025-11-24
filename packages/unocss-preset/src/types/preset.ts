import type { InlineCssVars, NestedCssVars } from '@weme-ui/schema'
import type { PartialDeep } from 'type-fest'
import type { WemeColorMode } from './color'

export interface WemePresetOptions {
  /**
   * @default 'ui'
   */
  variablePrefix?: string

  /**
   * Custom accent colors.
   */
  accentColors?: Record<string, string>

  /**
   * Custom neutral colors.
   */
  neutralColors?: Record<string, string>

  /**
   * Custom themes.
   */
  themes?: WemePresetThemeDefinition[]

  /**
   * Custom CSS variables.
   */
  cssVars?: NestedCssVars | InlineCssVars
}

export interface WemePresetResolvedOptions {
  /**
   * **NOT WORK FOR COLORS**
   * Prefix for the CSS variables.
   *
   * @default 'ui'
   */
  variablePrefix: string

  /**
   * Resolved colors.
   */
  colors: WemePresetColors

  /**
   * Resolved themes.
   */
  themes: WemePresetTheme[]

  /**
   * Custom CSS variables.
   */
  cssVars: InlineCssVars
}

export interface WemePresetColorScales {
  1: string
  2: string
  3: string
  4: string
  5: string
  6: string
  7: string
  8: string
  9: string
  10: string
  11: string
  12: string
}

export type WemePresetColors = Record<string, {
  light: WemePresetColorScales
  dark: WemePresetColorScales
}>

export interface WemePresetTheme {
  id: string
  name: string
  priority: number
  radius: string
  appearance: WemeColorMode
  colors: WemePresetThemeColors
  tokens: WemePresetThemeTokens
}

export interface WemePresetThemeColors {
  /**
   * Primary color
   *
   * `--primary-*`
   *
   * @default 'gunmetal'
   */
  primary: string
  /**
   * Secondary color
   *
   * `--secondary-*`
   *
   * @default 'tomato'
   */
  secondary: string
  /**
   * Neutral color
   *
   * `--neutral-*`
   *
   * @default 'iron'
   */
  neutral: string
  /**
   * Info color
   *
   * `--info-*`
   *
   * @default 'ocean'
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
   * Danger color
   *
   * `--danger-*`
   *
   * @default 'ruby'
   */
  danger: string
}

export type WemePresetThemeColorNames = keyof WemePresetThemeColors

export interface WemePresetThemeTokens {
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
     * @default 'neutral.7'
     */
    muted: string
    /**
     * Toned text color.
     *
     * `--ui-fg-toned`
     *
     * @default 'neutral.9'
     */
    toned: string
    /**
     * Default text color.
     *
     * `--ui-fg`
     *
     * @default 'neutral.11'
     */
    default: string
    /**
     * Highlighted text color.
     *
     * `--ui-fg-highlighted`
     *
     * @default 'neutral.12'
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
     * @default 'neutral.1'
     */
    default: string
    /**
     * Dimmed background color.
     *
     * `--ui-bg-dimmed`
     *
     * @default 'neutral.2'
     */
    dimmed: string
    /**
     * Muted background color.
     *
     * `--ui-bg-muted`
     *
     * @default 'neutral.3'
     */
    muted: string
    /**
     * Elevated background color.
     *
     * `--ui-bg-elevated`
     *
     * @default 'neutral.4'
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
     * @default 'neutral.5'
     */
    default: string
    /**
     * Elevated border color.
     *
     * `--ui-border-elevated`
     *
     * @default 'neutral.6'
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

  /**
   * Additional tokens
   */
  [key: string]: string | Record<string, string>
}

export type WemePresetThemeDefinition = PartialDeep<WemePresetTheme>
