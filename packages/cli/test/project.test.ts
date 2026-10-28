import type { InferInput } from 'valibot'
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path/posix'
import { LOCKFILE_SCHEMA_URL, ProjectConfigSchema, ProjectLockFileSchema } from '@weme-ui/schema'
import { hash } from 'hasha'
import { addDependency } from 'nypm'
import * as v from 'valibot'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CLI_TMP_DIR, DEFAULT_PATHS, DEFAULT_REGISTRIES, PROJECT_CONFIG_FILENAME, PROJECT_LOCKFILE_FILENAME } from '../src/constants'
import { Project } from '../src/utils/project'
import { useRegistry } from '../src/utils/registry'

vi.mock('nypm', () => ({
  addDependency: vi.fn(),
}))

vi.mock('../src/utils/registry', () => ({
  useRegistry: vi.fn(),
}))

type ProjectConfigInput = InferInput<typeof ProjectConfigSchema>
type ProjectLockFileInput = InferInput<typeof ProjectLockFileSchema>

const dirs: string[] = []

const BUTTON_DEST = 'src/components/ui/button/button.vue'
const BUTTON_SOURCE = 'components/button/button.vue'
const BUTTON_CONTENT = '<script setup lang="ts"></script>\n'

function stringifyConfig(input: ProjectConfigInput = {}) {
  return JSON.stringify(v.parse(ProjectConfigSchema, input), null, 2)
}

function stringifyLockfile(input: ProjectLockFileInput) {
  return JSON.stringify(v.parse(ProjectLockFileSchema, input), null, 2)
}

function buttonItem(overrides: Partial<ProjectLockFileInput['items'][number]> = {}) {
  return {
    name: 'button',
    registry: 'weme-ui/slim',
    repo: 'https://github.com/weme-ui/slim',
    prefix: 'ui',
    files: [{
      source: BUTTON_SOURCE,
      dest: BUTTON_DEST,
    }],
    ...overrides,
  }
}

interface MockRegistryItem {
  name: string
  type?: 'component' | 'composable' | 'block' | 'layout' | 'page' | 'util' | 'theme'
}

interface MockRegistryFile {
  type: NonNullable<MockRegistryItem['type']>
  kind?: 'file' | 'doc' | 'example' | 'test'
  path: string
}

function mockRegistry(options: {
  items?: MockRegistryItem[]
  filesByName?: Record<string, MockRegistryFile[]>
} = {}) {
  const items = options.items ?? [{ name: 'button', type: 'component' as const }]
  const getItems = vi.fn(async (filter?: (item: MockRegistryItem) => boolean) =>
    filter ? items.filter(filter) : items,
  )
  const getItemFiles = vi.fn(async (item: MockRegistryItem) => {
    const files = options.filesByName?.[item.name] ?? [{
      type: 'component' as const,
      kind: 'file' as const,
      path: BUTTON_SOURCE,
    }]

    return files.map(file => ({
      type: file.type,
      kind: file.kind ?? 'file',
      path: file.path,
      content: '',
      hash: '',
    }))
  })

  vi.mocked(useRegistry).mockReturnValue({
    getItems,
    getItemFiles,
  } as unknown as ReturnType<typeof useRegistry>)

  return { getItems, getItemFiles }
}

async function readLockfile(root: string) {
  const content = await readFile(join(root, CLI_TMP_DIR, PROJECT_LOCKFILE_FILENAME), 'utf-8')
  return v.parse(ProjectLockFileSchema, JSON.parse(content))
}

async function writeProjectFile(root: string, relative: string, content: string) {
  const path = join(root, relative)
  await mkdir(dirname(path), { recursive: true })
  await writeFile(path, content)
}

async function createProjectDir(files: Record<string, string> = {}) {
  const root = await mkdtemp(join(tmpdir(), 'weme-project-'))
  dirs.push(root)

  await Promise.all(
    Object.entries(files).map(
      async ([relative, content]) => await writeProjectFile(root, relative, content),
    ),
  )

  return root
}

