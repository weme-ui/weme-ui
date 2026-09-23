import { describe, expect, it } from 'vitest'
import { WEME_PROJECT_CONFIG_FILE, WEME_REGISTRY_CONFIG_FILE } from '~/constants'

describe('constants', () => {
  it('exposes project and registry config file names', () => {
    expect(WEME_PROJECT_CONFIG_FILE).toBe('weme.config.ts')
    expect(WEME_REGISTRY_CONFIG_FILE).toBe('weme.registry.ts')
  })
})
