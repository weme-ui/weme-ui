import { defineCommand } from 'citty'
import { resolve } from 'node:path/posix'
import { cwd, exit } from 'node:process'
import { Project, unwrapError } from '../../utils'

/**
 * 准备项目环境
 */
export default defineCommand({
  meta: {
    name: 'prepare',
    description: 'Prepare project environment',
  },

  args: {
    cwd: {
      type: 'positional',
      description: 'Change working directory to the project root.',
      default: cwd(),
    },
  },

  async run({ args }) {
    const cwd = resolve(args.cwd)

    try {
      const project = new Project(cwd)

      if (!(await project.isInitialized())) {
        throw new Error('Weme UI is not initialized')
      }

      console.log(await project.info())

      // 1. 准备主题配置
      // 2. 准备组件附加配置
    } catch (err) {
      console.error(unwrapError(err))
      exit(1)
    }
  },
})
