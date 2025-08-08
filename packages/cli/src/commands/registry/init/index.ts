import { defineCommand } from 'citty'

export default defineCommand({
  meta: {
    name: 'init',
    description: 'Initialize a new registry.',
  },

  args: {
    name: {
      type: 'positional',
      required: true,
      description: 'Name of the registry.',
    },
    dest: {
      type: 'string',
      description: 'Destination path of the registry.',
      valueHint: 'path',
      default: './registry', // resolve path
    },
    template: {
      type: 'string',
      description: 'Remote repo template or local path of the registry.',
      valueHint: 'url|path',
      default: './templates/registry',
    },
    force: {
      type: 'boolean',
      description: 'Overwrite existing files.',
      default: false,
      alias: 'f',
    },
  },
})
