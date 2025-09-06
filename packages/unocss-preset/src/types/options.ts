import type { InlineCssVars, NestedCssVars } from '@weme-ui/schema'
import type { WemeColors } from './colors'
import type { WemeTheme } from './theme'

export interface WemePresetOptions {
  /**
   * **NOT WORK FOR COLORS**
   *
   * @default 'ui'
   */
  variablePrefix: string

  /**
   * Resolved Colors.
   */
  colors: WemeColors

  /**
   * Resolved Themes.
   */
  themes: WemeTheme[]

  /**
   * Components Css Variables.
   */
  cssVars: InlineCssVars
}

export interface UserPresetOptions {
  variablePrefix?: string
  accentColors?: Record<string, string>
  neutralColors?: Record<string, string>
  themes?: WemeTheme[]
  cssVars?: InlineCssVars | NestedCssVars
}
