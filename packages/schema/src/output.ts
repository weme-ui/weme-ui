/* eslint-disable no-console */
import process from 'node:process'
import { z } from 'zod'
import { ProjectSchema, RegistrySchema, RepositorySchema } from './v2'

const schema = process.argv[2] || 'project'

let json = ''

if (schema === 'project')
  json = JSON.stringify(z.toJSONSchema(ProjectSchema), null, 2)

if (schema === 'repository')
  json = JSON.stringify(z.toJSONSchema(RepositorySchema), null, 2)

if (schema === 'registry')
  json = JSON.stringify(z.toJSONSchema(RegistrySchema), null, 2)

console.log(`==> ${schema}\n`)
console.log(json)
