import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: true,
    unocss: true,
    typescript: true,
    formatters: true,
    markdown: true,
    rules: {
      'ts/no-redeclare': 'off',
    },
    ignores: [
      '**/*.schema.json',
      'packages/schema/docs/**',
    ],
  },
)
