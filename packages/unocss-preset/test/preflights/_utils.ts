import type { PreflightContext } from '@unocss/core'
import type { Theme } from '~/theme'
import { theme as buildTheme } from '~/theme/default'
import { trackedColorAliases, trackedProperties, trackedTheme } from '~/utils/track'

export function createPreflightContext(overrides: {
  envMode?: string
  safelist?: unknown[]
} = {}): PreflightContext<Theme> {
  return {
    theme: buildTheme({}),
    generator: {
      config: {
        envMode: overrides.envMode,
        safelist: overrides.safelist ?? [],
      },
    },
  } as unknown as PreflightContext<Theme>
}

export function resetTracking() {
  trackedTheme.clear()
  trackedProperties.clear()
  trackedColorAliases.clear()
}
