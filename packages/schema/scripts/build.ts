import type { GenericSchema } from 'valibot'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { toJsonSchema } from '@valibot/to-json-schema'
import {
  CONFIG_SCHEMA_FILENAME,
  LOCKFILE_SCHEMA_FILENAME,
  MANIFEST_SCHEMA_FILENAME,
  ProjectConfigSchema,
  ProjectLockFileSchema,
  REGISTRY_SCHEMA_FILENAME,
  RegistryConfigSchema,
  RegistryManifestSchema,
} from '../src'

interface BuildInfo {
  name: string
  schema: GenericSchema
}

const tasks: BuildInfo[] = [
  { name: CONFIG_SCHEMA_FILENAME, schema: ProjectConfigSchema },
  { name: LOCKFILE_SCHEMA_FILENAME, schema: ProjectLockFileSchema },
  { name: REGISTRY_SCHEMA_FILENAME, schema: RegistryConfigSchema },
  { name: MANIFEST_SCHEMA_FILENAME, schema: RegistryManifestSchema },
]

function log(message: string) {
  console.log('')
  console.log(message)
}

function error(message: string, err: unknown) {
  console.log('')
  console.error(message, err)
  console.log('')
}

/**
 * Recursively set `additionalProperties: false` on object schemas that omit it,
 * matching prior Zod JSON Schema output for IDE validation.
 */
function enforceNoAdditionalProperties(node: unknown): void {
  if (!node || typeof node !== 'object' || Array.isArray(node)) {
    return
  }

  const schema = node as Record<string, unknown>

  if (schema.type === 'object' && schema.additionalProperties === undefined) {
    schema.additionalProperties = false
  }

  for (const value of Object.values(schema)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        enforceNoAdditionalProperties(item)
      }
    }
    else {
      enforceNoAdditionalProperties(value)
    }
  }
}

function build(info: BuildInfo) {
  const { name, schema } = info

  const destRoot = resolve('./dist')

  if (!existsSync(destRoot)) {
    mkdirSync(destRoot, { recursive: true })
  }

  try {
    const schemaJSON = toJsonSchema(schema, {
      target: 'draft-07',
      typeMode: 'input',
      errorMode: 'ignore',
    })

    enforceNoAdditionalProperties(schemaJSON)

    const output = JSON.stringify(schemaJSON, null, 2).replaceAll('"$schema": "http://', '"$schema": "https://')

    writeFileSync(join(destRoot, name), `${output}\n`, 'utf-8')

    console.log(`  ⇢ JSON Schema \`${name}\` generated.`)
  }
  catch (e) {
    error(` 🥵 Failed to generate JSON Schema ${name}:`, e)
  }
}

async function main() {
  console.log('')
  console.log('🤓  Building JSON Schemas...')
  console.log('')

  await Promise.all(
    tasks.map(build),
  ).then(() => {
    log('🎉  JSON Schemas built successfully.')
    console.log('')
  })
}

await main()
