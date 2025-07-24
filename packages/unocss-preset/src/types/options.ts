import type { Colors } from '@weme-ui/colors'
import type { HaloTheme, HaloThemeDefinition } from './themes'
import type { DeepPartial } from './utils'

export interface HaloPresetOptions<C = Colors, T = HaloTheme> {
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
   * Default background color
   *
   * @default { light: '#fff', dark: '#111' }
   */
  background: {
    light: string
    dark: string
  }

  /**
   * Themes
   */
  themes: T[]
}

export type UserPresetOptions = DeepPartial<HaloPresetOptions<Record<string, string>, HaloThemeDefinition>>
