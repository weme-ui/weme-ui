import { describe, expect, it } from 'vitest'
import {
  ProjectConfigSchema,
  ProjectRegistrySchema,
  ProjectUnoCssSchema,
} from '~/config/schema/project'

describe('projectRegistrySchema', () => {
  it('parses required repo and registry with optional prefix', () => {
    expect(ProjectRegistrySchema.parse({
      repo: '  https://github.com/weme-ui/weme-ui  ',
      registry: '  weme-ui/slim  ',
      prefix: '  ui  ',
    })).toEqual({
      repo: 'https://github.com/weme-ui/weme-ui',
      registry: 'weme-ui/slim',
      prefix: 'ui',
    })
  })

  it('rejects missing required fields', () => {
    expect(ProjectRegistrySchema.safeParse({
      repo: 'https://github.com/weme-ui/weme-ui',
    }).success).toBe(false)
  })
})

describe('projectUnoCssSchema', () => {
  it('parses optional color and css variable maps', () => {
    expect(ProjectUnoCssSchema.parse({
      accentColors: { primary: '#000000' },
      grayColors: { gray: '#111111' },
      cssVars: { '--primary-color': '#000000' },
    })).toEqual({
      accentColors: { primary: '#000000' },
      grayColors: { gray: '#111111' },
      cssVars: { '--primary-color': '#000000' },
    })
  })

  it('allows empty object', () => {
    expect(ProjectUnoCssSchema.parse({})).toEqual({})
  })
})

describe('projectConfigSchema', () => {
  it('parses minimal valid project config', () => {
    expect(ProjectConfigSchema.parse({
      registries: [{
        repo: 'https://github.com/weme-ui/weme-ui',
        registry: 'weme-ui/slim',
      }],
      paths: {
        '*': 'src',
      },
    })).toEqual({
      registries: [{
        repo: 'https://github.com/weme-ui/weme-ui',
        registry: 'weme-ui/slim',
      }],
      paths: {
        '*': 'src',
      },
    })
  })

  it('parses project config with unoCss', () => {
    expect(ProjectConfigSchema.parse({
      registries: [{
        repo: 'https://github.com/weme-ui/weme-ui',
        registry: 'weme-ui/slim',
        prefix: 'weme',
      }],
      paths: {
        component: 'src/components',
      },
      unoCss: {
        accentColors: { primary: '#4CBBA5' },
      },
    })).toEqual({
      registries: [{
        repo: 'https://github.com/weme-ui/weme-ui',
        registry: 'weme-ui/slim',
        prefix: 'weme',
      }],
      paths: {
        component: 'src/components',
      },
      unoCss: {
        accentColors: { primary: '#4CBBA5' },
      },
    })
  })

  it('rejects missing registries or paths', () => {
    expect(ProjectConfigSchema.safeParse({
      paths: { '*': 'src' },
    }).success).toBe(false)

    expect(ProjectConfigSchema.safeParse({
      registries: [{
        repo: 'https://github.com/weme-ui/weme-ui',
        registry: 'weme-ui/slim',
      }],
    }).success).toBe(false)
  })
})
