import type { ProjectConfig, RegistryConfig } from '~/types'
import { describe, expect, it } from 'vitest'
import { defineConfig, defineRegistry } from '~/config'

describe('defineConfig', () => {
  it('returns the same project config object', () => {
    const config: ProjectConfig = {
      registries: [
        {
          repo: 'https://github.com/weme-ui/weme-ui',
          registry: 'weme-ui/slim',
        },
      ],
      paths: {
        '*': 'src',
        'component': 'src/components',
      },
    }

    expect(defineConfig(config)).toBe(config)
  })
})

describe('defineRegistry', () => {
  it('returns the same registry config object', () => {
    const config: RegistryConfig = {
      name: 'weme-ui/slim',
      items: [
        {
          name: 'button',
          files: [{ path: 'button.vue' }],
        },
      ],
    }

    expect(defineRegistry(config)).toBe(config)
  })
})
