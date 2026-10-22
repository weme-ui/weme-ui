import { join } from 'node:path/posix'
import { CONFIG_SCHEMA_URL, LOCKFILE_SCHEMA_URL, ProjectConfigSchema, ProjectLockFileSchema } from '@weme-ui/schema'
import * as v from 'valibot'
import { CLI_BASE_DIR } from '../../constants'
import { writeFile } from '../../utils'
import { DEFAULT_PATHS, DEFAULT_REGISTRIES, PROJECT_CONFIG_FILENAME, PROJECT_LOCKFILE_FILENAME } from '../../utils/project'

/**
 * Generate the default config for the project.
 *
 * @param root - The root directory of the project.
 * @returns Whether the default config was generated successfully.
 * @throws If the default config fails to generate.
 */
export async function generateDefaultConfig(root: string) {
  const schema = v.safeParse(ProjectConfigSchema, {
    $schema: CONFIG_SCHEMA_URL,
    registries: DEFAULT_REGISTRIES,
    paths: DEFAULT_PATHS,
    unocss: {},
    cssVars: {},
  })

  if (!schema.success) {
    throw new Error('Failed to generate default config')
  }

  return await writeFile(
    root,
    PROJECT_CONFIG_FILENAME,
    JSON.stringify(schema.output, null, 2),
  )
}

/**
 * Generate the default lockfile for the project.
 *
 * @param root - The root directory of the project.
 * @returns Whether the default lockfile was generated successfully.
 * @throws If the default lockfile fails to generate.
 */
export async function generateDefaultLockfile(root: string) {
  const schema = v.safeParse(ProjectLockFileSchema, {
    $schema: LOCKFILE_SCHEMA_URL,
    items: [],
  })

  if (!schema.success) {
    throw new Error('Failed to generate default lockfile')
  }

  return await writeFile(
    join(root, CLI_BASE_DIR),
    PROJECT_LOCKFILE_FILENAME,
    JSON.stringify(schema.output, null, 2),
  )
}
