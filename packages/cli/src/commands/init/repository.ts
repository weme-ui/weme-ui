import { exit } from 'node:process'
import createDebugger from 'debug'
import { execa } from 'execa'
import { resolve } from 'pathe'
import { kebabCase } from 'scule'
import { consola } from '../../utils/consola'
import { copyFile, mkdirs } from '../../utils/file'
import { renderTemplates } from '../../utils/template'
import { existsPackageJson } from '../../utils/utilities'
import { normalizeOptions } from './options'

const debug = createDebugger('init:repository')

export async function initializeRepository(args: Record<string, any>) {
  debug('Args:', args)

  if (!args.force && existsPackageJson(resolve(args.cwd, kebabCase(args.name)))) {
    consola.warn(`Repository \`${args.name}\` already exists!`)
    consola.info('Try `pnpm dlx @weme-ui/weme-ui init --help` for more information.')

    exit(0)
  }

  const data = await resolveData(args)

  debug('Resolved args:', data)

  await initialized(data)
  await installDependencies(data)

  await done()
}

async function resolveData(args: Record<string, any>) {
  const options = await normalizeOptions(args)

  debug('Normalized args:', options)

  const owner = await consola.prompt('What is the owner/username of the repository?', {
    type: 'text',
    placeholder: 'weme-ui',
    cancel: 'undefined',
  })

  debug('Owner:', owner)

  if (!owner)
    exit(0)

  return {
    ...options,
    owner,
    name: kebabCase(options.name),
  } as Record<string, any>
}

async function initialized(data: Record<string, any>) {
  consola.start('Initializing repository')

  const src = resolve(data.template, 'repository')
  const dest = resolve(data.cwd, data.name)

  const templates = [
    // VSCode
    '.vscode/settings.json.hbs',

    // Docs
    'docs/app.config.ts.hbs',
    'docs/nuxt.config.ts.hbs',
    'docs/package.json.hbs',
    'docs/tsconfig.json.hbs',
    'docs/uno.config.ts.hbs',
    'docs/content/index.md.hbs',

    // Root
    '.editorconfig.hbs',
    '.gitattributes.hbs',
    '.gitignore.hbs',
    'commitlint.config.cjs.hbs',
    'eslint.config.mjs.hbs',
    'package.json.hbs',
    'pnpm-workspace.yaml.hbs',
    'README.md.hbs',
    'LICENSE.hbs',
  ].reduce((acc, tpl) => {
    acc.push({
      src: tpl,
      dest: tpl.replace('.hbs', ''),
    })
    return acc
  }, [] as { src: string, dest: string }[])

  await renderTemplates({ src, dest, templates, data })

  debug('Templates:', templates)

  // Create folders
  const folders = [
    'registry',
  ].map(folder => resolve(dest, folder))

  mkdirs(...folders)

  debug('Folders:', folders)

  // Copy static files
  const files = [
    'public/favicon.ico',
  ].reduce((acc, file) => {
    acc.push({
      src: resolve(src, file),
      dest: resolve(dest, 'docs', file),
    })

    return acc
  }, [] as { src: string, dest: string }[])

  files.forEach(({ src, dest }) => {
    copyFile(src, dest)
  })

  debug('Static files:', files)
}

async function installDependencies(data: Record<string, any>) {
  if (data.force || await consola.prompt('Do you want to install dependencies?', {
    type: 'confirm',
    initial: true,
  })) {
    consola.start('Installing dependencies')

    const cwd = resolve(data.cwd, data.name)

    try {
      await execa('pnpm', ['install'], { cwd })
      await execa('pnpm', ['dev:prepare'], { cwd })
    }
    catch (err: any) {
      consola.error(err.message)
    }
  }

  console.log('')
}

async function done() {
  consola.success('Repository initialized!')
}
