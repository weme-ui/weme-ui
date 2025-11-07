import { describe, expect, it } from 'vitest'
import { projectSchema } from '../src/schema'

describe('project schema', () => {
  it('should validate', () => {
    const result = projectSchema.safeParse({
      $schema: 'https://weme-ui.github.io/schema/project.json',
      repos: [
        { repo: 'weme-ui/weme-ui', registry: 'weme-ui/std', default: true },
      ],
      paths: {
        components: '~/components',
      },
    })

    expect(result.success).toBe(true)
    expect(result.data).toMatchInlineSnapshot(`
      {
        "$schema": "https://weme-ui.github.io/schema/project.json",
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
            "registry": "weme-ui/std",
            "repo": "weme-ui/weme-ui",
          },
        ],
      }
    `)
  })

  it('should validate basic', async () => {
    const json = await import('./fixtures/project/basic.json').then(r => r.default)

    const result = projectSchema.safeParse(json)

    expect(result.success).toBe(true)
    expect(result.data).toMatchInlineSnapshot(`
      {
        "$schema": "https://weme-ui.github.io/schema/project.json",
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
            "registry": "weme-ui/basic",
            "repo": "@weme-ui/weme-ui",
          },
        ],
      }
    `)
  })

  it('should validate full', async () => {
    const json = await import('./fixtures/project/full.json').then(r => r.default)

    const result = projectSchema.safeParse(json)

    expect(result.success).toBe(true)
    expect(result.data).toMatchInlineSnapshot(`
      {
        "$schema": "https://weme-ui.github.io/schema/project.json",
        "paths": {
          "components": "~/components-1",
          "composables": "~/composables-1",
          "layouts": "~/layouts-1",
          "pages": "~/pages-1",
          "plugins": "~/plugins-1",
          "themes": "~/themes-1",
          "types": "~/types-1",
          "utils": "~/utils-1",
        },
        "repos": [
          {
            "default": true,
            "prefix": "ui",
            "registry": "weme-ui/full",
            "repo": "@weme-ui/weme-ui",
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
})
