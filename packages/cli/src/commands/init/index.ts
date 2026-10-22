import { cwd } from 'node:process'
import { defineCommand } from 'citty'
import { callWhen, ensureDir } from '../../utils'
import { Project } from '../../utils/project'
import { generateDefaultConfig, generateDefaultLockfile } from './config'
import { generateDefaultUnoCSS } from './unocss'

/**
 * 初始化项目
 */
export default defineCommand({
  meta: {
    name: 'init',
    description: 'Initialize a new Weme UI project',
  },

  args: {
    cwd: {
      type: 'positional',
      description: 'Change working directory to the project root.',
      default: cwd(),
    },
    repo: {
      type: 'string',
      description: 'Specify the registry repository of the project.',
      valueHint: 'weme-ui/slim',
    },
    wizard: {
      type: 'boolean',
      description: 'Enable the interactive wizard.',
      default: false,
    },
  },

  async run({ args }) {
    const cwd = ensureDir(args.cwd)

    const project = new Project(cwd)
    const { projectConfig, lockfile } = await project.load()

    await callWhen(!projectConfig, async () => await generateDefaultConfig(cwd))
    await callWhen(!lockfile, async () => await generateDefaultUnoCSS(cwd))
    await callWhen(!lockfile, async () => await generateDefaultLockfile(cwd))
  },
})
