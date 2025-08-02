import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import consola from 'consola'
import { mkdirp } from 'mkdirp'
import { dirname, join, resolve } from 'pathe'

export function mkdirs(...paths) {
  for (const path of paths) {
    if (!existsSync(path))
      mkdirp.sync(path)
  }
}

export function copyFile(src, dest) {
  if (existsSync(src) && !existsSync(dest))
    return copyFileSync(src, dest)
}

export function readJsonFile(path, options = { root: '' }) {
  const content = readFile(path, options)

  if (!content) {
    return
  }

  return JSON.parse(content)
}

export function readFile(path, options = { root: '' }) {
  const filePath = resolve(join(options.root, path))

  if (!existsSync(filePath)) {
    consola.error(`File \`${filePath}\` not found.`)
    return
  }

  return readFileSync(filePath, 'utf8')
}

export async function writeFile(path, content, options = { flag: 'w', quiet: false }) {
  const {
    flag = 'w',
    quiet = false,
  } = options

  const isExists = existsSync(path)

  if (
    isExists
    && !quiet
    && await consola.prompt(`File \`${path}\` already exists. Do you want to override it?`, {
      type: 'confirm',
      initial: true,
    })) {
    return
  }

  mkdirs(dirname(path))

  writeFileSync(path, content, {
    encoding: 'utf8',
    flag,
  })

  if (!quiet) {
    consola.info(`${isExists ? 'Overwrote' : 'Generated'} file \`${path}\``)
  }
}
