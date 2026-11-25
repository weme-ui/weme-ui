import { ProjectConfigSchema } from '@weme-ui/schema'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path/posix'
import * as v from 'valibot'

type ProjectConfig = v.InferOutput<typeof ProjectConfigSchema>

/**
 * Loads the config from the given file.
 *
 * @param filename - The path to the config file.
 * @returns The parsed config.
 */
export function loadConfig(filename: string): ProjectConfig | undefined {
  try {
    const configPath = resolve('./', filename)
    const configContent = readFileSync(configPath, 'utf-8')
    if (!configContent) return

    const configJson = JSON.parse(configContent)
    const parsed = v.safeParse(ProjectConfigSchema, configJson)

    if (!parsed.success) return

    return parsed.output
  } catch {}
}
