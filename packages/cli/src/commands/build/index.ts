import { cwd } from 'node:process'
import { defineCommand } from 'citty'

export default defineCommand({
  meta: {
    name: 'build',
    description: 'Build your repository.',
  },

  args: {
    cwd: {
      type: 'string',
      description: 'Change working directory.',
      valueHint: 'PATH',
      default: cwd(),
    },
  },

  async setup({ args }) {
    await import('./manifest').then(r => r.default(args))
  },
})
