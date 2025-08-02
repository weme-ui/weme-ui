import { existsSync } from 'node:fs'
import { defineCommand } from 'citty'
import consola from 'consola'
import { resolve } from 'pathe'
import { kebabCase, titleCase } from 'scule'
import { generatePlayground } from './playground.mjs'
import { generateRegistry } from './registry.mjs'

export default defineCommand({
  meta: {
    name: 'registry',
    description: 'Create a new Weme UI registry.',
  },

  args: {
    name: {
      type: 'positional',
      required: true,
      description: 'Name of the registry.',
    },
    src: {
      type: 'string',
      description: 'Source path of the templates.',
      valueHint: 'path',
      default: './scripts/templates/registry',
    },
    dest: {
      type: 'string',
      description: 'Destination path of the registry.',
      valueHint: 'path',
      default: './registry',
    },
  },

  async setup({ args }) {
    const { name, dest } = args

    if (existsSync(dest) && await consola.prompt(
      `Registry \`${titleCase(name)}\` already exists. Do you want to override it?`,
      {
        type: 'confirm',
        initial: false,
      },
    )) {
      // eslint-disable-next-line node/prefer-global/process
      process.exit(1)
    }

    // Generate registry -> registry/{name}
    await generateRegistry(
      resolve(args.src),
      resolve(args.dest, kebabCase(args.name)),
      [
        { tpl: 'package.json.hbs', dest: 'package.json' },
        { tpl: 'registry.json.hbs', dest: 'registry.json' },
        { tpl: 'tsconfig.json.hbs', dest: 'tsconfig.json' },
        { tpl: 'utils.ts.hbs', dest: 'utils/variants.ts' },
      ],
      args,
    )

    // Generate playground -> registry/{name}/.playground
    await generatePlayground(
      resolve(args.src, 'playground'),
      resolve(args.dest, kebabCase(args.name), '.playground'),
      [
        { tpl: 'package.json.hbs', dest: 'package.json' },
        { tpl: 'nuxt.config.ts.hbs', dest: 'nuxt.config.ts' },
        { tpl: 'uno.config.ts.hbs', dest: 'uno.config.ts' },
        { tpl: 'tsconfig.json.hbs', dest: 'tsconfig.json' },
        { tpl: 'app.vue.hbs', dest: 'app/app.vue' },
        { tpl: 'index.vue.hbs', dest: 'app/pages/index.vue' },
      ],
      args,
    )

    consola.box({
      title: ' Next steps ',
      message: `1. Run \`pnpm install\` in the registry directory.
2. Run \`pnpm dev:prepare\` in the registry directory.
3. Run \`pnpm dev\` in the registry directory.
4. Happy hacking!`,
      style: {
        borderColor: 'green',
      },
    })
  },
})
