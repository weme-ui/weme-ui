import type { WemePresetOptions } from '@weme-ui/unocss-preset'

export type * from './runtime/types'

export interface WemeNuxtOptions extends WemePresetOptions {
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
