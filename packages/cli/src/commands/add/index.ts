import { cwd } from 'node:process'
import { defineCommand } from 'citty'
import { titleCase } from 'scule'
import { DEFAULT_REGISTRY, DEFAULT_REPO } from '../../constants'
import { consola } from '../../utils/consola'
import { resolveCommandArgs } from '../../utils/utilities'

export default defineCommand({
  meta: {
    name: 'add',
    description: 'Add a registry item to your project.',
  },

  args: {
    names: {
      type: 'positional',
      required: true,
      description: 'Name(s) of add target. Multiple names can be separated by `comma`.',
    },
    registry: {
      type: 'string',
      description: 'Name of the registry.',
      default: DEFAULT_REGISTRY,
      valueHint: 'registry',
    },
    repo: {
      type: 'string',
      description: 'Repository of the registry.',
      default: DEFAULT_REPO,
      valueHint: 'repo',
    },
    cwd: {
      type: 'string',
      description: 'Change working directory.',
      valueHint: 'path',
      default: cwd(),
    },
    force: {
      type: 'boolean',
      description: 'Overwrite existing files.',
      alias: 'f',
      default: false,
    },
  },

  async setup({ args }) {
    await resolveCommandArgs(args, (args) => {
      if (args.repo === '@weme-ui/weme-ui') {
        args.type = 'registry-item'
      }
      else {
        args.type = 'registry'
      }
    })

    consola.info('`Add Weme UI %s To Project`', titleCase(args.type as string))

    switch (args.type) {
      case 'registry':
        await import('./registry').then(r => r.default(args))
        break
      case 'registry-item':
        await import('./registry-item').then(r => r.default(args))
        break
    }
  },
})
