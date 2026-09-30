import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import * as z from 'zod'
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
  schema: z.ZodObject<any>
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

function build(info: BuildInfo) {
  const { name, schema } = info

  const destRoot = resolve('./dist')

  if (!existsSync(destRoot)) {
    mkdirSync(destRoot, { recursive: true })
  }

  try {
    const schemaJSON = z.toJSONSchema(schema, { target: 'draft-07' })
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
