import type { RegistryItemFileKind } from '../../types'
import { resolve } from 'node:path/posix'
import { cwd, exit } from 'node:process'
import { defineCommand } from 'citty'
import ora from 'ora'
import { callWhen, Project, randomColor, unwrapError } from '../../utils'

/**
 * 添加组件
 */
export default defineCommand({
  meta: {
    name: 'add',
    description: 'Add items to your project',
  },

  args: {
    cwd: {
      type: 'string',
      description: 'Change working directory to the project root.',
      default: cwd(),
    },
    kinds: {
      type: 'string',
      description: 'The kinds of items to add. Available values: file, doc, example, test',
      default: 'file,doc',
    },
  },

  async run({ args }) {
    const items = args._

    if (items.length === 0) {
      throw new Error('No items to add')
    }

    const cwd = resolve(args.cwd)
    const kinds = (args.kinds.split(',').map(kind => kind.trim()) || ['file', 'doc']) as RegistryItemFileKind[]

    try {
      const project = new Project(cwd)

      if (await project.isInitialized() === false) {
        throw new Error('Project is not initialized')
      }

      let count = 0
      const spinner = ora({ text: 'Adding items...' }).start()

      for (const item of items) {
        await callWhen(
          await project.hasAddedItem(item) === false,
          async () => {
            spinner.text = `Adding ${item}...`
            spinner.color = randomColor()

            if (await project.addItem(item, kinds)) {
              count++
            }
          },
        )
      }

      if (count === 0) {
        spinner.fail('No items added')
        exit(1)
      }

      spinner.succeed('Items added successfully')
    }
    catch (err) {
      console.error(unwrapError(err))
      exit(1)
    }
  },
})
