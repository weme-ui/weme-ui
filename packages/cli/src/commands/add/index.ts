import { cwd } from 'node:process'
import { defineCommand } from 'citty'

export default defineCommand({
  meta: {
    name: 'add',
    description: 'Add a registry item to your project.',
  },

  args: {
    name: {
      type: 'positional',
      required: true,
      description: 'Name of the registry item.',
      valueHint: 'registry/item',
    },
    provider: {
      type: 'string',
      description: 'Provider of the registry.',
      valueHint: 'github|cdn|local|remote',
      default: 'github',
    },
    repo: {
      type: 'string',
      description: 'Repository of the registry.',
      valueHint: 'url',
    },
    branch: {
      type: 'string',
      description: 'Branch of the registry.',
      valueHint: 'branch',
    },
    tag: {
      type: 'string',
      description: 'Tag of the registry.',
      valueHint: 'tag',
    },
    dir: {
      type: 'string',
      description: 'Change repo directory to fetching items from registry.',
      valueHint: 'path',
    },
    cwd: {
      type: 'string',
      description: 'Change working directory.',
      valueHint: 'path',
      default: cwd(),
    },
    force: {
      type: 'boolean',
      description: 'Overwrite existing files.',
      alias: 'f',
      default: false,
    },
  },
})
