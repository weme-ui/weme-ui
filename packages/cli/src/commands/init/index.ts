import { cwd, exit } from 'node:process'
import { defineCommand } from 'citty'
import { consola } from '~/utils/consola'
import { downloadRemoteTemplate } from '~/utils/template'
import { resolveCommandArgs } from '~/utils/utilities'
import { initializeComponent } from './component'
import { initializeProject } from './project'
import { initializeRegistry } from './registry'
import { initializeRepository } from './repository'
import { initializeTheme } from './theme'

export default defineCommand({
  meta: {
    name: 'init',
    description: 'Initialize Weme UI in your project.',
  },

  args: {
    'name': {
      type: 'positional',
      description: 'Name of the project/registry/repository.',
      valueHint: 'name',
    },
    'provider': {
      type: 'string',
      description: 'Provider of the registry.',
      valueHint: 'github|cdn|local|remote',
      default: 'github',
    },
    'repos': {
      type: 'string',
      description: 'The repos to fetch the components from.',
      valueHint: 'repo,repo',
      default: '@weme-ui/weme-ui',
    },
    'template': {
      type: 'string',
      description: 'Template repository.',
      valueHint: 'github:username/repo',
    },
    'type': {
      type: 'string',
      description: 'Initialize type.',
      valueHint: 'project|repository|registry|component|theme',
    },
    'prefix': {
      type: 'string',
      description: 'Prefix for css variables.',
      valueHint: 'string',
      default: 'ui',
    },
    'backgrounds': {
      type: 'string',
      description: 'Background color.',
      valueHint: 'light,dark',
      default: '#fff,#111',
    },
    'components-path': {
      type: 'string',
      description: 'Path for components.',
      valueHint: 'path',
      default: '~/components',
    },
    'composables-path': {
      type: 'string',
      description: 'Path for composables.',
      valueHint: 'path',
      default: '~/composables',
    },
    'layouts-path': {
      type: 'string',
      description: 'Path for layouts.',
      valueHint: 'path',
      default: '~/layouts',
    },
    'themes-path': {
      type: 'string',
      description: 'Path for themes.',
      valueHint: 'path',
      default: '~/themes',
    },
    'plugins-path': {
      type: 'string',
      description: 'Path for plugins.',
      valueHint: 'path',
      default: '~/plugins',
    },
    'utils-path': {
      type: 'string',
      description: 'Path for utils.',
      valueHint: 'path',
      default: '~/utils',
    },
    'types-path': {
      type: 'string',
      description: 'Path for types.',
      valueHint: 'path',
      default: '~/types',
    },
    'cwd': {
      type: 'string',
      description: 'Change working directory.',
      valueHint: 'path',
      default: cwd(),
    },
    'force': {
      type: 'boolean',
      description: 'Overwrite existing files.',
      default: false,
      alias: 'f',
    },
  },

  async setup({ args }) {
    consola.info('Initialize Weme UI')

    if (!args.type) {
      const type = await consola.prompt('What do you want to initialize?', {
        type: 'select',
        required: true,
        options: [
          { label: 'Project', value: 'project' },
          { label: 'Repository', value: 'repository' },
          { label: 'Registry', value: 'registry' },
          { label: 'Component', value: 'component' },
          { label: 'Theme', value: 'theme' },
        ],
        initial: 'project',
        cancel: 'undefined',
      })

      if (type === undefined)
        exit(0)

      console.log('')

      args.type = type
    }

    const resolvedArgs = resolveCommandArgs(args)

    if (resolvedArgs.template && !resolvedArgs.template.startsWith('/'))
      resolvedArgs.template = await downloadRemoteTemplate(resolvedArgs)

    switch (resolvedArgs.type) {
      case 'project':
        await initializeProject(resolvedArgs)
        break

      case 'repository':
        await initializeRepository(resolvedArgs)
        break

      case 'registry':
        await initializeRegistry(resolvedArgs)
        break

      case 'component':
        await initializeComponent(resolvedArgs)
        break

      case 'theme':
        await initializeTheme(resolvedArgs)
        break

      default:
        consola.error(`Type \`${resolvedArgs.type}\` is not implemented!`)
        break
    }
  },
})