function initializedFiles(overrides: Record<string, string> = {}) {
  return {
    'uno.config.ts': 'export default {}\n',
    [PROJECT_CONFIG_FILENAME]: stringifyConfig(),
    [join(CLI_TMP_DIR, PROJECT_LOCKFILE_FILENAME)]: stringifyLockfile({ items: [] }),
    'package.json': JSON.stringify({ name: 'tmp' }),
    [join(CLI_TMP_DIR, 'uno.config.ts')]: 'export default {}\n',
    ...overrides,
  }
}

afterEach(async () => {
  await Promise.all(dirs.splice(0).map(async dir => await rm(dir, { recursive: true, force: true })))
})

describe('info', () => {
  it('uses DEFAULT_PATHS and DEFAULT_REGISTRIES when config is missing', async () => {
    const root = await createProjectDir()
    const info = await new Project(root).info()

    expect(info.root).toBe(root)
    expect(info.paths['~']).toBe('src')
    expect(info.paths.component).toBe('src/components')
    expect(info.paths.composable).toBe('src/composables')
    expect(info.registries).toEqual(DEFAULT_REGISTRIES)
    expect(info.defaultRegistry).toEqual(DEFAULT_REGISTRIES[0])
  })

  it('uses DEFAULT_PATHS when paths is empty', async () => {
    const root = await createProjectDir({
      [PROJECT_CONFIG_FILENAME]: stringifyConfig({ paths: {} }),
    })
    const info = await new Project(root).info()
    const fromDefaults = await new Project(
      await createProjectDir({
        [PROJECT_CONFIG_FILENAME]: stringifyConfig({ paths: DEFAULT_PATHS }),
      }),
    ).info()

    expect(info.paths).toEqual(fromDefaults.paths)
    expect(info.paths['~']).toBe('src')
    expect(info.paths.component).toBe('src/components')
  })

  it('fills missing keys from DEFAULT_PATHS when only ~ is overridden', async () => {
    const root = await createProjectDir({
      [PROJECT_CONFIG_FILENAME]: stringifyConfig({
        paths: { '~': 'app' },
      }),
    })
    const info = await new Project(root).info()

    expect(info.paths['~']).toBe('app')
    expect(info.paths.component).toBe('app/components')
    expect(info.paths.page).toBe('app/pages')
  })

  it('keeps paths without ~ relative to the project root', async () => {
    const root = await createProjectDir({
      [PROJECT_CONFIG_FILENAME]: stringifyConfig({
        paths: { page: 'app/pages' },
      }),
    })
    const info = await new Project(root).info()

    expect(info.paths.page).toBe('app/pages')
    expect(info.paths.component).toBe('src/components')
  })

  it('relativizes an absolute ~ inside the project root', async () => {
    const root = await createProjectDir()
    await writeProjectFile(root, PROJECT_CONFIG_FILENAME, stringifyConfig({
      paths: { '~': join(root, 'app') },
    }))
    const info = await new Project(root).info()

    expect(info.paths['~']).toBe('app')
    expect(info.paths.component).toBe('app/components')
  })

  it('expands ~ and ~/ aliases', async () => {
    const root = await createProjectDir({
      [PROJECT_CONFIG_FILENAME]: stringifyConfig({
        paths: {
          '~': 'src',
          'component': '~',
          'util': '~/lib',
          'theme': '~/',
        },
      }),
    })
    const info = await new Project(root).info()

    expect(info.paths.component).toBe('src')
    expect(info.paths.util).toBe('src/lib')
    expect(info.paths.theme).toBe('src')
  })

  it('falls back to default paths when config JSON is invalid', async () => {
    const root = await createProjectDir({
      [PROJECT_CONFIG_FILENAME]: '{ not json',
    })
    const project = new Project(root)

    expect(await project.hasProjectConfig()).toBe(true)
    expect((await project.info()).paths['~']).toBe('src')
    expect((await project.info()).paths.component).toBe('src/components')
  })

  it('falls back to default paths when config fails schema', async () => {
    const root = await createProjectDir({
      [PROJECT_CONFIG_FILENAME]: JSON.stringify({ paths: 123 }),
    })
    const project = new Project(root)

    expect(await project.hasProjectConfig()).toBe(true)
    expect((await project.info()).paths).toMatchObject({
      '~': 'src',
      'component': 'src/components',
    })
  })

  it('uses the first registry as defaultRegistry', async () => {
    const root = await createProjectDir({
      [PROJECT_CONFIG_FILENAME]: stringifyConfig({
        registries: [
          { registry: 'acme/ui', prefix: 'acme' },
          { registry: 'weme-ui/slim' },
        ],
      }),
    })
    const info = await new Project(root).info()

    expect(info.defaultRegistry).toEqual({ registry: 'acme/ui', prefix: 'acme' })
    expect(info.registries).toHaveLength(2)
  })
})

