import { describe, expect, it } from 'vitest'
import { RepositorySchema } from '../src/v2'

describe('repository schema v2', () => {
  it('should validate', () => {
    const result = RepositorySchema.safeParse({
      $schema: 'https://weme-ui.github.io/schema/repository.schema.json',
      name: 'weme-ui',
      owner: 'weme-ui',
      registries: [],
      updated: '2025-08-16T10:00:00Z',
    })

    expect(result.success).toBe(true)
    expect(result.data).toMatchInlineSnapshot(`
      {
        "$schema": "https://weme-ui.github.io/schema/repository.schema.json",
        "name": "weme-ui",
        "owner": "weme-ui",
        "registries": [],
        "updated": "2025-08-16T10:00:00Z",
      }
    `)
  })

  it('should validate with json file', async () => {
    const json = await import('./fixtures/repository/v2.json').then(r => r.default)
    const result = RepositorySchema.safeParse(json)

    expect(result).toMatchInlineSnapshot(`
      {
        "data": {
          "$schema": "https://weme-ui.github.io/schema/repository.schema.json",
          "name": "weme-ui",
          "owner": "weme-ui",
          "registries": [
            {
              "description": "The test registry for Weme UI.",
              "name": "weme-ui/test",
              "prefix": "ui",
              "statistics": {
                "blocks": 0,
                "components": 1,
                "layouts": 0,
                "pages": 0,
                "themes": 0,
              },
            },
          ],
          "updated": "2025-08-16T10:00:00Z",
          "version": "0.0.0",
        },
        "success": true,
      }
    `)
    expect(result.success).toBe(true)
    expect(result.data).toMatchInlineSnapshot(`
      {
        "$schema": "https://weme-ui.github.io/schema/repository.schema.json",
        "name": "weme-ui",
        "owner": "weme-ui",
        "registries": [
          {
            "description": "The test registry for Weme UI.",
            "name": "weme-ui/test",
            "prefix": "ui",
            "statistics": {
              "blocks": 0,
              "components": 1,
              "layouts": 0,
              "pages": 0,
              "themes": 0,
            },
          },
        ],
        "updated": "2025-08-16T10:00:00Z",
        "version": "0.0.0",
      }
    `)
  })

  it('should invalidate with invalid name', () => {
    const result = RepositorySchema.safeParse({
      name: 'weme-ui/std',
      owner: 'weme-ui',
      registries: [],
      updated: '2025-08-16T10:00:00Z',
    })

    expect(result.success).toBe(false)
  })

  it('should invalidate with invalid registry name', () => {
    const result = RepositorySchema.safeParse({
      name: 'weme-ui',
      owner: 'weme-ui',
      registries: [
        {
          name: 'weme-ui',
          prefix: 'ui',
          statistics: {
            component: 1,
            layout: 0,
            theme: 0,
            block: 0,
            page: 0,
          },
        },
      ],
      updated: '2025-08-16T10:00:00Z',
    })

    expect(result.success).toBe(false)
  })
})
