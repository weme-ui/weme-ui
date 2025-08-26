import { exit } from 'node:process'
import createDebugger from 'debug'
import { execa } from 'execa'
import { resolve } from 'pathe'
import { kebabCase } from 'scule'
import { consola } from '~/utils/consola'
import { mkdirs } from '~/utils/file'
import { existsRegistry } from '~/utils/repository'
import { renderTemplates } from '~/utils/template'
import { getPackageJson } from '~/utils/utilities'
import { normalizeOptions } from './options'

const debug = createDebugger('init:registry')

export async function initializeRegistry(args: Record<string, any>) {
  const name = kebabCase(args.name)

  debug('Args:', args)

  if (!args.force && existsRegistry(name, args.cwd)) {
    consola.warn(`Registry \`${name}\` already exists!`)
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
  const pkg = getPackageJson(args.cwd)

  return {
    ...options,
    name: kebabCase(options.name),
    owner: pkg?.name || '',
  } as Record<string, any>
}

async function initialized(data: Record<string, any>) {
  consola.start('Initializing registry')

  const src = resolve(data.template, 'registry')
  const dest = resolve(data.cwd, 'registry', data.name)

  const templates = [
    'utils/styles.ts.hbs',
    'nuxt.config.ts.hbs',
    'package.json.hbs',
    'README.md.hbs',
    'registry.json.hbs',
    'tsconfig.json.hbs',
    'uno.config.ts.hbs',
  ].reduce((acc, tpl) => {
    acc.push({
      src: tpl,
      dest: tpl.replace('.hbs', ''),
    })
    return acc
  }, [] as { src: string, dest: string }[])

  await renderTemplates({ src, dest, templates, data })

  debug('Templates:', templates)

  // Generate folders
  const folders = [
    'components',
    'themes',
  ].map(folder => resolve(dest, folder))

  mkdirs(...folders)

  debug('Folders:', folders)
}

async function installDependencies(data: Record<string, any>) {
  if (data.force || await consola.prompt('Do you want to install dependencies?', {
    type: 'confirm',
    initial: true,
  })) {
    consola.log('')
    consola.start('Installing dependencies')

    try {
      await execa('pnpm', ['install'], {
        cwd: data.cwd,
      })
    }
    catch (err: any) {
      consola.error(err.message)
    }
  }

  consola.log('')

  if (data.force || await consola.prompt('Do you want to prepare the registry?', {
    type: 'confirm',
    initial: true,
  })) {
    consola.log('')
    consola.start('Preparing registry')

    try {
      await execa('pnpm', ['dev:prepare'], {
        cwd: resolve(data.cwd, 'registry', data.name),
      })
    }
    catch (err: any) {
      consola.error(err.message)
    }
  }
}

async function done() {
  console.log('')

  consola.success('Registry initialized!')
}
