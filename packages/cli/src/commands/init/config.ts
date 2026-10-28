import { CONFIG_SCHEMA_URL, ProjectConfigSchema } from '@weme-ui/schema'
import * as v from 'valibot'
import { DEFAULT_PATHS, DEFAULT_REGISTRIES, PROJECT_CONFIG_FILENAME } from '../../constants'
import { parseRepoURL, writeFile } from '../../utils'

/**
 * Generate the default config for the project.
 *
 * @param root - The root directory of the project.
 * @returns Whether the default config was generated successfully.
 * @throws If the default config fails to generate.
 */
export async function generateDefaultConfig(root: string, repo?: string) {
  const { name } = parseRepoURL(repo)

  const registries = repo
    ? [{ registry: name, repo }]
    : DEFAULT_REGISTRIES

  const schema = v.safeParse(ProjectConfigSchema, {
    $schema: CONFIG_SCHEMA_URL,
    registries,
    paths: DEFAULT_PATHS,
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
