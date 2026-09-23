import { describe, expect, it } from 'vitest'
import {
  RegistryItemFileKindEnum,
  RegistryItemFileSchema,
  RegistryItemSchema,
  RegistryItemTypeEnum,
  RegistryItemWhenEnum,
} from '~/config/schema/registry-item'

describe('registryItemTypeEnum', () => {
  it('accepts known item types', () => {
    for (const type of ['block', 'component', 'composable', 'ui', 'layout', 'page', 'util'] as const) {
      expect(RegistryItemTypeEnum.parse(type)).toBe(type)
    }
  })

  it('rejects unknown item types', () => {
    expect(RegistryItemTypeEnum.safeParse('unknown').success).toBe(false)
  })
})

describe('registryItemWhenEnum', () => {
  it('accepts on-init and on-needed', () => {
    expect(RegistryItemWhenEnum.parse('on-init')).toBe('on-init')
    expect(RegistryItemWhenEnum.parse('on-needed')).toBe('on-needed')
  })
})

describe('registryItemFileKindEnum', () => {
  it('accepts known file kinds', () => {
    for (const kind of ['file', 'doc', 'example', 'test'] as const) {
      expect(RegistryItemFileKindEnum.parse(kind)).toBe(kind)
    }
  })
})

describe('registryItemFileSchema', () => {
  it('applies default kind and type', () => {
    expect(RegistryItemFileSchema.parse({ path: 'button.vue' })).toEqual({
      path: 'button.vue',
      kind: 'file',
      type: 'block',
    })
  })

  it('trims path and keeps explicit fields', () => {
    expect(RegistryItemFileSchema.parse({
      path: '  button.vue  ',
      kind: 'example',
      type: 'component',
      target: '  src/ui/button.vue  ',
    })).toEqual({
      path: 'button.vue',
      kind: 'example',
      type: 'component',
      target: 'src/ui/button.vue',
    })
  })

  it('rejects missing path', () => {
    expect(RegistryItemFileSchema.safeParse({}).success).toBe(false)
  })
})

describe('registryItemSchema', () => {
  it('lowercases name and applies defaults', () => {
    expect(RegistryItemSchema.parse({
      name: 'Button',
      files: [{ path: 'button.vue' }],
    })).toEqual({
      name: 'button',
      type: 'block',
      when: 'on-needed',
      files: [{
        path: 'button.vue',
        kind: 'file',
        type: 'block',
      }],
    })
  })

  it('parses optional metadata and dependency fields', () => {
    expect(RegistryItemSchema.parse({
      name: 'card',
      title: 'Card',
      description: 'A card component',
      type: 'component',
      when: 'on-init',
      files: [{ path: 'card.vue', kind: 'file', type: 'ui' }],
      cssVars: { '--Card-Bg': '#fff' },
      dependencies: ['vue@latest'],
      devDependencies: ['vitest@latest'],
      registryDependencies: ['button'],
    })).toEqual({
      name: 'card',
      title: 'Card',
      description: 'A card component',
      type: 'component',
      when: 'on-init',
      files: [{
        path: 'card.vue',
        kind: 'file',
        type: 'ui',
      }],
      cssVars: { '--card-bg': '#fff' },
      dependencies: ['vue@latest'],
      devDependencies: ['vitest@latest'],
      registryDependencies: ['button'],
    })
  })

  it('rejects empty name and missing files', () => {
    expect(RegistryItemSchema.safeParse({
      name: '   ',
      files: [{ path: 'a.vue' }],
    }).success).toBe(false)

    expect(RegistryItemSchema.safeParse({
      name: 'button',
    }).success).toBe(false)
  })
})
