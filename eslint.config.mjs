import antfu from '@antfu/eslint-config'
import pluginPnpm from 'eslint-plugin-pnpm'
import * as jsoncParser from 'jsonc-eslint-parser'
import * as yamlParser from 'yaml-eslint-parser'

export default antfu({
  type: 'app',

  typescript: true,
  markdown: true,
  vue: true,

  stylistic: {
    indent: 2,
    quotes: 'single',
  },

  ignores: [
    'dist',
    'snapshots*',
    'node_modules',
  ],
}, {
  name: 'pnpm/package.json',
  files: [
    'package.json',
    '**/package.json',
  ],
  languageOptions: {
    parser: jsoncParser,
  },
  plugins: {
    pnpm: pluginPnpm,
  },
  rules: {
    'pnpm/json-enforce-catalog': 'error',
    'pnpm/json-valid-catalog': 'error',
    'pnpm/json-prefer-workspace-settings': 'error',
  },
}, {
  name: 'pnpm/pnpm-workspace-yaml',
  files: ['pnpm-workspace.yaml'],
  languageOptions: {
    parser: yamlParser,
  },
  plugins: {
    pnpm: pluginPnpm,
  },
  rules: {
    'pnpm/yaml-no-unused-catalog-item': 'error',
    'pnpm/yaml-no-duplicate-catalog-item': 'error',
  },
})
