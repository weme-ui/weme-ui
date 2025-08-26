import { existsSync } from 'node:fs'
import { resolve } from 'pathe'
import { existsPackageJson } from './utilities'

export function existsRegistry(name: string, cwd: string) {
  return existsPackageJson(cwd) && existsSync(resolve(cwd, 'registry', name))
}

export function existsComponent(registry: string, name: string, cwd: string) {
  return existsSync(resolve(cwd, 'registry', registry, 'components', name))
}
