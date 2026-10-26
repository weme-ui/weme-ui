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
      // *.style.ts 里 class 在 createVariants({...}) 对象字符串中
      'unocss/order': [
        'warn',
        {
          unoFunctions: [
            'cn',
            'cx',
            'clsx',
            'classnames',
            'createVariants',
          ],
        },
      ],
    },
  },
)
