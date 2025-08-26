import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'pathe'

export const MANIFEST_FILE = 'manifest.json'
export const CONFIG_FILE = 'weme.config.json'
export const TEMPLATE_REPO = '@weme-ui/templates'

export const CLI_PATH = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '..',
)
