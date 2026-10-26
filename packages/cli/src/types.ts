import type { ProjectConfigSchema, ProjectLockFileSchema, RegistryConfigSchema, RegistryItemTypeEnum } from '@weme-ui/schema'
import type * as v from 'valibot'

type ProjectPaths = Record<'~' | v.InferOutput<typeof RegistryItemTypeEnum>, string>

type ProjectConfig = v.InferOutput<typeof ProjectConfigSchema>
type ProjectConfigInput = Omit<v.InferInput<typeof ProjectConfigSchema>, '$schema'>

type ProjectLockFile = v.InferOutput<typeof ProjectLockFileSchema>
type ProjectLockFileInput = Omit<v.InferInput<typeof ProjectLockFileSchema>, '$schema'>

type RegistryConfig = v.InferOutput<typeof RegistryConfigSchema>
type RegistryConfigInput = Omit<v.InferInput<typeof RegistryConfigSchema>, '$schema'>

export type {
  ProjectConfig,
  ProjectConfigInput,
  ProjectLockFile,
  ProjectLockFileInput,
  ProjectPaths,
  RegistryConfig,
  RegistryConfigInput,
}
