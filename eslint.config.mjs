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
      // style.ts 里 class 在 createVariants({...}) 对象字符串中，默认只扫 clsx/classnames
      'unocss/order': ['warn', {
        unoFunctions: ['createVariants', 'cn', 'cx', 'clsx', 'classnames'],
      }],
    },
    ignores: [
      '**/*.schema.json',
      'docs/**',
      'packages/schema/docs/**',
      'packages/website/.astro/**',
    ],
  },
)