describe('file presence', () => {
  it('reports missing project files as absent', async () => {
    const project = new Project(await createProjectDir())

    expect(await project.hasPackageJson()).toBe(false)
    expect(await project.hasProjectConfig()).toBe(false)
    expect(await project.hasLockfile()).toBe(false)
    expect(await project.hasUnoConfig()).toBe(false)
    expect(await project.isInitialized()).toBe(false)
  })

  it('treats whitespace-only files as missing', async () => {
    const project = new Project(await createProjectDir({
      'package.json': '   \n',
      [PROJECT_CONFIG_FILENAME]: '  ',
      [join(CLI_TMP_DIR, PROJECT_LOCKFILE_FILENAME)]: '\n',
      [join(CLI_TMP_DIR, 'uno.config.ts')]: ' \n',
    }))

    expect(await project.hasPackageJson()).toBe(false)
    expect(await project.hasProjectConfig()).toBe(false)
    expect(await project.hasLockfile()).toBe(false)
    expect(await project.hasUnoConfig()).toBe(false)
  })

  it('does not treat root uno.config.ts as the CLI uno config', async () => {
    const project = new Project(await createProjectDir({
      'uno.config.ts': 'export default {}\n',
    }))

    expect(await project.hasUnoConfig()).toBe(false)
  })

  it('detects present project files', async () => {
    const project = new Project(await createProjectDir(initializedFiles()))

    expect(await project.hasPackageJson()).toBe(true)
    expect(await project.hasProjectConfig()).toBe(true)
    expect(await project.hasLockfile()).toBe(true)
    expect(await project.hasUnoConfig()).toBe(true)
    expect(await project.isInitialized()).toBe(true)
  })

  it('is not initialized when any required file is missing', async () => {
    const files: Record<string, string> = { ...initializedFiles() }
    delete files['package.json']
    const project = new Project(await createProjectDir(files))

    expect(await project.hasPackageJson()).toBe(false)
    expect(await project.isInitialized()).toBe(false)
  })
})

