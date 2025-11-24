import { cwd } from 'node:process'
import { defineCommand } from 'citty'

/**
 * Usage
 *
 * - **Initialize a new project**:
 *    - ```weme-ui init```
 *
 * - **Initialize a new project with default registry**:
 *    - ```weme-ui init weme-ui/plus --repo https://github.com/weme-ui/weme-ui```
 *
 * - **Initialize a new registry**:
 *    - ```weme-ui init weme-ui/plus --registry```
 *
 * - **Generate component skeleton**:
 *    - ```weme-ui init button --component```
 */
export default defineCommand({
  meta: {
    name: 'init',
    description: 'Initialize a registry or project with Weme UI.',
  },

  args: {
    name: {
      type: 'positional',
      required: false,
      description: 'Name of the scoped registry. (i.e. `weme-ui/std`)',
    },
    repo: {
      type: 'string',
      description: 'Change repository of the registry.',
      valueHint: 'STRING',
    },
    cwd: {
      type: 'string',
      description: 'Change working directory.',
      valueHint: 'PATH',
      default: cwd(),
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
    args.cwd = args.cwd || cwd()

    if (args.registry) {
      await import('./registry').then(r => r.default(args))
    }
    else if (args.component) {
      await import('./component').then(r => r.default(args))
    }
    else {
      await import('./project').then(r => r.default(args))
    }
  },
})
