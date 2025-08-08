import { cwd } from 'node:process'
import { defineCommand } from 'citty'

export default defineCommand({
  meta: {
    name: 'init',
    description: 'Initialize Weme UI in your project.',
  },

  args: {
    'provider': {
      type: 'string',
      description: 'Provider of the registry.',
      valueHint: 'github|cdn|local|remote',
      default: 'github',
    },
    'repos': {
      type: 'string',
      description: 'The repos to fetch the components from.',
      valueHint: 'repo,repo',
      default: '@weme-ui/weme-ui',
    },
    'template': {
      type: 'string',
      description: 'Initialize project with remote template repo.',
      valueHint: 'url',
    },
    'prefix': {
      type: 'string',
      description: 'Prefix for css variables.',
      valueHint: 'string',
      default: 'ui',
    },
    'backgrounds': {
      type: 'string',
      description: 'Background color.',
      valueHint: 'light,dark',
      default: '#fff,#111',
    },
    'components-path': {
      type: 'string',
      description: 'Path for components.',
      valueHint: 'path',
      default: '~/components',
    },
    'composables-path': {
      type: 'string',
      description: 'Path for composables.',
      valueHint: 'path',
      default: '~/composables',
    },
    'layouts-path': {
      type: 'string',
      description: 'Path for layouts.',
      valueHint: 'path',
      default: '~/layouts',
    },
    'themes-path': {
      type: 'string',
      description: 'Path for themes.',
      valueHint: 'path',
      default: '~/themes',
    },
    'plugins-path': {
      type: 'string',
      description: 'Path for plugins.',
      valueHint: 'path',
      default: '~/plugins',
    },
    'utils-path': {
      type: 'string',
      description: 'Path for utils.',
      valueHint: 'path',
      default: '~/utils',
    },
    'types-path': {
      type: 'string',
      description: 'Path for types.',
      valueHint: 'path',
      default: '~/types',
    },
    'cwd': {
      type: 'string',
      description: 'Change working directory.',
      valueHint: 'path',
      default: cwd(),
    },
    'force': {
      type: 'boolean',
      description: 'Overwrite existing files.',
      default: false,
      alias: 'f',
    },
  },
})
