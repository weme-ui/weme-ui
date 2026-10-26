import type { ProjectConfig, ProjectPaths } from './types'
import { description, version } from '../package.json'

export const CLI_NAME = 'weme-cli'
export const CLI_VERSION = version
export const CLI_DESCRIPTION = description

export const CLI_TMP_DIR = '.weme'

export const PROJECT_CONFIG_FILENAME = 'weme.config.json'
export const PROJECT_LOCKFILE_FILENAME = 'weme.lock.json'

export const DEFAULT_REGISTRY_NAME = 'weme-ui/slim'

export const DEFAULT_REGISTRIES: ProjectConfig['registries'] = [
  { registry: DEFAULT_REGISTRY_NAME },
]

export const DEFAULT_PATHS: ProjectPaths = {
  '~': 'src',
  'component': '~/components',
  'composable': '~/composables',
  'block': '~/blocks',
  'layout': '~/layouts',
  'page': '~/pages',
  'util': '~/utils',
  'theme': '~/themes',
}
