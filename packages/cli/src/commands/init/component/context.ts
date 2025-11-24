import { exit } from 'node:process'
import * as p from '@clack/prompts'
import path from 'pathe'
import { kebabCase, titleCase } from 'scule'
import { COMPONENT_CATEGORIES } from '../../../constants'
import { loadLocalRegistryItems, selectLocalRegistry } from '../../../utils/schema/registry'

export interface InitComponentContext {
  name: string
  parent: string
  scope: string
  registry: string
  category: string
  asChild: boolean
  cwd: string
}

export async function createContext(args: Record<string, any>): Promise<InitComponentContext> {
  if (!args.name) {
    args.name = await p.text({
      message: 'What is the name of the component?',
      placeholder: 'MyComponent',
      validate: (value: string) => {
        if (!value)
          return 'Name is required'
      },
    })
  }

  args.name = kebabCase(args.name)
  args.cwd = path.resolve(args.cwd)
  args.registry = await selectLocalRegistry(args.cwd)

  const items = loadLocalRegistryItems(args.cwd, args.registry, {
    name: args.name,
    type: 'component',
  })

  if (items.isErr()) {
    p.log.error('Failed to load registry items.')
    p.log.error(items.unwrapErr())
    exit(0)
  }

  function existsComponent(name: string) {
    return items.unwrap().some(
      (i) => {
        if (i.name === name) {
          return true
        }

        if (i.files) {
          return i.files.some(
            f => f.path.startsWith(`components/${name}/`)
              || f.path === `components/${name}/${name}.vue`,
          )
        }

        return false
      },
    )
  }

  if (args.name.includes('-')) {
    const splitNames = String(args.name).split('-').reduce(
      (acc, name) => {
        acc.push([...acc, name].join('-'))
        return acc
      },
      [] as string[],
    )

    splitNames.forEach(async (name) => {
      if (existsComponent(name)) {
        const asChild = await p.confirm({
          message: `Component ${name} already exists, do you want to add as child?`,
          initialValue: true,
        })

        if (p.isCancel(asChild)) {
          p.cancel('Operation cancelled.')
          exit(0)
        }

        if (asChild) {
          args.parent = name
          args.asChild = true
        }
      }
    })
  }
  else {
    if (existsComponent(args.name)) {
      p.log.error(`Component ${args.name} already exists.`)
      exit(0)
    }
  }

  if (!args.asChild) {
    args.category = await p.select({
      message: 'What is the category of the component?',
      options: [
        ...COMPONENT_CATEGORIES,
        'custom',
      ].reduce((acc, category) => {
        acc.push({
          label: titleCase(category),
          value: category,
        })
        return acc
      }, [] as { label: string, value: string }[]),
    })

    if (args.category === 'custom') {
      args.category = await p.text({
        message: 'What is the category of the component?',
        placeholder: 'general',
        validate: (value: string) => {
          if (!value)
            return 'Category is required'
        },
      })
    }

    if (p.isCancel(args.category)) {
      p.cancel('Operation cancelled.')
      exit(0)
    }
  }

  return {
    name: args.name,
    parent: args.parent,
    scope: path.basename(args.cwd),
    registry: args.registry,
    category: args.category,
    asChild: !!args.asChild,
    cwd: args.cwd,
  }
}
