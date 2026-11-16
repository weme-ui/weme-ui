#!/usr/bin/env bun

import process from 'node:process'

function outputText(value: Uint8Array | string | undefined): string {
  if (!value) {
    return ''
  }

  return value.toString()
}

function alreadyPublished(output: string): boolean {
  const normalized = output.toLowerCase()
  return (
    normalized.includes('epublishconflict') ||
    normalized.includes('previously published version') ||
    normalized.includes('cannot publish over')
  )
}

function distTag(): string {
  const index = process.argv.indexOf('--tag')
  const tag = index === -1 ? undefined : process.argv[index + 1]
  if (!tag || tag.startsWith('-')) {
    console.error('发布时需要 --tag，例如 --tag latest 或 --tag beta。')
    process.exit(1)
  }

  return tag
}

const tag = distTag()
const pack = Bun.spawnSync(['bun', 'pm', 'pack', '--quiet'], {
  cwd: process.cwd(),
  stdout: 'pipe',
  stderr: 'inherit',
})

if (pack.exitCode !== 0) {
  process.exit(pack.exitCode ?? 1)
}

const tarball = outputText(pack.stdout)
  .split('\n')
  .map((line) => line.trim())
  .findLast((line) => line.length > 0)
if (!tarball) {
  console.error('bun pm pack did not produce a tarball')
  process.exit(1)
}

const publish = Bun.spawnSync(
  ['npm', 'publish', tarball, '--access', 'public', '--provenance', '--tag', tag],
  {
    cwd: process.cwd(),
    stdout: 'pipe',
    stderr: 'pipe',
    env: process.env,
  },
)

const output = `${outputText(publish.stdout)}\n${outputText(publish.stderr)}`
process.stdout.write(outputText(publish.stdout))
process.stderr.write(outputText(publish.stderr))

if (publish.exitCode === 0) {
  process.exit(0)
}

if (alreadyPublished(output)) {
  console.log(`${tarball} 的版本已在 npm 上，跳过。`)
  process.exit(0)
}

process.exit(publish.exitCode ?? 1)
