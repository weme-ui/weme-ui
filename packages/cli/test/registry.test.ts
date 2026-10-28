import type { RegistryConfigSchema, RegistryItemSchema } from '@weme-ui/schema'
import type { InferInput } from 'valibot'
import { hash } from 'hasha'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { DEFAULT_REGISTRY_BRANCH, DEFAULT_REGISTRY_NAME } from '../src/constants'
import { fetchJSON, fetchURL } from '../src/utils/fetcher'
import { useRegistry } from '../src/utils/registry'

vi.mock('../src/utils/fetcher', () => ({
  fetchJSON: vi.fn(),
  fetchURL: vi.fn(),
}))

type RegistryConfigInput = InferInput<typeof RegistryConfigSchema>
type RegistryItemInput = InferInput<typeof RegistryItemSchema>

const BUTTON_PATH = 'components/button/button.vue'
const BUTTON_CONTENT = '<script setup lang="ts"></script>\n'
const README_PATH = 'components/button/README.md'
const README_CONTENT = '# Button\n'

function rawUrl(path: string, name = DEFAULT_REGISTRY_NAME, branch = DEFAULT_REGISTRY_BRANCH) {
  return `https://raw.githubusercontent.com/${name}/refs/heads/${branch}/${path}`
}

function item(name: string, overrides: Partial<RegistryItemInput> = {}): RegistryItemInput {
  return {
    name,
    files: [{ path: `components/${name}/${name}.vue` }],
    ...overrides,
  }
}

function mockRegistryJson(config: RegistryConfigInput) {
  vi.mocked(fetchJSON).mockResolvedValue(config)
}

function mockFileContents(
  files: Record<string, string>,
  name = DEFAULT_REGISTRY_NAME,
  branch = DEFAULT_REGISTRY_BRANCH,
) {
  vi.mocked(fetchURL).mockImplementation(async (url) => {
    const prefix = rawUrl('', name, branch)
    const path = url.startsWith(prefix) ? url.slice(prefix.length) : url
    const content = files[path]

    if (content === undefined) {
      throw new Error(`Unexpected fetchURL: ${url}`)
    }

    return content
  })
}

beforeEach(() => {
  vi.mocked(fetchJSON).mockReset()
  vi.mocked(fetchURL).mockReset()
})

describe('useRegistry', () => {
  it('fetches registry.json from the default branch', async () => {
    mockRegistryJson({ name: DEFAULT_REGISTRY_NAME, items: [] })

    await useRegistry(DEFAULT_REGISTRY_NAME).getItems()

    expect(fetchJSON).toHaveBeenCalledOnce()
    expect(fetchJSON).toHaveBeenCalledWith(rawUrl('registry.json'))
  })

  it('fetches registry.json from a custom branch', async () => {
    mockRegistryJson({ name: 'acme/ui', items: [] })

    await useRegistry('acme/ui', 'dev').getItems()

    expect(fetchJSON).toHaveBeenCalledWith(rawUrl('registry.json', 'acme/ui', 'dev'))
  })
})

describe('load', () => {
  it('caches registry.json on the same instance', async () => {
    mockRegistryJson({
      name: DEFAULT_REGISTRY_NAME,
      dependencies: ['vue'],
      items: [],
    })
    const registry = useRegistry(DEFAULT_REGISTRY_NAME)

    await registry.metadata()
    await registry.dependencies()

    expect(fetchJSON).toHaveBeenCalledOnce()
  })

  it('does not share cache across instances', async () => {
    mockRegistryJson({ name: DEFAULT_REGISTRY_NAME, items: [] })

    await useRegistry(DEFAULT_REGISTRY_NAME).getItems()
    await useRegistry(DEFAULT_REGISTRY_NAME).getItems()

    expect(fetchJSON).toHaveBeenCalledTimes(2)
  })

  it('retries after a failed fetch', async () => {
    vi.mocked(fetchJSON)
      .mockRejectedValueOnce(new Error('network'))
      .mockResolvedValueOnce({ name: DEFAULT_REGISTRY_NAME, items: [] })
    const registry = useRegistry(DEFAULT_REGISTRY_NAME)

    await expect(registry.metadata()).rejects.toThrow('network')
    await expect(registry.metadata()).resolves.toMatchObject({ name: DEFAULT_REGISTRY_NAME })
    expect(fetchJSON).toHaveBeenCalledTimes(2)
  })

  it('throws when registry.json fails schema, then retries', async () => {
    vi.mocked(fetchJSON)
      .mockResolvedValueOnce({ nope: true })
      .mockResolvedValueOnce({ name: DEFAULT_REGISTRY_NAME, items: [] })
    const registry = useRegistry(DEFAULT_REGISTRY_NAME)

    const error = await registry.metadata().then(
      () => {
        throw new Error('expected schema parse to fail')
      },
      err => err,
    )

    expect(error).toBeInstanceOf(Error)
    expect(error.message).toBe('Failed to parse registry config')
    expect(error.cause).toBeDefined()

    await expect(registry.metadata()).resolves.toMatchObject({ name: DEFAULT_REGISTRY_NAME })
  })

  it('throws on duplicate item names after schema parse', async () => {
    mockRegistryJson({
      name: DEFAULT_REGISTRY_NAME,
      items: [
        item('button'),
        item('Button', { files: [{ path: 'components/other/other.vue' }] }),
      ],
    })

    await expect(useRegistry(DEFAULT_REGISTRY_NAME).getItems()).rejects.toThrow(
      'Duplicate item name: button',
    )
  })
})

