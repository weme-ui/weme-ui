import antfu from '@antfu/eslint-config'
import * as jsoncParser from 'jsonc-eslint-parser'
import * as yamlParser from 'yaml-eslint-parser'

export default antfu({
  type: 'app',

  pnpm: true,
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
  rules: {
    'pnpm/yaml-no-unused-catalog-item': 'error',
    'pnpm/yaml-no-duplicate-catalog-item': 'error',
  },
})
