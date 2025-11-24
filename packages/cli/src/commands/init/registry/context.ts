import { existsSync } from 'node:fs'
import { exit } from 'node:process'
import * as p from '@clack/prompts'
import path from 'pathe'
import { REGISTRY_DIRNAME } from '../../../constants'

export interface InitRegistryContext {
  name: string
  description: string
  version: string
  directory: string
  prefix: string
  access: string
  author: string
  homepage: string
  github: string
  cwd: string
}

export async function createContext(args: Record<string, any>): Promise<InitRegistryContext> {
  args.cwd = path.resolve(args.cwd)

  const answers = await p.group({
    name: async () => {
      if (args.name)
        return args.name.trim().toLowerCase()

      return p.text({
        message: 'What is the name of the registry?',
        placeholder: 'weme-ui/std',
        defaultValue: args.name?.trim().toLowerCase(),
        validate: (value: string) => {
          if (!value)
            return 'Name is required'

          if (value.includes(' '))
            return 'Name should not contain spaces'

          if (!value.includes('/'))
            return 'Name should contain slashes, e.g. weme-ui/std'

          if (existsSync(path.join(args.cwd, value)))
            return 'Registry already exists'
        },
      })
    },
    description: () => p.text({
      message: 'What is the description of the registry?',
      placeholder: 'The standard components for Weme UI.',
      defaultValue: '',
    }),
    version: () => p.text({
      message: 'What is the version of the registry?',
      placeholder: '0.0.0',
      validate: (value: string) => {
        if (!value)
          return 'Version is required'
      },
    }),
    prefix: () => p.text({
      message: 'What is the prefix of the registry?',
      placeholder: 'ui',
      defaultValue: 'ui',
    }),
    access: () => p.select({
      message: 'Which access do you want to use?',
      options: [
        { label: 'Public', value: 'public' },
        { label: 'Private', value: 'private' },
      ],
      initialValue: 'public',
    }),
    author: () => p.text({
      message: 'What is the author of the registry?',
      placeholder: 'Allen Luo <luoyi@mouji.net>',
      defaultValue: '',
    }),
    homepage: () => p.text({
      message: 'What is the homepage of the registry?',
      placeholder: 'https://github.com/weme-ui/weme-ui',
      defaultValue: '',
    }),
    github: () => p.text({
      message: 'What is the github of the registry?',
      placeholder: 'https://github.com/weme-ui/weme-ui',
      defaultValue: '',
    }),
  }, {
    onCancel: () => {
      p.cancel('Operation cancelled.')
      exit(0)
    },
  })

  return {
    ...answers,
    directory: path.join(REGISTRY_DIRNAME, answers.name.split('/')[1]),
    cwd: args.cwd,
  }
}
