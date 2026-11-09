import { defineConfig } from 'oxfmt'

export default defineConfig({
  semi: false,
  trailingComma: 'all',
  sortPackageJson: {},
  sortImports: {
    newlinesBetween: false,
    sortSideEffects: true,
    groups: [
      'type-import',
      'type-internal',
      ['type-parent', 'type-sibling', 'type-index'],
      ['value-builtin', 'value-external'],
      'value-internal',
      ['value-parent', 'value-sibling', 'value-index'],
      'unknown',
    ],
  },
  ignorePatterns: ['docs'],
})