describe('metadata', () => {
  it('returns parsed metadata with access defaulted to public', async () => {
    mockRegistryJson({ name: DEFAULT_REGISTRY_NAME, items: [] })

    expect(await useRegistry(DEFAULT_REGISTRY_NAME).metadata()).toEqual({
      name: DEFAULT_REGISTRY_NAME,
      description: undefined,
      version: undefined,
      homepage: undefined,
      repository: undefined,
      issues: undefined,
      contributors: undefined,
      access: 'public',
    })
  })

  it('returns optional metadata fields', async () => {
    mockRegistryJson({
      name: DEFAULT_REGISTRY_NAME,
      description: 'Slim registry',
      version: '1.0.0',
      homepage: 'https://weme-ui.github.io/slim',
      repository: 'https://github.com/weme-ui/slim',
      issues: 'https://github.com/weme-ui/slim/issues',
      contributors: ['Luo Yi <luoyi@mouji.com>'],
      access: 'private',
      items: [],
    })

    expect(await useRegistry(DEFAULT_REGISTRY_NAME).metadata()).toEqual({
      name: DEFAULT_REGISTRY_NAME,
      description: 'Slim registry',
      version: '1.0.0',
      homepage: 'https://weme-ui.github.io/slim',
      repository: 'https://github.com/weme-ui/slim',
      issues: 'https://github.com/weme-ui/slim/issues',
      contributors: ['Luo Yi <luoyi@mouji.com>'],
      access: 'private',
    })
  })
})

describe('dependencies', () => {
  it('returns empty arrays when omitted', async () => {
    mockRegistryJson({ name: DEFAULT_REGISTRY_NAME, items: [] })
    const registry = useRegistry(DEFAULT_REGISTRY_NAME)

    expect(await registry.dependencies()).toEqual([])
    expect(await registry.devDependencies()).toEqual([])
  })

  it('returns parsed registry dependencies', async () => {
    mockRegistryJson({
      name: DEFAULT_REGISTRY_NAME,
      dependencies: ['vue^3.4.0'],
      devDependencies: ['vitest^2.0.0'],
      items: [],
    })
    const registry = useRegistry(DEFAULT_REGISTRY_NAME)

    expect(await registry.dependencies()).toEqual(['vue^3.4.0'])
    expect(await registry.devDependencies()).toEqual(['vitest^2.0.0'])
  })
})

