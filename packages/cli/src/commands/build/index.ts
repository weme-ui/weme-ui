import { cwd } from 'node:process'
import { defineCommand } from 'citty'

export default defineCommand({
  meta: {
    name: 'build',
    description: 'Build repository.',
  },

  args: {
    cwd: {
      type: 'positional',
      description: 'Change working directory.',
      default: cwd(),
    },
  },

  async setup({ args }) {
    await import('./build').then(r => r.default(args))
  },
})
