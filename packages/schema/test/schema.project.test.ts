import { describe, expect, it } from 'vitest'
import { ProjectSchema } from '../src/schema'

describe('project schema v2', () => {
  it('should validate', () => {
    const result = ProjectSchema.safeParse({
      $schema: 'https://weme-ui.github.io/schema/project.schema.json',
      paths: {
        components: '~/components',
      },
      repos: [],
    })

    expect(result.success).toBe(true)
    expect(result.data).toMatchInlineSnapshot(`
      {
        "$schema": "https://weme-ui.github.io/schema/project.schema.json",
        "paths": {
          "components": "~/components",
          "composables": "~/composables",
          "layouts": "~/layouts",
          "pages": "~/pages",
          "plugins": "~/plugins",
          "themes": "~/themes",
          "types": "~/types",
          "utils": "~/utils",
        },
        "repos": [],
      }
    `)
  })

  it('should validate with json file', async () => {
    const json = await import('./fixtures/project/v2.json').then(r => r.default)
    const result = ProjectSchema.safeParse(json)

    expect(result.success).toBe(true)
    expect(result.data).toMatchInlineSnapshot(`
      {
        "$schema": "https://weme-ui.github.io/schema/project.schema.json",
        "items": {
          "https://github.com/weme-ui/weme-ui": {
            "weme-ui/test": [
              {
                "name": "badge",
                "path": "~/components/ui/badge",
                "type": "component",
              },
            ],
          },
        },
        "paths": {
          "components": "~/components",
          "composables": "~/composables",
          "layouts": "~/layouts",
          "pages": "~/pages",
          "plugins": "~/plugins",
          "themes": "~/themes",
          "types": "~/types",
          "utils": "~/utils",
        },
        "repos": [
          {
            "default": true,
            "prefix": "ui",
            "registry": "weme-ui/test",
            "repo": "https://github.com/weme-ui/weme-ui",
            "version": "0.0.0",
          },
        ],
        "unocss": {
          "accentColors": {
            "ocean": "blue",
          },
          "cssVars": {
            "card-bg": "color.neutral.1",
            "card-fg": "color.neutral.11",
          },
          "neutralColors": {
            "gunmetal": "gray",
          },
          "variablePrefix": "ui",
        },
      }
    `)
  })

  it('should invalidate with invalid registry name', () => {
    const result = ProjectSchema.safeParse({
      $schema: 'https://weme-ui.github.io/schema/project.schema.json',
      paths: {
        components: '~/components',
      },
      repos: [
        {
          registry: 'std',
        },
      ],
    })

    expect(result.success).toBe(false)
  })

  it('should invalidate with invalid item repository name', () => {
    const result = ProjectSchema.safeParse({
      $schema: 'https://weme-ui.github.io/schema/project.schema.json',
      paths: {
        components: '~/components',
      },
      repos: [],
      items: {
        'weme-ui/std': [],
      },
    })

    expect(result.error).toMatchInlineSnapshot(`
      [ZodError: [
        {
          "code": "invalid_key",
          "origin": "record",
          "issues": [
            {
              "code": "invalid_format",
              "format": "url",
              "path": [],
              "message": "Invalid URL"
            }
          ],
          "path": [
            "items",
            "weme-ui/std"
          ],
          "message": "Invalid key in record"
        }
      ]]
    `)
    expect(result.success).toBe(false)
  })
})
