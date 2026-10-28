import type { ProjectAddedItemFileSchema, ProjectAddedItemSchema, ProjectAddedRegistrySchema, ProjectConfigSchema, ProjectLockFileSchema, RegistryConfigSchema, RegistryItemFileSchema, RegistryItemSchema, RegistryItemTypeEnum } from '@weme-ui/schema'
import type * as v from 'valibot'

export type Prettify<T> = { [K in keyof T]: T[K] } & {}

export interface HashableContent {
  content: string
  hash: string
}

export type ProjectConfig = v.InferOutput<typeof ProjectConfigSchema>
export type ProjectAddedRegistry = v.InferOutput<typeof ProjectAddedRegistrySchema>
export type ProjectPaths = Record<'~' | v.InferOutput<typeof RegistryItemTypeEnum>, string>

export type ProjectLockFile = v.InferOutput<typeof ProjectLockFileSchema>
export type ProjectAddedItem = v.InferOutput<typeof ProjectAddedItemSchema>
export type ProjectAddedItemFile = v.InferOutput<typeof ProjectAddedItemFileSchema>

export type RegistryConfig = v.InferOutput<typeof RegistryConfigSchema>
export type RegistryItem = v.InferOutput<typeof RegistryItemSchema>
export type RegistryItemFile = v.InferOutput<typeof RegistryItemFileSchema>
