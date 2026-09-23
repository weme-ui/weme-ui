import { describe, expect, it } from 'vitest'
import { LockFileItemSchema, LockFileSchema } from '~/config/schema/lock-file'

describe('lockFileItemSchema', () => {
  it('applies default type and kind', () => {
    expect(LockFileItemSchema.parse({
      name: 'button',
      path: 'src/components/button.vue',
    })).toEqual({
      name: 'button',
      type: 'block',
      kind: 'file',
      path: 'src/components/button.vue',
    })
  })

  it('lowercases name and keeps explicit type and kind', () => {
    expect(LockFileItemSchema.parse({
      name: 'Button',
      type: 'component',
      kind: 'doc',
      path: '  docs/button.md  ',
    })).toEqual({
      name: 'button',
      type: 'component',
      kind: 'doc',
      path: 'docs/button.md',
    })
  })

  it('rejects missing name or path', () => {
    expect(LockFileItemSchema.safeParse({
      path: 'a.vue',
    }).success).toBe(false)

    expect(LockFileItemSchema.safeParse({
      name: 'button',
    }).success).toBe(false)
  })
})

describe('lockFileSchema', () => {
  it('parses lock file with optional prefix', () => {
    expect(LockFileSchema.parse({
      registry: 'weme-ui/slim',
      repo: 'https://github.com/weme-ui/weme-ui',
      prefix: 'ui',
      items: [{
        name: 'button',
        type: 'component',
        kind: 'file',
        path: 'src/components/button.vue',
      }],
    })).toEqual({
      registry: 'weme-ui/slim',
      repo: 'https://github.com/weme-ui/weme-ui',
      prefix: 'ui',
      items: [{
        name: 'button',
        type: 'component',
        kind: 'file',
        path: 'src/components/button.vue',
      }],
    })
  })

  it('rejects missing registry, repo, or items', () => {
    expect(LockFileSchema.safeParse({
      repo: 'https://github.com/weme-ui/weme-ui',
      items: [],
    }).success).toBe(false)

    expect(LockFileSchema.safeParse({
      registry: 'weme-ui/slim',
      items: [],
    }).success).toBe(false)

    expect(LockFileSchema.safeParse({
      registry: 'weme-ui/slim',
      repo: 'https://github.com/weme-ui/weme-ui',
    }).success).toBe(false)
  })
})
