import { cwd } from 'node:process'
import { defineCommand } from 'citty'
import { titleCase } from 'scule'
import { TEMPLATE_REPO } from '../../constants'
import { consola } from '../../utils/consola'
import { resolveCommandArgs } from '../../utils/utilities'

export default defineCommand({
  meta: {
    name: 'init',
    description: 'Initialize Weme UI in your project.',
  },

  args: {
    name: {
      type: 'positional',
      description: 'Name of initialization target.',
    },
    template: {
      type: 'string',
      description: 'Source template repository.',
      valueHint: 'template',
      default: TEMPLATE_REPO,
    },
    project: {
      alias: 'p',
      type: 'boolean',
      description: 'Initialize a project.',
      default: false,
    },
    registry: {
      alias: 'r',
      type: 'boolean',
      description: 'Initialize a registry.',
      default: false,
    },
    component: {
      alias: 'c',
      type: 'boolean',
      description: 'Initialize a component.',
      default: false,
    },
    cwd: {
      type: 'string',
      description: 'Change working directory.',
      valueHint: 'path',
      default: cwd(),
    },
    force: {
      alias: 'f',
      type: 'boolean',
      description: 'Overwrite existing files.',
      default: false,
    },
  },

  async setup({ args }) {
    await resolveCommandArgs(args, (args) => {
      if (args.project || args.p)
        args.type = 'project'
      else if (args.registry || args.r)
        args.type = 'registry'
      else if (args.component || args.c)
        args.type = 'component'
      else
        args.type = 'project'

      ;[
        'project',
        'registry',
        'component',
        'p',
        'r',
        'c',
      ].forEach(k => delete args[k])
    })

    consola.info('Initialize `Weme UI %s`', titleCase(args.type as string))

    switch (args.type) {
      case 'project':
        await import('./project').then(r => r.default(args))
        break
      case 'registry':
        await import('./registry').then(r => r.default(args))
        break
      case 'component':
        await import('./component').then(r => r.default(args))
        break
    }
  },
})
