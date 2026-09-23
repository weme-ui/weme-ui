import { describe, expect, it } from 'vitest'
import {
  RegistryAccessEnum,
  RegistryConfigSchema,
  RegistryPathsSchema,
} from '~/config/schema/registry'

describe('registryPathsSchema', () => {
  it('accepts wildcard and known item type keys', () => {
    expect(RegistryPathsSchema.parse({
      '*': 'src',
      'component': 'src/components',
      'util': 'src/utils',
    })).toEqual({
      '*': 'src',
      'component': 'src/components',
      'util': 'src/utils',
    })
  })

  it('rejects unknown path keys', () => {
    expect(RegistryPathsSchema.safeParse({
      unknown: 'src/unknown',
    }).success).toBe(false)
  })
})

describe('registryAccessEnum', () => {
  it('accepts public and private', () => {
    expect(RegistryAccessEnum.parse('public')).toBe('public')
    expect(RegistryAccessEnum.parse('private')).toBe('private')
  })
})

describe('registryConfigSchema', () => {
  it('lowercases name and applies defaults', () => {
    expect(RegistryConfigSchema.parse({
      name: 'Weme-UI/Slim',
      items: [],
    })).toEqual({
      name: 'weme-ui/slim',
      version: 'package',
      access: 'public',
      items: [],
    })
  })

  it('parses full registry config', () => {
    expect(RegistryConfigSchema.parse({
      name: 'weme-ui/slim',
      description: 'Slim registry',
      version: 'package',
      homepage: 'https://mouji.net/weme-ui',
      repository: 'https://github.com/weme-ui/weme-ui',
      issues: 'https://github.com/weme-ui/weme-ui/issues',
      contributors: ['allen'],
      meta: { license: 'MIT' },
      access: 'private',
      items: [{
        name: 'button',
        files: [{ path: 'button.vue' }],
      }],
      exclude: ['weme-ui/slim/legacy'],
      defaultPaths: {
        component: 'src/components',
      },
    })).toMatchObject({
      name: 'weme-ui/slim',
      description: 'Slim registry',
      version: 'package',
      access: 'private',
      exclude: ['weme-ui/slim/legacy'],
      defaultPaths: {
        component: 'src/components',
      },
      items: [{
        name: 'button',
        type: 'block',
        when: 'on-needed',
      }],
    })
  })

  it('rejects missing name or items', () => {
    expect(RegistryConfigSchema.safeParse({
      items: [],
    }).success).toBe(false)

    expect(RegistryConfigSchema.safeParse({
      name: 'weme-ui/slim',
    }).success).toBe(false)
  })

  it('rejects non-package version values', () => {
    expect(RegistryConfigSchema.safeParse({
      name: 'weme-ui/slim',
      version: '1.0.0',
      items: [],
    }).success).toBe(false)
  })
})
