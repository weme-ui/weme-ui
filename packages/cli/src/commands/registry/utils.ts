import { RegistryConfigSchema, RegistryItemSchema, RegistryPathsRecord } from '@weme-ui/schema'
import { defu } from 'defu'
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, dirname, join } from 'node:path/posix'
import * as v from 'valibot'

export type RegistryConfig = v.InferOutput<typeof RegistryConfigSchema>
export type RegistryItem = v.InferOutput<typeof RegistryItemSchema>
export type RegistryItemFile = RegistryItem['files'][number]
export type RegistryPaths = v.InferOutput<typeof RegistryPathsRecord>

const RegistryItemArraySchema = v.array(RegistryItemSchema)

/**
 * 加载注册表 JSON 文件
 *
 * @param cwd 工作目录
 */
export function loadRegistryJson(cwd: string): RegistryConfig {
  const registryJsonPath = join(cwd, 'registry.json')

  if (!existsSync(registryJsonPath)) {
    throw new Error(`Registry JSON file not found at ${registryJsonPath}`)
  }

  const registryJsonContent = readFileSync(registryJsonPath, 'utf-8')
  if (!registryJsonContent.trim()) {
    throw new Error(`Registry JSON file is empty at ${registryJsonPath}`)
  }

  try {
    const registryJson = JSON.parse(registryJsonContent)
    const parsed = v.safeParse(RegistryConfigSchema, registryJson)
    if (!parsed.success) {
      throw new Error(`Invalid JSON format in registry.json at ${registryJsonPath}`)
    }

    return parsed.output
  } catch {
    throw new Error(`Invalid JSON format in registry.json at ${registryJsonPath}`)
  }
}

/**
 * 写入注册表 JSON 文件
 *
 * @param cwd 工作目录
 * @param registryConfig 注册表配置
 */
export function writeRegistryJson(cwd: string, registryConfig: RegistryConfig) {
  const registryJsonPath = join(cwd, 'registry.json')

  registryConfig.dependencies = registryConfig.dependencies?.toSorted((a, b) => a.localeCompare(b))
  registryConfig.devDependencies = registryConfig.devDependencies?.toSorted((a, b) =>
    a.localeCompare(b),
  )

  registryConfig.items = sortRegistryItems(registryConfig.items)

  const parsed = v.safeParse(RegistryConfigSchema, registryConfig)
  if (!parsed.success) {
    throw new Error('Invalid registry config')
  }

  writeFileSync(registryJsonPath, JSON.stringify(parsed.output, null, 2).trim() + '\n', 'utf-8')
}

const WHEN_ORDER = {
  'on-init': 0,
  'on-depended': 1,
} as const satisfies Record<RegistryItem['when'], number>

const TYPE_ORDER = {
  util: 0,
  component: 1,
  composable: 2,
  layout: 3,
  theme: 4,
  block: 5,
  page: 6,
} as const satisfies Record<RegistryItem['type'], number>

const FILE_KIND_ORDER = {
  file: 0,
  test: 1,
  example: 2,
  doc: 3,
} as const satisfies Record<RegistryItemFile['kind'], number>

const FILE_EXT_ORDER = {
  vue: 0,
  ts: 1,
}

/**
 * 排序注册表项目
 *
 * @param items 注册表项目
 */
export function sortRegistryItems(items: RegistryItem[]): RegistryItem[] {
  const sortedItems = items
    .map((item) => ({
      ...item,
      files: item.files.toSorted((a, b) => {
        const kindDiff = FILE_KIND_ORDER[a.kind] - FILE_KIND_ORDER[b.kind]
        if (kindDiff !== 0) {
          return kindDiff
        }

        const extDiff =
          FILE_EXT_ORDER[a.path.split('.').pop() as keyof typeof FILE_EXT_ORDER] -
          FILE_EXT_ORDER[b.path.split('.').pop() as keyof typeof FILE_EXT_ORDER]
        if (extDiff !== 0) {
          return extDiff
        }

        return 0
      }),
    }))
    .toSorted((a, b) => {
      const whenDiff = WHEN_ORDER[a.when] - WHEN_ORDER[b.when]
      if (whenDiff !== 0) {
        return whenDiff
      }

      const typeDiff = TYPE_ORDER[a.type] - TYPE_ORDER[b.type]
      if (typeDiff !== 0) {
        return typeDiff
      }

      return a.name.localeCompare(b.name)
    })

  const parsed = v.safeParse(RegistryItemArraySchema, sortedItems)
  if (!parsed.success) {
    throw new Error('Invalid registry items after sorting')
  }

  return parsed.output
}

/**
 * 解析注册表路径
 *
 * @param registryConfig 注册表配置
 * @returns 解析后的注册表路径
 */
export function resolveRegistryPaths(cwd: string, registryConfig: RegistryConfig) {
  const defaults: Required<RegistryPaths> = {
    '~': 'src',
    component: '~/components',
    composable: '~/composables',
    layout: '~/layouts',
    block: '~/blocks',
    page: '~/pages',
    util: '~/utils',
    theme: '~/themes',
  }

  const merged = defu({}, registryConfig.defaultPaths ?? {}, defaults)
  const root = join(cwd, merged['~'])

  return Object.entries(merged).reduce((acc, [key, value]) => {
    const path = key === '~' ? root : value.replace('~', root)
    acc[key as keyof RegistryPaths] = existsSync(path) ? path : undefined
    return acc
  }, {} as RegistryPaths)
}

interface ScannedFile {
  kind: 'file' | 'test' | 'example' | 'doc'
  filename: string
  path: string
}

interface ScannedResult {
  [name: string]: ScannedFile[]
}

/**
 * 扫描路径
 *
 * @param path 扫描路径
 * @returns 扫描结果
 */
export function scanPath(path: string): ScannedResult {
  const files = readdirSync(path, { withFileTypes: true, recursive: true }).filter((i) =>
    i.isFile(),
  )

  return files.reduce<ScannedResult>((acc, item) => {
    const name = basename(item.parentPath)

    const type =
      name === 'examples'
        ? 'example'
        : item.name.endsWith('.test.ts')
          ? 'test'
          : item.name.endsWith('.md')
            ? 'doc'
            : 'file'

    let group =
      name !== 'composables'
        ? name === 'examples'
          ? basename(dirname(item.parentPath))
          : name
        : (item.name.split('.').shift() ?? item.name)

    if (group === 'themes') {
      group = `theme-${item.name.split('.').shift() ?? group}`
    } else if (group === 'layouts') {
      group = `layout-${item.name.split('.').shift() ?? group}`
    }

    acc[group] ??= []
    acc[group].push({
      kind: type,
      filename: item.name,
      path: join(item.parentPath, item.name),
    })

    return acc
  }, {} as ScannedResult)
}

/**
 * 检查注册表项目文件和扫描文件是否存在差异
 *
 * @param registryItemFiles 注册表项目文件
 * @param scannedFiles 扫描文件
 * @returns 是否存在差异
 */
export function hasDiffFiles(registryItemFiles: RegistryItemFile[], scannedFiles: ScannedFile[]) {
  const registryItemFilesSet = new Set(registryItemFiles.map((f) => f.path))
  const scannedFilesSet = new Set(scannedFiles.map((f) => f.path))

  if (registryItemFilesSet.size !== scannedFilesSet.size) {
    return true
  }

  for (const file of scannedFilesSet) {
    if (!registryItemFilesSet.has(file)) {
      return true
    }
  }

  return false
}
