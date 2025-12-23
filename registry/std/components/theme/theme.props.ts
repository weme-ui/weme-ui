export interface ThemeProps {
  theme?: AvailableThemes
  appearance?: 'light' | 'dark' | 'auto'
  radius?: string
  translucent?: boolean
  colors?: ThemeColors
}

export interface ThemeColors {
  primary?: WemeAccentColor
  secondary?: WemeAccentColor
  neutral?: WemeNeutralColor
  info?: WemeAccentColor
  success?: WemeAccentColor
  warning?: WemeAccentColor
  danger?: WemeAccentColor
}
