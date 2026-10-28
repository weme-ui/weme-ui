import { resolve } from 'node:path/posix'
import { cwd, exit } from 'node:process'
import { defineCommand } from 'citty'
import { installDependencies } from 'nypm'
import ora from 'ora'
import { callWhen, parseRepoURL, Project, randomColor, unwrapError, useRegistry } from '../../utils'
import { generateDefaultConfig } from './config'
import { cloneTemplateRepository, initProjectTemplate } from './template'
import { generateDefaultUnoCSSConfigs } from './unocss'

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
    const cwd = resolve(args.cwd)

    try {
      const project = new Project(cwd)

      if (await project.isInitialized()) {
        throw new Error('Project already initialized')
      }

      const spinner = ora({ text: 'Initializing project...' }).start()

      const {
        name,
        branch,
      } = parseRepoURL(args.repo)

      // 1. Initialize project from clone template repository
      await callWhen(
        !(await project.hasPackageJson()),
        async () => {
          spinner.color = randomColor()
          spinner.text = 'Cloning template repository...'
          await cloneTemplateRepository(cwd)

          spinner.text = 'Initializing project structure...'
          spinner.color = randomColor()
          await initProjectTemplate(cwd)
        },
      )

      // 2. Generate the default project config file
      await callWhen(
        !(await project.hasProjectConfig()),
        async () => {
          spinner.text = 'Generating project config file...'
          spinner.color = randomColor()
          await generateDefaultConfig(cwd, args.repo)
        },
      )

      // 3. Generate the default UnoCSS config file
      await callWhen(
        !(await project.hasUnoConfig()),
        async () => {
          spinner.color = randomColor()
          spinner.text = 'Generating UnoCSS config file...'
          await generateDefaultUnoCSSConfigs(cwd)
        },
      )

      // 4. Install dependencies
      await callWhen(
        await project.hasPackageJson(),
        async () => {
          spinner.text = 'Install dependencies...'
          spinner.color = randomColor()
          await installDependencies({
            cwd,
            silent: true,
          })
        },
      )

      // 5. Add dependencies to the project
      await callWhen(
        await project.hasPackageJson(),
        async () => {
          const registry = useRegistry(name, branch)

          spinner.text = 'Adding dependencies to the project...'
          spinner.color = randomColor()
          const dependencies = await registry.dependencies()
          if (dependencies.length > 0) {
            await project.addDependencies(dependencies)
          }

          spinner.text = 'Adding dev dependencies to the project...'
          spinner.color = randomColor()
          const devDependencies = await registry.devDependencies()
          if (devDependencies.length > 0) {
            await project.addDevDependencies(devDependencies)
          }
        },
      )

      // 6. Add `on-init` items to the project
      await callWhen(
        await project.hasPackageJson(),
        async () => {
          const registry = useRegistry(name, branch)

          spinner.text = 'Adding `on-init` items to the project...'
          spinner.color = randomColor()
          const onInitItems = await registry.getItems(item => item.when === 'on-init')
          if (onInitItems.length > 0) {
            for (const item of onInitItems) {
              const itemName = `${name}/${item.name}`
              if (await project.hasAddedItem(itemName) === false) {
                await project.addItem(itemName)
              }
            }
          }
        },
      )

      spinner.succeed('Project initialized successfully')
    }
    catch (err) {
      console.error(unwrapError(err))
      exit(1)
    }
  },
})
