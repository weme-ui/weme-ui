#!/usr/bin/env bun

import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'

interface PackageManifest {
  name?: string
  catalogs?: Record<string, Record<string, string>>
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
  optionalDependencies?: Record<string, string>
}

function rewriteField(
  field: Record<string, string> | undefined,
  catalogs: Record<string, Record<string, string>>,
  pkgName: string,
): boolean {
  if (!field) {
    return false
  }

  let changed = false

  for (const [name, version] of Object.entries(field)) {
    if (!version.startsWith('catalog:')) {
      continue
    }

    const catalogName = version.slice('catalog:'.length)
    const resolved = catalogs[catalogName]?.[name]
    if (!resolved) {
      throw new Error(`[${pkgName}] cannot resolve ${name}@${version}`)
    }

    field[name] = resolved
    changed = true
  }

  return changed
}

const pkgPath = join(process.cwd(), 'package.json')
const root = JSON.parse(readFileSync(join(import.meta.dir, '..', 'package.json'), 'utf8')) as PackageManifest

if (!root.catalogs) {
  throw new Error('root package.json is missing catalogs')
}

const pkg = JSON.parse(readFileSync(pkgPath, 'utf8')) as PackageManifest
const pkgName = pkg.name ?? pkgPath

const changed = [
  rewriteField(pkg.dependencies, root.catalogs, pkgName),
  rewriteField(pkg.devDependencies, root.catalogs, pkgName),
  rewriteField(pkg.peerDependencies, root.catalogs, pkgName),
  rewriteField(pkg.optionalDependencies, root.catalogs, pkgName),
].some(Boolean)

if (changed) {
  writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`)
  console.log(`Materialized catalog: versions in ${pkgName}`)
}