describe('lockfile items', () => {
  it('returns false and empty files when lockfile is missing or invalid', async () => {
    const missing = new Project(await createProjectDir())
    expect(await missing.hasAddedItem('button')).toBe(false)
    expect(await missing.getAddedItemFiles('button')).toEqual([])

    const invalid = new Project(await createProjectDir({
      [join(CLI_TMP_DIR, PROJECT_LOCKFILE_FILENAME)]: '{ not json',
    }))
    expect(await invalid.hasAddedItem('button')).toBe(false)
    expect(await invalid.getAddedItemFiles('button')).toEqual([])

    const schemaInvalid = new Project(await createProjectDir({
      [join(CLI_TMP_DIR, PROJECT_LOCKFILE_FILENAME)]: JSON.stringify({ items: 'nope' }),
    }))
    expect(await schemaInvalid.hasAddedItem('button')).toBe(false)
    expect(await schemaInvalid.getAddedItemFiles('button')).toEqual([])
  })

  it('matches bare names against the default registry', async () => {
    const root = await createProjectDir({
      [join(CLI_TMP_DIR, PROJECT_LOCKFILE_FILENAME)]: stringifyLockfile({
        items: [buttonItem()],
      }),
    })
    const project = new Project(root)

    expect(await project.hasAddedItem('button')).toBe(true)
    expect(await project.hasAddedItem('  button/  ')).toBe(true)
    expect(await project.hasAddedItem('weme-ui/slim/button')).toBe(true)
    expect(await project.hasAddedItem('acme/ui/button')).toBe(false)
  })

  it('uses the first configured registry for bare item names', async () => {
    const root = await createProjectDir({
      [PROJECT_CONFIG_FILENAME]: stringifyConfig({
        registries: [{ registry: 'acme/ui' }],
      }),
      [join(CLI_TMP_DIR, PROJECT_LOCKFILE_FILENAME)]: stringifyLockfile({
        items: [buttonItem()],
      }),
    })
    const project = new Project(root)

    expect(await project.hasAddedItem('button')).toBe(false)
    expect(await project.hasAddedItem('weme-ui/slim/button')).toBe(true)
  })

  it('returns dest content and hash for an added item', async () => {
    const root = await createProjectDir({
      [join(CLI_TMP_DIR, PROJECT_LOCKFILE_FILENAME)]: stringifyLockfile({
        items: [buttonItem()],
      }),
      [BUTTON_DEST]: BUTTON_CONTENT,
    })
    const files = await new Project(root).getAddedItemFiles('button')

    expect(files).toEqual([{
      type: 'component',
      registry: 'weme-ui/slim',
      repo: 'https://github.com/weme-ui/slim',
      prefix: 'ui',
      kind: 'file',
      source: BUTTON_SOURCE,
      dest: BUTTON_DEST,
      content: BUTTON_CONTENT,
      hash: await hash(BUTTON_CONTENT),
    }])
  })

  it('throws when the lockfile item dest is missing or blank', async () => {
    const missingDest = new Project(await createProjectDir({
      [join(CLI_TMP_DIR, PROJECT_LOCKFILE_FILENAME)]: stringifyLockfile({
        items: [buttonItem()],
      }),
    }))
    await expect(missingDest.getAddedItemFiles('button')).rejects.toThrow(
      `File ${BUTTON_DEST} not found in the project`,
    )

    const blankDest = new Project(await createProjectDir({
      [join(CLI_TMP_DIR, PROJECT_LOCKFILE_FILENAME)]: stringifyLockfile({
        items: [buttonItem()],
      }),
      [BUTTON_DEST]: '  \n',
    }))
    await expect(blankDest.getAddedItemFiles('button')).rejects.toThrow(
      `File ${BUTTON_DEST} not found in the project`,
    )
  })

  it('throws when the item is not in the lockfile', async () => {
    const project = new Project(await createProjectDir({
      [join(CLI_TMP_DIR, PROJECT_LOCKFILE_FILENAME)]: stringifyLockfile({
        items: [buttonItem()],
      }),
      [BUTTON_DEST]: BUTTON_CONTENT,
    }))

    await expect(project.getAddedItemFiles('missing')).rejects.toThrow(
      'Item missing not found in the lockfile',
    )
    await expect(project.getAddedItemFiles('weme-ui/slim/button')).rejects.toThrow(
      'Item weme-ui/slim/button not found in the lockfile',
    )
  })
})

