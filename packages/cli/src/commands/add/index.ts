import { cwd } from 'node:process'
import { defineCommand } from 'citty'

/**
 * Usage
 *
 * - **Interactive add items**:
 *    - ```weme-ui add```
 *
 * - **Add items from registry**:
 *    - ```weme-ui add --registry weme-ui/std button```
 *
 * - **Add items from registry with repo**:
 *     - ```weme-ui add --registry weme-ui/std --repo https://github.com/weme-ui/weme-ui button```
 */
export default defineCommand({
  meta: {
    name: 'add',
    description: 'Add items to your project from a registry.',
  },

  args: {
    names: {
      type: 'positional',
      required: false,
      description: 'Name(s) of add items. Multiple names can be separated by `comma`.',
    },
    registry: {
      type: 'string',
      description: 'Name of the registry.',
      valueHint: 'STRING',
    },
    repo: {
      type: 'string',
      description: 'Repository of the registry.',
      valueHint: 'STRING',
    },
    cwd: {
      type: 'string',
      description: 'Change working directory.',
      valueHint: 'PATH',
      default: cwd(),
    },
  },

  async setup({ args }) {
    if ((args.registry || args.repo) && !args.names) {
      await import('./registry').then(r => r.default(args))
    }
    else {
      await import('./registry-item').then(r => r.default(args))
    }
  },
})
