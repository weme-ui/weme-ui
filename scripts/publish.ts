#!/usr/bin/env bun

import process from 'node:process'

const pack = Bun.spawnSync(['bun', 'pm', 'pack', '--quiet'], {
  cwd: process.cwd(),
  stdout: 'pipe',
  stderr: 'inherit',
})

if (pack.exitCode !== 0) {
  process.exit(pack.exitCode ?? 1)
}

const tarball = pack.stdout.toString().trim()
if (!tarball) {
  console.error('bun pm pack did not produce a tarball')
  process.exit(1)
}

const publish = Bun.spawnSync(
  ['npm', 'publish', tarball, '--access', 'public', '--provenance'],
  {
    cwd: process.cwd(),
    stdout: 'inherit',
    stderr: 'inherit',
    env: process.env,
  },
)

process.exit(publish.exitCode ?? 1)
