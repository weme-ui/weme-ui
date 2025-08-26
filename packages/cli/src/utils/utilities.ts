import type { PackageJson } from 'pkg-types'
import { existsSync } from 'node:fs'
import { resolve } from 'pathe'
import { CLI_PATH, TEMPLATE_REPO } from '../constants'
import { readFile } from './file'

export function existsPackageJson(cwd: string) {
  return existsSync(resolve(cwd, 'package.json'))
}

export function loadJson<T = any>(name: string, cwd: string = '') {
  const jsonFile = readFile(name, cwd, false)

  if (jsonFile) {
    return JSON.parse(jsonFile) as T
  }
}

export function getCliPackageJson() {
  return getPackageJson(CLI_PATH)
}

export function getPackageJson(cwd: string) {
  return loadJson<PackageJson>('package.json', cwd)
}

export function resolveRepoPath(repo: string) {
  if (
    repo.startsWith('http')
    || repo.startsWith('@')
  ) {
    const aliases = {
      '@': 'gh:',
      'https://github.com/': 'gh:',
      'https://gitlab.com/': 'gitlab:',
      'https://bitbucket.com/': 'bitbucket:',
    }

    let alias = repo

    Object.entries(aliases)
      .forEach(([key, value]) => {
        if (repo.startsWith(key)) {
          alias = repo.replace(key, value)
        }
      })

    return alias
  }

  if (repo.includes(':'))
    return repo

  return resolve(repo)
}

export function resolveCommandArgs(args: Record<string, any>): Record<string, any> {
  args.raw = { ...args }
  args.template = args.template || TEMPLATE_REPO
  args.date = new Date().toISOString().slice(0, 10)

  return {
    ...Object.fromEntries(
      Object.entries(args)
        .filter(([key]) => !key.startsWith('_'))
        .map(([key, value]) => {
          if (key === 'cwd')
            return [key, resolve(value)]

          if (key === 'template')
            return [key, resolveRepoPath(value)]

          return [key, value]
        }),
    ),
  }
}
