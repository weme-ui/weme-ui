import { exit } from 'node:process'
import { consola } from '~/utils/consola'
import { getCliPackageJson, getPackageJson } from '~/utils/utilities'

export async function normalizeOptions(args: Record<string, any>): Promise<Record<string, any>> {
  const [
    light = '#fff',
    dark = '#111',
  ] = args.backgrounds.split(',')

  const others = Object.entries(args).reduce((acc, [key, value]) => {
    if ([
      'provider',
      'repos',
      'prefix',
      'backgrounds',
      'components-path',
      'composables-path',
      'layouts-path',
      'themes-path',
      'plugins-path',
      'utils-path',
      'types-path',
      'name',
      'template',
      'cwd',
      'force',
    ].includes(key)) {
      return acc
    }

    acc[key] = value

    return acc
  }, {} as Record<string, any>)

  const normalized: Record<string, any> = {
    provider: args.provider,
    repos: args.repos.split(','),
    prefix: args.prefix,
    background: { light, dark },
    paths: {
      components: args['components-path'],
      composables: args['composables-path'],
      layouts: args['layouts-path'],
      themes: args['themes-path'],
      plugins: args['plugins-path'],
      utils: args['utils-path'],
      types: args['types-path'],
    },
    name: args.name,
    template: args.template,
    cwd: args.cwd,
    force: args.force,
    date: args.date,
    year: new Date().getFullYear(),
    raw: args.raw,
    ...others,
  }

  const cliPkg = getCliPackageJson()

  if (!cliPkg)
    return normalized

  const pkg = getPackageJson(args.cwd)

  const {
    version,
    license,
    packageManager,
    homepage,
    repository,
    bugs,
  } = cliPkg

  let author = cliPkg.author

  if (!pkg) {
    author = await consola.prompt('What is the author of the project?', {
      type: 'text',
      placeholder: typeof author === 'string' ? author : `${author?.name} <${author?.email}>`,
      cancel: 'undefined',
    })

    if (!author)
      exit(0)
  }

  return {
    ...normalized,

    author,
    version: pkg?.version ?? version,
    license: pkg?.license ?? license,
    packageManager: pkg?.packageManager ?? packageManager,
    homepage: pkg?.homepage ?? homepage,
    bugs: pkg?.bugs ?? bugs,
    repository: pkg?.repository ?? repository,
  } as Record<string, any>
}
