import { defineCommand } from 'citty'

export default defineCommand({
  meta: {
    name: 'add',
    description: 'Add an item to the registry.',
  },

  args: {
    name: {
      type: 'positional',
      required: true,
      valueHint: 'registry/item',
      description: 'Name of the registry item.',
    },
    dest: {
      type: 'string',
      description: 'Destination path of the registry item.',
      valueHint: 'path',
    },
    template: {
      type: 'string',
      description: 'Remote repo template or local path of the registry.',
      valueHint: 'url|path',
    },
    type: {
      type: 'string',
      description: 'Type of the registry item.',
      valueHint: 'component|layout|theme|block|page',
      default: 'component',
    },
    doc: {
      type: 'boolean',
      description: 'Create documentation for the registry item.',
      default: false,
      alias: 'd',
    },
    test: {
      type: 'boolean',
      description: 'Create test case for the registry item.',
      default: false,
      alias: 't',
    },
    force: {
      type: 'boolean',
      description: 'Overwrite existing files.',
      default: false,
      alias: 'f',
    },
  },
})
