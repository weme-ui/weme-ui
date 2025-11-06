import { describe, expect, it } from 'vitest'
import { fetchManifestConfig, fetchRegistryConfig, fetchRegistryItems } from '../../src/utils/schema/registry'

describe('utils/schema/registry', () => {
  it('should fetch manifest.json', async () => {
    const result = await fetchManifestConfig('weme-ui/weme-ui')

    expect(result.isOk()).toBe(true)
    expect(result.unwrap().length).toBeGreaterThan(0)
  })

  it('should fetch registry.json', async () => {
    const result = await fetchRegistryConfig('weme-ui/weme-ui', 'weme-ui/std')

    expect(result.isOk()).toBe(true)
    expect(result.unwrap().name).toBe('weme-ui/std')
  })

  it('should fetch registry items', async () => {
    const result = await fetchRegistryItems(
      'weme-ui/weme-ui',
      'weme-ui/std',
      { type: 'init' },
    )

    expect(result).toMatchInlineSnapshot(`
      {
        "cssVars": {},
        "dependencies": [
          "clsx",
          "tailwind-merge",
          "tailwind-variants",
        ],
        "devDependencies": [
          "reka-ui",
        ],
        "files": [
          {
            "path": "utils/styles.ts",
            "type": "util",
          },
          {
            "path": "utils/props.ts",
            "type": "util",
          },
          {
            "path": "utils/slots.ts",
            "type": "util",
          },
        ],
      }
    `)
  })
})
