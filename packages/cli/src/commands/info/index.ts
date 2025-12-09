import { cwd } from 'node:process'
import { defineCommand } from 'citty'

export default defineCommand({
  meta: {
    name: 'info',
    description: 'Get information about your project.',
  },

  args: {
    cwd: {
      type: 'positional',
      description: 'Change working directory.',
      default: cwd(),
    },
  },

  async setup({ args }) {
    await import('./info').then(r => r.default(args))
  },
})
