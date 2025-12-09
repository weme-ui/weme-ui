import { existsSync } from 'node:fs'
import path from 'pathe'
import { describe, expect, it } from 'vitest'
import { Project } from '../src/utils/schema/project'

describe('project schema', () => {
  const base = path.resolve('./packages/cli/test/fixtures/project')
  const project = new Project(base)

  it('should get schema', async () => {
    const schema = await project.schema()

    expect(schema.isOk()).toBe(true)

    if (schema.isOk()) {
      expect(schema.value.paths).toMatchInlineSnapshot(`
        {
          "components": "~/components",
          "composables": "~/composables",
          "layouts": "~/layouts",
          "pages": "~/pages",
          "plugins": "~/plugins",
          "themes": "~/themes",
          "types": "~/types",
          "utils": "~/utils",
        }
      `)
    }
  })

  it('should get registries', async () => {
    const registries = await project.registries()

    expect(registries).toMatchInlineSnapshot(`
      [
        {
          "default": true,
          "prefix": "ui",
          "registry": "weme-ui/std",
          "repo": "https://github.com/weme-ui/weme-ui",
        },
      ]
    `)
  })

  it('should has registry', async () => {
    const has = await project.hasRegistry(
      'https://github.com/weme-ui/weme-ui',
      'weme-ui/std',
    )

    expect(has).toBe(true)
  })

  it('should get items', async () => {
    const items = await project.items()

    expect(items.length).toBe(2)
  })

  it('should has item', async () => {
    const item = await project.hasItem(
      'https://github.com/weme-ui/weme-ui',
      'weme-ui/std',
      'foo',
    )

    expect(item).toBe(true)
  })

  it('should get path with registry', async () => {
    const path = await project.withRegistryPath(
      'https://github.com/weme-ui/weme-ui',
      'weme-ui/std',
      'components/foo/foo.props.ts',
    )

    expect(existsSync(path)).toBe(true)
  })

  it('should get item', async () => {
    const item = await project.getItem(
      'https://github.com/weme-ui/weme-ui',
      'weme-ui/std',
      'foo',
    )

    expect(item?.files?.length).toBe(3)
  })
})
