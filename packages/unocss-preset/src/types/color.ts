export type WemeColorType = 'accent' | 'neutral'

export type WemeColorMode = 'light' | 'dark'

export type WemeColorArray<T = string> = [T, T, T, T, T, T, T, T, T, T, T, T]

export type WemeColorScales<T = string> = Record<string, WemeColorArray<T>>
