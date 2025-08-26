import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import { cwd, exit } from 'node:process'
import { mkdirp } from 'mkdirp'
import { dirname, relative, resolve } from 'pathe'
import { consola } from '~/utils/consola'

export function readFile(path: string, cwd: string = '', throwError = true) {
  const filePath = resolve(cwd, path)

  if (!existsSync(filePath)) {
    if (throwError)
      consola.error(`File \`${filePath}\` not found.`)

    return false
  }

  return readFileSync(filePath, 'utf8')
}

export async function writeFile(path: string, content: string, options = { flag: 'w', quiet: false }) {
  const {
    flag = 'w',
    quiet = false,
  } = options

  const isExists = existsSync(path)

  if (isExists && !quiet) {
    const override = await consola.prompt(`File \`${relative(cwd(), path)}\` already exists. Do you want to override it?`, {
      type: 'confirm',
      cancel: 'undefined',
    })

    if (override === undefined)
      exit(0)

    if (!override)
      return
  }

  mkdirs(dirname(path))

  writeFileSync(path, content, {
    encoding: 'utf8',
    flag,
  })

  if (!quiet) {
    consola.info(`${isExists ? 'Overwrote' : 'Created'} file \`${relative(cwd(), path)}\``)
  }
}

export function copyFile(src: string, dest: string) {
  if (existsSync(src) && !existsSync(dest))
    return copyFileSync(src, dest)
}

export function mkdirs(...paths: string[]) {
  for (const path of paths) {
    if (!existsSync(path))
      mkdirp.sync(path)
  }
}
