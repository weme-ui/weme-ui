#!/usr/bin/env bun

import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'
import { changelogFiles, changelogHasVersion, readPackageVersion } from './versions'

const rootDir = join(import.meta.dir, '..')

function run(command: string[]): void {
  const result = Bun.spawnSync(command, {
    cwd: rootDir,
    stdin: 'inherit',
    stdout: 'inherit',
    stderr: 'inherit',
  })
  if (result.exitCode !== 0) {
    process.exit(result.exitCode ?? 1)
  }
}

function latestSection(markdown: string, version: string): string | undefined {
  const heading = `## v${version}`
  const lines = markdown.split('\n')
  const start = lines.indexOf(heading)
  if (start === -1) {
    return undefined
  }

  let end = lines.length
  for (let index = start + 1; index < lines.length; index += 1) {
    const line = lines[index]
    if (line?.startsWith('## ')) {
      end = index
      break
    }
  }

  return lines.slice(start, end).join('\n').trimEnd()
}

function prependSection(markdown: string, section: string, version: string): string {
  if (changelogHasVersion(markdown, version)) {
    return markdown
  }

  const lines = markdown.split('\n')
  const index = lines.findIndex((line) => line.startsWith('## '))
  if (index === -1) {
    return `${markdown.trimEnd()}\n\n${section}\n`
  }

  const head = lines.slice(0, index).join('\n').trimEnd()
  const tail = lines.slice(index).join('\n').trimEnd()
  return `${head}\n\n${section}\n\n${tail}\n`
}

const version = readPackageVersion(rootDir, 'package.json')

run(['bun', 'install'])
run(['bunx', 'changelogen', '-r', version, '--output', 'CHANGELOG.md'])

const changelogPath = join(rootDir, 'CHANGELOG.md')
const changelog = readFileSync(changelogPath, 'utf8')
const section = latestSection(changelog, version)
if (!section) {
  console.error(`CHANGELOG.md 里没有 ## v${version}`)
  process.exit(1)
}

for (const file of changelogFiles) {
  const path = join(rootDir, file)
  const current = readFileSync(path, 'utf8')
  const next = prependSection(current, section, version)
  if (next !== current) {
    writeFileSync(path, next)
  }
}
