export type ColorAppearance = 'light' | 'dark'

export type ColorType = 'accent' | 'neutral'

export type ColorScalesArray<T = string> = [T, T, T, T, T, T, T, T, T, T, T, T]

export type Colors<T = string> = Record<string, ColorScalesArray<T>>
