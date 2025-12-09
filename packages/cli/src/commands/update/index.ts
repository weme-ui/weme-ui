import { cwd } from 'node:process'
import { defineCommand } from 'citty'
import { createContext } from './context'
import { update } from './update'

export default defineCommand({
  meta: {
    name: 'update',
    description: ' Update items interactively.',
  },

  args: {
    cwd: {
      type: 'string',
      description: 'Change working directory.',
      default: cwd(),
      valueHint: 'PATH',
    },
  },

  async run({ args }) {
    const ctx = await createContext(args)

    for (const [name, items] of Object.entries(ctx.items)) {
      await update(name, items, ctx.cwd)
    }
  },
})
