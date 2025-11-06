import type { OperationOptions } from 'nypm'
import type { PackageJson } from 'pkg-types'
import type { Result } from '../result'
import fs from 'node:fs'
import chalk from 'chalk'
import { addDependency, runScript } from 'nypm'
import path from 'pathe'
import { Err, Ok } from '../result'
import { merge, runStep } from '../utilities'

/**
 * Load `package.json` from current working directory.
 *
 * @example
 * ```ts
 * const pkg = loadPackageJson(process.cwd())
 *
 * if (pkg.isErr()) {
 *   console.error(pkg.unwrapErr())
 *   return
 * }
 *
 * console.log(pkg.unwrap().name)
 * ```
 *
 * @param cwd - Current working directory
 * @return {Result<PackageJson, string>}
 */
export function loadPackageJson(cwd: string): Result<PackageJson, string> {
  if (!fs.existsSync(path.join(cwd, 'package.json')))
    return Err('Could not find `package.json`!')

  try {
    const content = fs.readFileSync(path.join(cwd, 'package.json'), 'utf8')

    if (!content)
      return Err('`package.json` is empty!')

    return Ok<PackageJson>(JSON.parse(content))
  }
  catch (e: any) {
    return Err(e.message)
  }
}

/**
 * Install dependencies to current working directory.
 *
 * @example
 * ```ts
 * await installDependencies(['@vueuse/core', 'nuxt'], { cwd: process.cwd() })
 * ```
 *
 * @param packages - Packages to install
 * @param options - Options for `nypm`
 */
export async function installDependencies(
  packages?: string[] | {
    dependencies?: string[]
    devDependencies?: string[]
  },
  options: OperationOptions = {},
) {
  await runStep('Installing dependencies...', async (spinner) => {
    const dependencies = Array.isArray(packages)
      ? packages
      : packages?.dependencies || []

    const devDependencies = Array.isArray(packages)
      ? []
      : packages?.devDependencies || []

    await addDependency(merge(...dependencies), { ...options, silent: true })
    await addDependency(merge(...devDependencies), { ...options, dev: true, silent: true })

    spinner.stop('Dependencies installed.')
  })
}

/**
 * Run `dev:prepare` script in current working directory.
 *
 * @example
 * ```ts
 * await runDevPrepare(process.cwd())
 * ```
 *
 * @param cwd - Current working directory
 */
export async function runDevPrepare(cwd: string) {
  await runStep(`Running ${chalk.cyan('dev:prepare')}...`, async (spinner) => {
    await runScript('dev:prepare', {
      cwd,
      silent: true,
    })

    spinner.stop(`${chalk.cyan('dev:prepare')} done.`)
  })
}
