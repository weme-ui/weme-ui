import type { ColorAppearance, ColorScalesArray } from '@weme-ui/colors'
import type { DeepPartial } from './utils'

export type HaloThemeDefinition = DeepPartial<Omit<HaloTheme<string>, 'id' | 'name'>> & {
  id: string
  name: string
}

export interface HaloTheme<T = ColorScalesArray> {
  id: string
  name: string
  appearance: ColorAppearance
  translucent: boolean
  radius: string
  colors: HaloThemeColors<T>
  tokens: HaloThemeTokens
}

export interface HaloThemeColors<T = string> {
  accent: T
  neutral: T
  info: T
  success: T
  warning: T
  error: T
}

export interface HaloThemeTokens {
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
    // --ui-border-toned: 6
    elevated: string
  }
  header: {
    // --ui-header-height
    height: string
    // --ui-header-bg
    background: string
  }
  brand: {
    // --ui-brand-fg
    foreground: string
    // --ui-brand-bg
    background: string
  }
  activity: {
    // --ui-activity-width
    width: string
    foreground: {
      // --ui-activity-fg
      default: string
      // --ui-activity-fg-highlighted
      highlighted: string
    }
    // --ui-activity-bg
    background: string
  }
  sidebar: {
    // --ui-sidebar-width
    width: string
    // --ui-sidebar-bg
    background: string
  }
  panel: {
    foreground: {
      // --ui-panel-fg
      default: string
      // --ui-panel-fg-highlighted
      highlighted: string
    }
    // --ui-panel-bg
    background: string
  }
}
