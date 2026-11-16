#!/usr/bin/env bun

import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'
import {
  changelogHasVersion,
  distTag,
  publishDirectories,
  readPackageVersion,
  readTrackedVersions,
  versionFiles,
  versionFromTag,
} from './versions'

const rootDir = join(import.meta.dir, '..')
const checkOnly = process.argv.includes('--check')

function run(command: string[], cwd = rootDir): void {
  const result = Bun.spawnSync(command, {
    cwd,
    stdin: 'inherit',
    stdout: 'inherit',
    stderr: 'inherit',
    env: process.env,
  })
  if (result.exitCode !== 0) {
    process.exit(result.exitCode ?? 1)
  }
}

function assertReleaseTag(): string {
  const tag = process.env.GITHUB_REF_NAME
  const version = tag ? versionFromTag(tag) : undefined
  if (!tag || !version) {
    console.error('tag 必须是 v1.2.3 或 v1.2.3-beta.0 这种形式。')
    process.exit(1)
  }

  const versions = readTrackedVersions(rootDir)
  const mismatched = versionFiles.filter((file, index) => versions[index] !== version)
  if (mismatched.length > 0) {
    console.error(`tag ${tag} 与这些文件的 version 不一致：${mismatched.join(', ')}`)
    process.exit(1)
  }

  const changelog = readFileSync(join(rootDir, 'CHANGELOG.md'), 'utf8')
  if (!changelogHasVersion(changelog, version)) {
    console.error(`CHANGELOG.md 里没有 ## v${version}`)
    process.exit(1)
  }

  return version
}

if (!checkOnly && !process.env.GITHUB_ACTIONS) {
  console.error('bun run release 只在 GitHub Actions 中发布。')
  process.exit(1)
}

const version = assertReleaseTag()
if (checkOnly) {
  process.exit(0)
}

run([
  'bunx',
  'turbo',
  'run',
  'build',
  '--filter=@weme-ui/colors',
  '--filter=@weme-ui/schema',
  '--filter=@weme-ui/utilities',
  '--filter=@weme-ui/unocss-preset',
  '--filter=@weme-ui/weme-ui',
])
run(['bun', 'run', '--filter', '@weme-ui/schema', 'build:output'])

const tag = distTag(version)
for (const directory of publishDirectories) {
  const manifestVersion = readPackageVersion(rootDir, join(directory, 'package.json'))
  if (manifestVersion !== version) {
    console.error(`${directory} 的 version 是 ${manifestVersion}，tag 对应 ${version}`)
    process.exit(1)
  }

  run(['bun', join(rootDir, 'scripts/publish.ts'), '--tag', tag], join(rootDir, directory))
}
