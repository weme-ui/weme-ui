import type { ColorAppearance, ColorScalesArray } from '@weme-ui/colors'
import type { DeepPartial } from './utils'

export type WemeThemeDefinition = DeepPartial<Omit<WemeTheme<string>, 'id' | 'name'>> & {
  id: string
  name: string
}

export interface WemeTheme<T = ColorScalesArray> {
  id: string
  name: string
  appearance: ColorAppearance
  translucent: boolean
  radius: string
  colors: WemeThemeColors<T>
  tokens: WemeThemeTokens
}

export interface WemeThemeColors<T = string> {
  accent: T
  neutral: T
  info: T
  success: T
  warning: T
  error: T
}

export interface WemeThemeTokens {
  foreground: {
    // --ui-fg-dimmed: 5
    dimmed: string
    // --ui-fg-muted: 7
    muted: string
    // --ui-fg-toned: 9
    toned: string
    // --ui-fg: 11
    default: string
    // --ui-fg-highlighted: 12
    highlighted: string
  }
  background: {
    // --ui-bg: ${HaloPresetOptions['background'][appearance]}
    default: string
    // --ui-bg-dimmed: 2
    dimmed: string
    // --ui-bg-muted: 3
    muted: string
    // --ui-bg-elevated: 4
    elevated: string
  }
  border: {
    // --ui-border: 5
    default: string
    // --ui-border-elevated: 6
    elevated: string
  }
  ring: {
    // --ui-ring: 5
    default: string
    // --ui-ring-elevated: 6
    elevated: string
  }
}
