import { existsSync, readFileSync } from 'node:fs'
import { cwd } from 'node:process'
import { resolve } from 'pathe'

const SCHEMA_FILENAME = 'component.json'

export function isInitialized() {
  return existsSync(resolve(cwd(), `./${SCHEMA_FILENAME}`))
}

export function getSchema() {
  const schemaPath = resolve(cwd(), `./${SCHEMA_FILENAME}`)

  if (!existsSync(schemaPath)) {
    return undefined
  }

  return JSON.parse(readFileSync(schemaPath, 'utf8'))
}

export function hasNuxt() {
  return hasDependency('nuxt')
}

export function hasDependency(name: string) {
  try {
    const packageContent = readFileSync(resolve(cwd(), 'package.json'), 'utf8')
    const packageJSON = packageContent ? JSON.parse(packageContent) : {}
    const { dependencies = {}, devDependencies = {} } = packageJSON

    return !!dependencies[name] || !!devDependencies[name]
  }
  catch {
    return false
  }
}
