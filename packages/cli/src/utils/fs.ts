import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import { exit, cwd as processCwd } from 'node:process'
import { mkdirp } from 'mkdirp'
import { dirname, isAbsolute, relative, resolve } from 'pathe'
import { consola } from './consola'
import { compile } from './handlebars'

export const fs = {
  /**
   * Read file content.
   */
  read: (path: string, cwd: string = '', throwError = true) => {
    const filePath = resolve(cwd, path)

    if (!existsSync(filePath)) {
      if (throwError) {
        consola.error(`File \`${relative(cwd, filePath)}\` not found.`)
        exit(1)
      }

      return false
    }

    return readFileSync(filePath, 'utf8')
  },

  /**
   * Read json file content.
   */
  readJson: <T = any>(path: string, cwd: string = '') => {
    const content = fs.read(path, cwd, false)

    if (content) {
      try {
        const json = JSON.parse(content)

        if (!json)
          return undefined

        return json as T
      }
      catch (error) {
        consola.error(error)
        exit(1)
      }
    }
  },

  /**
   * Write file content.
   */
  write: async (options: {
    path: string
    content: string
    cwd?: string
    force?: boolean
  }) => {
    const {
      path,
      content,
      cwd = processCwd(),
      force = false,
    } = options

    const fullPath = isAbsolute(path) ? path : resolve(cwd, path)
    const isExists = existsSync(fullPath)

    if (isExists && !force) {
      const override = await consola.prompt(
        `File \`${relative(cwd, fullPath)}\` already exists. Do you want to override it?`,
        {
          type: 'confirm',
          cancel: 'undefined',
        },
      )

      if (override === undefined)
        exit(0)

      if (!override)
        return
    }

    fs.mkdirs(dirname(fullPath))

    writeFileSync(fullPath, `${content}\n`, {
      encoding: 'utf8',
      flag: 'w',
    })

    if (!force) {
      consola.success(`${isExists ? 'Overwrote' : 'Created'} file \`${relative(cwd, fullPath)}\`.`)
    }
  },

  /**
   * Write templates to dest.
   */
  writeTemplates: async (templates: string[], args: Record<string, any>) => {
    const resolved = templates.map(
      src => ({
        src,
        dest: compile(src.replace('.hbs', ''), args),
      }),
    )

    for (const tpl of resolved) {
      const content = fs.read(resolve(args.resolve.template, args.type, tpl.src)) || ''

      if (!content) {
        consola.error(`Failed to read template \`${tpl}\``)
        continue
      }

      const compiled = compile(content, args)
      if (!compiled) {
        consola.error(`Failed to render template \`${tpl}\``)
        continue
      }

      fs.write({
        path: resolve(args.dest, tpl.dest),
        content: compiled,
        force: args.force,
      })
    }

    return resolved
  },

  /**
   * Copy file from src to dest.
   */
  copy: (src: string, dest: string) => {
    if (existsSync(src) && !existsSync(dest))
      return copyFileSync(src, dest)
  },

  /**
   * Create directories.
   */
  mkdirs: (...paths: string[]) => {
    for (const path of paths) {
      if (!existsSync(path))
        mkdirp.sync(path)
    }
  },
}
