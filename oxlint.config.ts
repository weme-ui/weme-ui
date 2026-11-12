import { defineConfig } from 'oxlint'

export default defineConfig({
  categories: {
    correctness: 'warn',
    suspicious: 'warn',
    perf: 'warn',
  },
  options: {
    typeAware: true,
    typeCheck: true,
    maxWarnings: 10,
  },
  rules: {
    'no-shadow': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-expressions': 'off',
    'typescript/consistent-return': 'off',
    'typescript/no-misused-spread': 'off',
    'typescript/no-base-to-string': 'off',
    'typescript/no-unsafe-type-assertion': 'off',
    'typescript/no-floating-promises': 'off',
    'typescript/no-unnecessary-type-assertion': 'off',
    'typescript/no-unnecessary-type-conversion': 'off',
    'typescript/no-redundant-type-constituents': 'off',
    'unicorn/no-useless-length-check': 'off',
    'unicorn/consistent-function-scoping': 'off',
  },
  plugins: ['eslint', 'oxc', 'vue', 'unicorn', 'typescript'],
  ignorePatterns: [
    '.weme',
    '.cursor',
    'dist',
    'node_modules',
    'templates',
    'docs',
    'packages/unocss-preset/playground',
    '*.tsbuildinfo',
    'bun.lock',
  ],
})
