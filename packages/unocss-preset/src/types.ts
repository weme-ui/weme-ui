export type {
  AccentColorNames,
  NeutralColorNames,
  ThemeColorNames,
} from './colors/types'

/**
 * 缩放倍率 `[data-scaling]` -> `--scaling`
 *
 * - `90%` -> `0.9`
 * - `95%` -> `0.95`
 * - `100%` -> `1`
 * - `105%` -> `1.05`
 * - `110%` -> `1.1`
 *
 * @category Types
 */
export type DataScaling = '90%' | '95%' | '100%' | '105%' | '110%'

/**
 * 圆角大小 `[data-radius]` -> `--radius-factor`
 *
 * - `none` -> `0`
 * - `xs` -> `0.5`
 * - `sm` -> `0.75`
 * - `md` -> `1`
 * - `lg` -> `1.5`
 * - `full` -> `3`
 *
 * @category Types
 */
export type DataRadius = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'full'
