import { describe, expect, it } from 'vitest'
import { RegistrySchema } from '../src/schema'

describe('registry schema v2', () => {
  it('should validate', () => {
    const result = RegistrySchema.safeParse({
      $schema: 'https://weme-ui.github.io/schema/registry.schema.json',
      name: 'weme-ui/test',
      items: [],
    })

    expect(result.success).toBe(true)
    expect(result.data).toMatchInlineSnapshot(`
      {
        "$schema": "https://weme-ui.github.io/schema/registry.schema.json",
        "items": [],
        "name": "weme-ui/test",
        "prefix": "ui",
      }
    `)
  })

  it('should validate with json file', async () => {
    const json = await import('./fixtures/registry/v2.json').then(r => r.default)

    const result = RegistrySchema.safeParse(json)

    expect(result.success).toBe(true)
    expect(result.data).toMatchInlineSnapshot(`
      {
        "$schema": "https://weme-ui.github.io/schema/registry.schema.json",
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
                "hash": "",
                "path": "utils/styles.ts",
                "type": "util",
              },
              {
                "hash": "",
                "path": "utils/props.ts",
                "type": "util",
              },
              {
                "hash": "",
                "path": "utils/slots.ts",
                "type": "util",
              },
            ],
            "name": "#init",
            "title": "Init",
            "type": "init",
          },
        ],
        "name": "weme-ui/test",
        "prefix": "ui",
      }
    `)
  })

  it('should invalidate with invalid name', () => {
    const result = RegistrySchema.safeParse({
      $schema: 'https://weme-ui.github.io/schema/registry.schema.json',
      name: 'weme-ui',
      items: [],
    })

    expect(result.success).toBe(false)
  })
})