describe('getItems', () => {
  it('returns an empty list when the registry has no items', async () => {
    mockRegistryJson({ name: DEFAULT_REGISTRY_NAME, items: [] })

    expect(await useRegistry(DEFAULT_REGISTRY_NAME).getItems()).toEqual([])
    expect(await useRegistry(DEFAULT_REGISTRY_NAME).getItems(() => true)).toEqual([])
  })

  it('returns all items with registryDependencies first', async () => {
    mockRegistryJson({
      name: DEFAULT_REGISTRY_NAME,
      items: [
        item('button', { registryDependencies: ['utils'] }),
        item('card', { registryDependencies: ['utils'] }),
        item('utils', { type: 'util', files: [{ path: 'src/utils/props.ts', type: 'util' }] }),
      ],
    })

    const items = await useRegistry(DEFAULT_REGISTRY_NAME).getItems()

    expect(items.map(entry => entry.name)).toEqual(['utils', 'button', 'card'])
  })

  it('includes registryDependencies for a filtered item and skips missing names', async () => {
    mockRegistryJson({
      name: DEFAULT_REGISTRY_NAME,
      items: [
        item('button', { registryDependencies: ['utils', 'missing'] }),
        item('utils', { type: 'util', files: [{ path: 'src/utils/props.ts', type: 'util' }] }),
        item('card'),
      ],
    })
    const registry = useRegistry(DEFAULT_REGISTRY_NAME)

    expect((await registry.getItems(entry => entry.name === 'button')).map(entry => entry.name))
      .toEqual(['utils', 'button'])
    expect(await registry.getItems(entry => entry.name === 'nope')).toEqual([])
  })

  it('dedupes a shared dependency and breaks cycles', async () => {
    mockRegistryJson({
      name: DEFAULT_REGISTRY_NAME,
      items: [
        item('a', { registryDependencies: ['b', 'c'] }),
        item('b', { registryDependencies: ['d'] }),
        item('c', { registryDependencies: ['d'] }),
        item('d'),
        item('loop-a', { registryDependencies: ['loop-b'] }),
        item('loop-b', { registryDependencies: ['loop-a'] }),
      ],
    })
    const registry = useRegistry(DEFAULT_REGISTRY_NAME)

    expect((await registry.getItems(entry => entry.name === 'a')).map(entry => entry.name))
      .toEqual(['d', 'b', 'c', 'a'])
    expect((await registry.getItems(entry => entry.name === 'loop-a')).map(entry => entry.name))
      .toEqual(['loop-b', 'loop-a'])
  })
})

describe('getItemFiles', () => {
  it('fetches file content and hash, preserving type, kind, path, and target', async () => {
    mockRegistryJson({
      name: DEFAULT_REGISTRY_NAME,
      items: [item('button', {
        files: [
          { path: BUTTON_PATH },
          { path: README_PATH, kind: 'doc', target: 'docs/button.md' },
        ],
      })],
    })
    mockFileContents({
      [BUTTON_PATH]: BUTTON_CONTENT,
      [README_PATH]: README_CONTENT,
    })
    const registry = useRegistry(DEFAULT_REGISTRY_NAME)
    const [button] = await registry.getItems()
    const files = await registry.getItemFiles(button)

    expect(files).toEqual([
      {
        type: 'component',
        kind: 'file',
        path: BUTTON_PATH,
        target: undefined,
        content: BUTTON_CONTENT,
        hash: await hash(BUTTON_CONTENT),
      },
      {
        type: 'component',
        kind: 'doc',
        path: README_PATH,
        target: 'docs/button.md',
        content: README_CONTENT,
        hash: await hash(README_CONTENT),
      },
    ])
    expect(fetchURL).toHaveBeenCalledWith(rawUrl(BUTTON_PATH))
    expect(fetchURL).toHaveBeenCalledWith(rawUrl(README_PATH))
  })

  it('returns an empty list when the item has no files', async () => {
    mockRegistryJson({
      name: DEFAULT_REGISTRY_NAME,
      items: [item('button', { files: [] })],
    })
    const registry = useRegistry(DEFAULT_REGISTRY_NAME)
    const [button] = await registry.getItems()

    expect(await registry.getItemFiles(button)).toEqual([])
    expect(fetchURL).not.toHaveBeenCalled()
  })
})

describe('getItemFileContent', () => {
  it('fetches a file by joined URL and hashes the content', async () => {
    mockFileContents({ [BUTTON_PATH]: BUTTON_CONTENT }, 'acme/ui', 'dev')
    const registry = useRegistry('acme/ui', 'dev')

    expect(await registry.getItemFileContent(BUTTON_PATH)).toEqual({
      content: BUTTON_CONTENT,
      hash: await hash(BUTTON_CONTENT),
    })
    expect(fetchURL).toHaveBeenCalledWith(rawUrl(BUTTON_PATH, 'acme/ui', 'dev'))
    expect(fetchJSON).not.toHaveBeenCalled()
  })
})
