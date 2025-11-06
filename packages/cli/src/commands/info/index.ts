import { cwd } from 'node:process'
import { defineCommand } from 'citty'

/**
 * Usage
 *
 * - **Get information about current project**:
 *    - ```weme-ui info```
 *
 * - **Get information about added registry**:
 *    - ```weme-ui info weme-ui/std```
 */
export default defineCommand({
  meta: {
    name: 'info',
    description: 'Get information about your project or added registry.',
  },

  args: {
    name: {
      type: 'positional',
      required: false,
      description: 'Name of the registry.',
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
    if (args.name) {
      await import('./registry').then(r => r.default(args))
    }
    else {
      await import('./project').then(r => r.default(args))
    }
  },
})
