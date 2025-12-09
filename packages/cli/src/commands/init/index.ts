import { cwd } from 'node:process'
import { defineCommand } from 'citty'

export default defineCommand({
  meta: {
    name: 'init',
    description: 'Initialize a registry or project.',
  },

  args: {
    cwd: {
      type: 'positional',
      description: 'Change working directory.',
      default: cwd(),
    },
    repo: {
      type: 'string',
      description: 'Change repository of the registry.',
      valueHint: 'STRING',
    },
    registry: {
      type: 'boolean',
      description: 'Initialize a registry.',
      alias: 'r',
      default: false,
    },
    component: {
      type: 'boolean',
      description: 'Generate a component skeleton in your registry.',
      alias: 'c',
      default: false,
    },
  },

  async setup({ args }) {
    if (args.registry) {
      await import('./registry/init').then(r => r.default(args))
    }
    else if (args.component) {
      await import('./component/init').then(r => r.default(args))
    }
    else {
      await import('./project/init').then(r => r.default(args))
    }
  },
})
