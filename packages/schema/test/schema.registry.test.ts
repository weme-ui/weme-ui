import { describe, expect, it } from 'vitest'
import { registrySchema } from '../src/schema'

describe('registry schema', () => {
  it('should validate', () => {
    const result = registrySchema.safeParse({
      $schema: 'https://weme-ui.github.io/schema/registry.json',
      id: 'std',
      name: 'weme-ui/std',
      items: [
        {
          type: 'component',
          name: 'Button',
          files: [
            {
              type: 'file',
              path: 'path',
              target: 'target',
            },
          ],
        },
      ],
      cssVars: {
        color: {
          primary: 'primary',
        },
      },
    })

    expect(result.success).toBe(true)
    expect(result.data).toMatchInlineSnapshot(`
      {
        "$schema": "https://weme-ui.github.io/schema/registry.json",
        "access": "public",
        "id": "std",
        "items": [
          {
            "files": [
              {
                "path": "path",
                "target": "target",
                "type": "file",
              },
            ],
            "name": "Button",
            "type": "component",
          },
        ],
        "name": "weme-ui/std",
        "prefix": "ui",
      }
    `)
  })

  it('should validate basic', async () => {
    const json = await import('./fixtures/registry/basic.json').then(r => r.default)

    const result = registrySchema.safeParse(json)

    expect(result.success).toBe(true)
    expect(result.data).toMatchInlineSnapshot(`
      {
        "$schema": "https://weme-ui.github.io/schema/registry.schema.json",
        "access": "public",
        "id": "basic",
        "items": [
          {
            "dependencies": [
              "clsx",
              "tailwind-merge",
              "tailwind-variants",
            ],
            "description": "Init dependencies and utils for Weme UI.",
            "devDependencies": [
              "@nuxt/icon",
              "@internationalized/date",
              "@unocss/nuxt",
              "@vueuse/core",
              "@weme-ui/nuxt",
              "@weme-ui/unocss-preset",
              "reka-ui",
              "unocss",
              "vue",
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
            "name": "#init",
            "title": "Init",
            "type": "init",
          },
        ],
        "name": "weme-ui/basic",
        "prefix": "ui",
      }
    `)
  })

  it('should validate full', async () => {
    const json = await import('./fixtures/registry/full.json').then(r => r.default)

    const result = registrySchema.safeParse(json)

    expect(result.success).toBe(true)
    expect(result.data).toMatchInlineSnapshot(`
      {
        "$schema": "https://weme-ui.github.io/schema/registry.schema.json",
        "access": "public",
        "description": "The basic test registry for Weme UI.",
        "id": "full",
        "items": [
          {
            "dependencies": [
              "clsx",
              "tailwind-merge",
              "tailwind-variants",
            ],
            "description": "Init dependencies and utils for Weme UI.",
            "devDependencies": [
              "@nuxt/icon",
              "@internationalized/date",
              "@unocss/nuxt",
              "@vueuse/core",
              "@weme-ui/nuxt",
              "@weme-ui/unocss-preset",
              "reka-ui",
              "unocss",
              "vue",
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
            "name": "#init",
            "title": "Init",
            "type": "init",
          },
          {
            "description": "A component to display any icon from Iconify.",
            "files": [
              {
                "path": "components/icon/icon.vue",
                "type": "component",
              },
              {
                "path": "components/icon/icon.props.ts",
                "type": "type",
              },
              {
                "path": "components/icon/icon-box.vue",
                "type": "component",
              },
              {
                "path": "components/icon/icon-box.props.ts",
                "type": "type",
              },
              {
                "path": "components/icon/icon-box.style.ts",
                "type": "style",
              },
            ],
            "name": "icon",
            "title": "Icon",
            "type": "component",
          },
          {
            "description": "Displays a button or a component that looks like a button.",
            "files": [
              {
                "path": "components/button/button.vue",
                "type": "component",
              },
              {
                "path": "components/button/button.props.ts",
                "type": "type",
              },
              {
                "path": "components/button/button.style.ts",
                "type": "style",
              },
            ],
            "name": "button",
            "registryDependencies": [
              "icon",
            ],
            "title": "Button",
            "type": "component",
          },
          {
            "cssVars": {
              "card": {
                "bg": "color.neutral.1",
                "fg": "color.neutral.11",
              },
            },
            "description": "Displays a card with header, content, and footer.",
            "files": [
              {
                "path": "components/card/card.vue",
                "type": "component",
              },
              {
                "path": "components/card/card.props.ts",
                "type": "type",
              },
              {
                "path": "components/card/card.style.ts",
                "type": "style",
              },
            ],
            "name": "card",
            "registryDependencies": [
              "icon",
            ],
            "title": "Card",
            "type": "component",
          },
        ],
        "meta": {
          "authors": [
            "Allen Luo",
          ],
          "bugs": "https://github.com/weme-ui/schema/issues",
          "homepage": "https://weme-ui.github.io/schema",
          "repository": "https://github.com/weme-ui/schema",
          "tags": [
            "weme-ui",
            "schema",
          ],
        },
        "name": "weme-ui/full",
        "prefix": "ui",
        "version": "1.0.0",
      }
    `)
  })
})