describe('addItem', () => {
  beforeEach(() => {
    vi.mocked(useRegistry).mockReset()
  })

  it('delegates to updateItem when the item is already added', async () => {
    mockRegistry()
    const root = await createProjectDir({
      [join(CLI_TMP_DIR, PROJECT_LOCKFILE_FILENAME)]: stringifyLockfile({
        items: [buttonItem()],
      }),
    })
    const project = new Project(root)
    const updateItem = vi.spyOn(project, 'updateItem')

    expect(await project.addItem('button')).toBe(false)
    expect(updateItem).toHaveBeenCalledWith('button')
    expect(useRegistry).not.toHaveBeenCalled()
  })

  it('throws when the item is not in the registry', async () => {
    mockRegistry({ items: [] })
    const project = new Project(await createProjectDir())

    await expect(project.addItem('button')).rejects.toThrow(
      'Item button not found in the registry weme-ui/slim',
    )
    expect(useRegistry).toHaveBeenCalledWith('weme-ui/slim')
  })

  it('uses the default registry for a bare item name', async () => {
    mockRegistry()
    const root = await createProjectDir({
      [PROJECT_CONFIG_FILENAME]: stringifyConfig({
        registries: [{ registry: 'acme/ui' }],
      }),
    })

    expect(await new Project(root).addItem('button')).toBe(true)
    expect(useRegistry).toHaveBeenCalledWith('acme/ui')
  })

  it('uses the registry from a qualified item name', async () => {
    mockRegistry()
    await new Project(await createProjectDir()).addItem('weme-ui/slim/button')

    expect(useRegistry).toHaveBeenCalledWith('weme-ui/slim')
  })

  it('writes a lockfile entry with component dest under the registry prefix', async () => {
    mockRegistry()
    const root = await createProjectDir({
      [PROJECT_CONFIG_FILENAME]: stringifyConfig({
        registries: [{
          registry: 'weme-ui/slim',
          repo: 'https://github.com/weme-ui/slim',
          prefix: 'ui',
        }],
      }),
    })
    const project = new Project(root)

    expect(await project.addItem('button')).toBe(true)
    expect(await project.hasAddedItem('button')).toBe(true)
    expect(await readLockfile(root)).toEqual({
      $schema: LOCKFILE_SCHEMA_URL,
      items: [{
        name: 'button',
        type: 'component',
        registry: 'weme-ui/slim',
        repo: 'https://github.com/weme-ui/slim',
        prefix: 'ui',
        files: [{
          kind: 'file',
          source: BUTTON_SOURCE,
          dest: 'src/components/ui/button.vue',
        }],
      }],
    })
  })

  it('resolves dest without prefix for non-component files', async () => {
    mockRegistry({
      items: [{ name: 'utils', type: 'util' }],
      filesByName: {
        utils: [{ type: 'util', kind: 'file', path: 'src/utils/props.ts' }],
      },
    })
    const root = await createProjectDir({
      [PROJECT_CONFIG_FILENAME]: stringifyConfig({
        registries: [{ registry: 'weme-ui/slim', prefix: 'ui' }],
      }),
    })

    expect(await new Project(root).addItem('utils')).toBe(true)
    expect((await readLockfile(root)).items[0].files[0]).toEqual({
      kind: 'file',
      source: 'src/utils/props.ts',
      dest: 'src/utils/props.ts',
    })
  })

  it('falls back to ~ when the file type has no matching path', async () => {
    mockRegistry({
      filesByName: {
        button: [{ type: 'unknown' as MockRegistryFile['type'], kind: 'file', path: BUTTON_SOURCE }],
      },
    })
    const root = await createProjectDir()

    expect(await new Project(root).addItem('button')).toBe(true)
    expect((await readLockfile(root)).items[0].files[0].dest).toBe('src/button.vue')
  })

  it('expands dest from custom project paths', async () => {
    mockRegistry()
    const root = await createProjectDir({
      [PROJECT_CONFIG_FILENAME]: stringifyConfig({
        paths: { '~': 'app' },
        registries: [{ registry: 'weme-ui/slim', prefix: 'ui' }],
      }),
    })

    expect(await new Project(root).addItem('button')).toBe(true)
    expect((await readLockfile(root)).items[0].files[0].dest).toBe('app/components/ui/button.vue')
  })

  it('records multiple files and kinds for one item', async () => {
    mockRegistry({
      filesByName: {
        button: [
          { type: 'component', kind: 'file', path: BUTTON_SOURCE },
          { type: 'component', kind: 'doc', path: 'components/button/README.md' },
        ],
      },
    })
    const root = await createProjectDir()

    expect(await new Project(root).addItem('button')).toBe(true)
    expect((await readLockfile(root)).items[0].files).toEqual([
      { kind: 'file', source: BUTTON_SOURCE, dest: 'src/components/button.vue' },
      { kind: 'doc', source: 'components/button/README.md', dest: 'src/components/README.md' },
    ])
  })

  it('appends to an existing lockfile without dropping other items', async () => {
    mockRegistry()
    const root = await createProjectDir({
      [join(CLI_TMP_DIR, PROJECT_LOCKFILE_FILENAME)]: stringifyLockfile({
        items: [buttonItem({
          name: 'card',
          files: [{
            source: 'components/card/card.vue',
            dest: 'src/components/ui/card.vue',
          }],
        })],
      }),
    })

    expect(await new Project(root).addItem('button')).toBe(true)

    const lockfile = await readLockfile(root)
    expect(lockfile.items.map(item => item.name)).toEqual(['card', 'button'])
  })

  it('writes every item returned by the registry, including dependencies', async () => {
    const items: MockRegistryItem[] = [
      { name: 'utils', type: 'util' },
      { name: 'button', type: 'component' },
    ]
    const filesByName: Record<string, MockRegistryFile[]> = {
      utils: [{ type: 'util', kind: 'file', path: 'src/utils/props.ts' }],
      button: [{ type: 'component', kind: 'file', path: BUTTON_SOURCE }],
    }
    vi.mocked(useRegistry).mockReturnValue({
      getItems: vi.fn(async () => items),
      getItemFiles: vi.fn(async (item: MockRegistryItem) =>
        (filesByName[item.name] ?? []).map(file => ({
          type: file.type,
          kind: file.kind ?? 'file',
          path: file.path,
          content: '',
          hash: '',
        })),
      ),
    } as unknown as ReturnType<typeof useRegistry>)

    const root = await createProjectDir()
    expect(await new Project(root).addItem('button')).toBe(true)
    expect((await readLockfile(root)).items.map(item => item.name)).toEqual(['utils', 'button'])
  })

  it('uses matching configured registry metadata for a qualified name', async () => {
    mockRegistry()
    const root = await createProjectDir({
      [PROJECT_CONFIG_FILENAME]: stringifyConfig({
        registries: [
          { registry: 'weme-ui/slim', prefix: 'slim' },
          { registry: 'acme/ui', repo: 'https://github.com/acme/ui', prefix: 'acme' },
        ],
      }),
    })

    expect(await new Project(root).addItem('acme/ui/button')).toBe(true)
    expect(useRegistry).toHaveBeenCalledWith('acme/ui')
    expect((await readLockfile(root)).items[0]).toMatchObject({
      name: 'button',
      registry: 'acme/ui',
      repo: 'https://github.com/acme/ui',
      prefix: 'acme',
      files: [{ dest: 'src/components/acme/button.vue' }],
    })
  })

  it('falls back to defaultRegistry metadata when the parsed registry is not configured', async () => {
    mockRegistry()
    const root = await createProjectDir({
      [PROJECT_CONFIG_FILENAME]: stringifyConfig({
        registries: [{
          registry: 'weme-ui/slim',
          repo: 'https://github.com/weme-ui/slim',
          prefix: 'ui',
        }],
      }),
    })

    expect(await new Project(root).addItem('acme/ui/button')).toBe(true)
    expect(useRegistry).toHaveBeenCalledWith('acme/ui')
    expect((await readLockfile(root)).items[0]).toMatchObject({
      registry: 'weme-ui/slim',
      repo: 'https://github.com/weme-ui/slim',
      prefix: 'ui',
    })
  })
})

describe('dependencies', () => {
  beforeEach(() => {
    vi.mocked(addDependency).mockReset()
  })

  it('adds dependencies silently in the project root', async () => {
    const root = await createProjectDir()
    await new Project(root).addDependencies(['vue'])

    expect(addDependency).toHaveBeenCalledWith(['vue'], {
      cwd: root,
      silent: true,
    })
  })

  it('adds dev dependencies silently in the project root', async () => {
    const root = await createProjectDir()
    await new Project(root).addDevDependencies(['vitest'])

    expect(addDependency).toHaveBeenCalledWith(['vitest'], {
      cwd: root,
      silent: true,
      dev: true,
    })
  })
})
