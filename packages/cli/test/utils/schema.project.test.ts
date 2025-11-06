import { describe, expect, it } from 'vitest'
import { loadProjectConfig, loadProjectInfo, parsePaths, resolvePaths, resolveProjectPaths } from '../../src/utils/schema/project'

describe('utils/schema/project', () => {
  it('should load weme.config.json', () => {
    const result = loadProjectConfig('packages/cli/test/fixtures/project')

    expect(result.isOk()).toBe(true)
  })

  it('should return error if weme.config.json not found', () => {
    const result = loadProjectConfig('packages/cli/test/fixtures/empty')

    expect(result.isErr()).toBe(true)
    expect(result.unwrapErr()).toBe('Could not find your project configuration file!')
  })

  it('should load project information', async () => {
    const result = await loadProjectInfo('packages/cli/test/fixtures/project')

    expect(result.isOk()).toBe(true)
    expect(result.unwrap()).toMatchInlineSnapshot(`
      {
        "description": "The test project for Weme UI.",
        "name": "test",
        "registries": [
          {
            "access": "public",
            "available": 46,
            "default": true,
            "description": "The standard components for Weme UI.",
            "installed": 0,
            "name": "weme-ui/std",
            "prefix": "ui",
            "repo": "https://github.com/weme-ui/weme-ui",
            "version": "0.0.0",
          },
        ],
        "repos": [
          "https://github.com/weme-ui/weme-ui",
        ],
        "version": "1.0.0",
      }
    `)
  })

  it('should resolve project paths', () => {
    const result = resolveProjectPaths('packages/cli/test/fixtures/project', true)

    expect(result.isOk()).toBe(true)
  })

  it('should resolve paths', () => {
    console.log(process.cwd())
    const result = resolvePaths('packages/cli/test/fixtures/project', {
      components: '~/components',
    })

    expect(result.isOk()).toBe(true)
  })

  it('should parse paths', () => {
    const result = parsePaths({
      components: '~/components',
    })

    expect(result.isOk()).toBe(true)
    expect(result.unwrap()).toMatchInlineSnapshot(`
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
  })
})
