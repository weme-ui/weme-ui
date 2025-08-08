import { defineCommand } from 'citty'

export default defineCommand({
  meta: {
    name: 'info',
    description: 'Get information about current project, registry or item.',
  },

  args: {
    name: {
      type: 'positional',
      required: true,
      description: 'Name of the registry item.',
      valueHint: 'registry/item',
    },
    json: {
      type: 'boolean',
      description: 'Output as JSON.',
      default: false,
    },
  },
})
