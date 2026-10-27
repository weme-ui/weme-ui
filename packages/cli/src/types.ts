import type { ProjectAddedItemFileSchema, ProjectAddedItemSchema, ProjectConfigSchema, ProjectLockFileSchema, RegistryConfigSchema, RegistryItemFileSchema, RegistryItemSchema, RegistryItemTypeEnum } from '@weme-ui/schema'
import type * as v from 'valibot'

type Prettify<T> = { [K in keyof T]: T[K] } & {}

type CSSVariables = Record<string, Record<string, string>>

type ProjectPaths = Record<'~' | v.InferOutput<typeof RegistryItemTypeEnum>, string>

type ProjectConfig = v.InferOutput<typeof ProjectConfigSchema>
type ProjectConfigInput = Omit<v.InferInput<typeof ProjectConfigSchema>, '$schema'>

type ProjectAddedItem = v.InferOutput<typeof ProjectAddedItemSchema>
type ProjectAddedItemFile = v.InferOutput<typeof ProjectAddedItemFileSchema>
type ResolvedProjectAddedItemFile = Prettify<ProjectAddedItemFile & {
  sourceContent: string
  destContent: string
  state: 'ok' | 'update' | 'delete-dest' | 'delete-source' | 'delete-all'
}>
type ResolvedProjectAddedItem = Prettify<Omit<ProjectAddedItem, 'files'> & {
  files: ResolvedProjectAddedItemFile[]
}>

type ProjectLockFile = v.InferOutput<typeof ProjectLockFileSchema>
type ProjectLockFileInput = Omit<v.InferInput<typeof ProjectLockFileSchema>, '$schema'>

type RegistryConfig = v.InferOutput<typeof RegistryConfigSchema>
type RegistryConfigInput = Omit<v.InferInput<typeof RegistryConfigSchema>, '$schema'>

type RegistryItem = v.InferOutput<typeof RegistryItemSchema>
type RegistryItemFile = v.InferOutput<typeof RegistryItemFileSchema>

export type {
  CSSVariables,
  Prettify,
  ProjectAddedItem,
  ProjectAddedItemFile,
  ProjectConfig,
  ProjectConfigInput,
  ProjectLockFile,
  ProjectLockFileInput,
  ProjectPaths,
  RegistryConfig,
  RegistryConfigInput,
  RegistryItem,
  RegistryItemFile,
  ResolvedProjectAddedItem,
  ResolvedProjectAddedItemFile,
}
