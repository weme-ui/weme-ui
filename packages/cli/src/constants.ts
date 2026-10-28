import type { ProjectAddedRegistry } from './types'
import { description, version } from '../package.json'

export const CLI_NAME = 'weme-cli'
export const CLI_VERSION = version
export const CLI_DESCRIPTION = description

export const CLI_TMP_DIR = '.weme'

export const PROJECT_CONFIG_FILENAME = 'weme.config.json'
export const PROJECT_LOCKFILE_FILENAME = 'weme.lock.json'

export const DEFAULT_REGISTRY_NAME = 'weme-ui/slim'
export const DEFAULT_REGISTRY_BRANCH = 'main'

export const DEFAULT_REGISTRIES: ProjectAddedRegistry[] = [
  { registry: DEFAULT_REGISTRY_NAME },
]

export const DEFAULT_PATHS = {
  '~': 'src',
  'component': '~/components',
  'composable': '~/composables',
  'block': '~/blocks',
  'layout': '~/layouts',
  'page': '~/pages',
  'util': '~/utils',
  'theme': '~/themes',
} as const
