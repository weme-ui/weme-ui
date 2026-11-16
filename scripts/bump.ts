#!/usr/bin/env bun

import { join } from 'node:path'
import process from 'node:process'
import bumpConfig from '../bump.config'
import {
  compareVersions,
  parseVersion,
  publishedVersionFloor,
  readTrackedVersions,
  versionsMatch,
  versionFiles,
} from './versions'

const relativeReleases = new Set([
  'major',
  'minor',
  'patch',
  'premajor',
  'preminor',
  'prepatch',
  'prerelease',
  'next',
  'conventional',
  'conventional-prerelease',
  'prompt',
])

const rootDir = join(import.meta.dir, '..')

export function decideBump(
  versions: readonly string[],
  args: readonly string[],
): string | undefined {
  if (args.length > 1 || args.some((arg) => arg.startsWith('-'))) {
    return 'bun run bump 只接受一个参数，例如 patch 或 6.0.0。'
  }

  if (versionsMatch(versions)) {
    return undefined
  }

  const [arg] = args
  const explicit = arg ? parseVersion(arg) : undefined
  const floor = parseVersion(publishedVersionFloor)
  if (!arg || !explicit || !floor || relativeReleases.has(arg)) {
    return '各包版本还不一致。第一次请运行 bun run bump 6.0.0。在对齐之前，patch、minor 和 major 不能使用。'
  }

  if (compareVersions(explicit, floor) <= 0) {
    return `显式版本必须高于已发布的 ${publishedVersionFloor}。`
  }

  return undefined
}

function sameFiles(left: readonly string[] | undefined, right: readonly string[]): boolean {
  return left?.length === right.length && left.every((file, index) => file === right[index])
}

if (import.meta.main) {
  if (!sameFiles(bumpConfig.files, versionFiles)) {
    console.error('bump.config.ts 的 files 与 scripts/versions.ts 不一致。')
    process.exit(1)
  }

  const message = decideBump(readTrackedVersions(rootDir), process.argv.slice(2))
  if (message) {
    console.error(message)
    process.exit(1)
  }

  const result = Bun.spawnSync(['bunx', 'bumpp', ...process.argv.slice(2)], {
    cwd: rootDir,
    stdin: 'inherit',
    stdout: 'inherit',
    stderr: 'inherit',
  })
  process.exit(result.exitCode ?? 1)
}
