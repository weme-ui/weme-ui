import { describe, expect, it } from 'vitest'
import { manifestSchema } from '../src/schema'

describe('manifest schema', () => {
  it('should validate', () => {
    const result = manifestSchema.safeParse({
      name: 'weme-ui/std',
      directory: 'weme-ui/std',
      items: {
        components: 1,
        layouts: 0,
        themes: 0,
        blocks: 0,
        pages: 0,
      },
      updated: '2025-08-16T10:00:00Z',
    })

    expect(result.success).toBe(true)
    expect(result.data).toMatchInlineSnapshot(`
      {
        "access": "public",
        "directory": "weme-ui/std",
        "items": {
          "blocks": 0,
          "components": 1,
          "layouts": 0,
          "pages": 0,
          "themes": 0,
        },
        "name": "weme-ui/std",
        "prefix": "ui",
        "updated": "2025-08-16T10:00:00Z",
      }
    `)
  })

  it('should validate basic', async () => {
    const json = await import('./fixtures/manifest/base.json').then(r => r.default)

    const result = manifestSchema.array().safeParse(json)

    expect(result.success).toBe(true)
    expect(result.data).toMatchInlineSnapshot(`
      [
        {
          "access": "public",
          "description": "The standard components for Weme UI.",
          "directory": "std",
          "items": {
            "blocks": 0,
            "components": 46,
            "layouts": 0,
            "pages": 0,
            "themes": 0,
          },
          "name": "weme-ui/std",
          "prefix": "ui",
          "updated": "2025-08-16T10:00:00Z",
          "version": "0.0.0",
        },
      ]
    `)
  })
})
