import { defineCommand } from 'citty'

export default defineCommand({
  meta: {
    name: 'update',
    description: 'Update filtered items or specific item in your project.',
  },

  args: {
    name: {
      type: 'positional',
      description: 'Name of the registry item.',
      valueHint: 'registry/item',
    },
    type: {
      type: 'string',
      description: 'Type of the registry item.',
      valueHint: 'component|layout|theme|block|page',
      default: 'component',
    },
  },
})
