import type { Shortcuts } from '../types'
import { staticShortcuts } from './static'

export function shortcuts(): Shortcuts {
  return [
    ...staticShortcuts,
  ].filter(Boolean) as any as Shortcuts
}
