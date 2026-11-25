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
    init: () => import('./commands/init').then((r) => r.default),

    /**
     * 添加组件
     *
     * @example
     * ```bunx @weme-ui/weme-ui add button```
     */
    add: () => import('./commands/add').then((r) => r.default),

    /**
     * 管理 Weme UI 注册表
     *
     * @example
     * - `bunx @weme-ui/weme-ui registry add button`
     * - `bunx @weme-ui/weme-ui registry check button`
     * - `bunx @weme-ui/weme-ui registry update button`
     * - `bunx @weme-ui/weme-ui registry doctor`
     */
    registry: () => import('./commands/registry').then((r) => r.default),
  },
})

export { cli }
