#!/usr/bin/env bun

import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'

interface PackageManifest {
  name?: string
  version?: string
  catalogs?: Record<string, Record<string, string>>
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
  optionalDependencies?: Record<string, string>
}

function collectWorkspaceVersions(rootDir: string): Record<string, string> {
  const packagesDir = join(rootDir, 'packages')
  const versions: Record<string, string> = {}

  if (!existsSync(packagesDir)) {
    return versions
  }

  for (const dir of readdirSync(packagesDir, { withFileTypes: true })) {
    if (!dir.isDirectory()) {
      continue
    }

    const manifestPath = join(packagesDir, dir.name, 'package.json')
    if (!existsSync(manifestPath)) {
      continue
    }

    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as PackageManifest
    if (manifest.name && manifest.version) {
      versions[manifest.name] = manifest.version
    }
  }

  return versions
}

function rewriteCatalogField(
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

function rewriteWorkspaceField(
  field: Record<string, string> | undefined,
  workspaceVersions: Record<string, string>,
  pkgName: string,
): boolean {
  if (!field) {
    return false
  }

  let changed = false

  for (const [name, version] of Object.entries(field)) {
    if (!version.startsWith('workspace:')) {
      continue
    }

    const resolved = workspaceVersions[name]
    if (!resolved) {
      throw new Error(`[${pkgName}] cannot resolve ${name}@${version}`)
    }

    const protocol = version.slice('workspace:'.length)
    field[name] = protocol === '~' ? `~${resolved}` : `^${resolved}`
    changed = true
  }

  return changed
}

const rootDir = join(import.meta.dir, '..')
const pkgPath = join(process.cwd(), 'package.json')
const root = JSON.parse(readFileSync(join(rootDir, 'package.json'), 'utf8')) as PackageManifest

if (!root.catalogs) {
  throw new Error('root package.json is missing catalogs')
}

const pkg = JSON.parse(readFileSync(pkgPath, 'utf8')) as PackageManifest
const pkgName = pkg.name ?? pkgPath
const workspaceVersions = collectWorkspaceVersions(rootDir)
const fields = [
  pkg.dependencies,
  pkg.devDependencies,
  pkg.peerDependencies,
  pkg.optionalDependencies,
] as const

const catalogs = root.catalogs
const changed = [
  ...fields.map(field => rewriteCatalogField(field, catalogs, pkgName)),
  ...fields.map(field => rewriteWorkspaceField(field, workspaceVersions, pkgName)),
].some(Boolean)

if (changed) {
  writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`)
  console.log(`Materialized catalog and workspace versions in ${pkgName}`)
}
