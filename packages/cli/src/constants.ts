import { cwd } from 'node:process'
import { resolve } from 'pathe'

export const DEFAULT_REPO = '@weme-ui/weme-ui'
export const DEFAULT_REGISTRY = 'weme-ui/std'

export const CACHE_PATH = resolve(cwd(), '.weme')
export const TEMPLATE_REPO = '@weme-ui/templates'

export const REGISTRY_SCHEMA = 'https://weme-ui.github.io/schema/registry.json'
export const PROJECT_SCHEMA = 'https://weme-ui.github.io/schema/project.json'
