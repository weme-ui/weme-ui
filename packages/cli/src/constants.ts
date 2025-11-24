import { description, version } from '../package.json'

export const CLI_NAME = 'weme-ui'
export const CLI_VERSION = version
export const CLI_DESCRIPTION = description

export const COMPONENT_CATEGORIES = [
  'general',
  'layout',
  'typography',
  'data-display',
  'forms',
  'navigation',
  'overlay',
  'feedback',
  'utilities',
] as const

export const CLI_CACHE_DIR = '.weme'

export const REGISTRY_DIRNAME = 'registry'
