import { cwd, exit } from 'node:process'
import { defineCommand } from 'citty'
import { installDependencies } from 'nypm'
import ora from 'ora'
import { DEFAULT_REGISTRY_NAME } from '../../constants'
import { callWhen, ensureDir, loadProject, useRegistry } from '../../utils'
import { generateDefaultConfig } from './config'
import { cloneTemplateRepository, initProjectTemplate } from './template'
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
  },

  async run({ args }) {
    const cwd = ensureDir(args.cwd)
    const project = await loadProject(cwd)

    if (project.info.initd) {
      console.error('Project already initialized!')
      exit(1)
    }

    const spinner = ora('Initializing project...').start()

    // 01. Clone the template repository and initialize the project template.
    await callWhen(
      !project.info.state.hasPackageJson,
      async () => {
        spinner.text = 'Cloning template repository...'
        await cloneTemplateRepository(cwd)

        spinner.text = 'Initializing project template...'
        await initProjectTemplate(cwd)
      },
      async () => { await project.check() },
    )

    // 02. Generate the default project config.
    await callWhen(
      !project.info.state.hasProjectConfig,
      async () => {
        spinner.text = 'Generating default project config...'
        await generateDefaultConfig(cwd)
      },
      async () => { await project.check() },
    )

    // 03. Generate the default UnoCSS config.
    await callWhen(
      !project.info.state.hasUnoConfig,
      async () => {
        spinner.text = 'Generating default UnoCSS config...'
        await generateDefaultUnoCSS(cwd)
      },
      async () => { await project.check() },
    )

    // 04. Add dependencies to the project.
    await callWhen(
      project.info.state.hasPackageJson,
      async () => {
        spinner.text = 'Install dependencies...'
        await installDependencies({
          cwd,
          silent: true,
        })

        const defaultRegistryName = args.repo ?? project.info.registries?.[0]?.registry ?? DEFAULT_REGISTRY_NAME
        const registry = useRegistry(defaultRegistryName)

        spinner.text = 'Adding dependencies to the project...'
        const dependencies = await registry.rootDependencies()
        if (dependencies.length > 0) {
          await project.addDependencies(dependencies)
        }

        spinner.text = 'Adding dev dependencies to the project...'
        const devDependencies = await registry.rootDevDependencies()
        if (devDependencies.length > 0) {
          await project.addDevDependencies(devDependencies)
        }
      },
    )

    spinner.succeed('Project initialized successfully!')
  },
})
