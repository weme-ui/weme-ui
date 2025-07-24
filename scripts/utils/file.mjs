import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import consola from 'consola'
import { mkdirp } from 'mkdirp'

export class FileReader {
  constructor(root) {
    this.root = root
  }

  list() {
    return readdirSync(this.root)
  }

  read(name) {
    return readFileSync(join(this.root, name), 'utf8')
  }

  readAnyOf(...names) {
    let error

    for (let id = 0; id < names.length; id++) {
      const name = names[id]

      try {
        return this.read(name)
      }
      catch (e) {
        if (!error && typeof e?.code === 'string') {
          if (['EACCES', 'EPERM'].includes(e.code))
            error = e.path
        }

        if (id === names.length - 1)
          continue

        if (error)
          return `ERROR: Read File ${error} failed.`
        else
          return undefined
      }
    }
  }
}

export async function asyncWriteFile(filepath, content, silence = false, flag = 'w') {
  const isExists = existsSync(filepath)

  if (
    isExists
    && !silence
    && !await consola.prompt(
      `File \`${filepath}\` already exists.\n Do you want to override it?`,
      {
        type: 'confirm',
        initial: true,
      },
    )
  ) {
    return
  }

  if (!existsSync(dirname(filepath)))
    await mkdirp(dirname(filepath))

  writeFileSync(filepath, content, {
    encoding: 'utf8',
    flag,
  })

  if (!silence) {
    consola.info(`${isExists ? 'Overwrote' : 'Generated'} file \`${filepath}\``)
  }
}
