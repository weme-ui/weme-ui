import type { IInlineCssVar, INestedCssVar } from '@weme-ui/schema'
import type { WemeTheme } from './runtime/types'

export type * from './runtime/types'

export interface WemeNuxtOptions {
  /**
   * Prefix for css variables
   *
   * @default 'ui'
   */
  variablePrefix?: string

  /**
   * Custom accent colors
   */
  accentColors?: Record<string, string>

  /**
   * Custom neutral colors
   */
  neutralColors?: Record<string, string>

  /**
   * Custom CSS variables
   */
  cssVars?: INestedCssVar | IInlineCssVar

  themes?: WemeTheme[]

  /**
   * Import themes from directories
   */
  imports?: {
    /**
     * Directories to import themes from
     */
    themes?: string[]
  }
}
