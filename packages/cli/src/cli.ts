import { defineCommand } from 'citty'
import { CLI_DESCRIPTION, CLI_NAME, CLI_VERSION } from './constants'

const cli = defineCommand({
  meta: {
    name: CLI_NAME,
    version: CLI_VERSION,
    description: CLI_DESCRIPTION,
  },

  subCommands: {
    /**
     * 初始化项目
     *
     * @example
     * ```bunx @weme-ui/weme-ui init```
     */
    init: () => import('./commands/init').then(r => r.default),
  },
})

export {
  cli,
}
