import type { Colors } from '@weme-ui/colors'
import type { WemeTheme, WemeThemeDefinition } from './themes'
import type { DeepPartial } from './utils'

export interface WemePresetOptions<C = Colors, T = WemeTheme, V = Record<string, string>> {
  /**
   * Prefix for css variables
   *
   * @default 'ui-'
   */
  prefix: string

  /**
   * Inject reset styles
   *
   * @default true
   */
  reset: boolean

  /**
   * Accent colors
   */
  accentColors: C

  /**
   * Neutral colors
   */
  neutralColors: C

  /**
   * Background colors
   *
   * @default { light: '#fff', dark: '#111' }
   */
  background: {
    light: string
    dark: string
  }

  /**
   * Inject default themes
   *
   * @default true
   */
  injectDefaultThemes: boolean

  /**
   * Themes
   */
  themes: T[]

  /**
   * Components Css Variables
   */
  cssVars: V
}

export type UserPresetOptions = DeepPartial<WemePresetOptions<Record<string, string>, WemeThemeDefinition, Record<string, string> | Record<string, Record<string, string>>>>
