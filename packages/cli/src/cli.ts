import { defineCommand } from 'citty'
import { CLI_DESCRIPTION, CLI_NAME, CLI_VERSION } from './constants'

export const cli = defineCommand({
  meta: {
    name: CLI_NAME,
    version: CLI_VERSION,
    description: CLI_DESCRIPTION,
  },

  subCommands: {
    /**
     * Add items to your project from a registry.
     *
     * @example
     * ```bash
     * pnpm dlx @weme-ui/weme-ui add <item>,<registry>/<item>...
     * ```
     */
    add: () => import('./commands/add').then(r => r.default),

    /**
     * Update items interactively.
     *
     * @example
     * ```bash
     * pnpm dlx @weme-ui/weme-ui update
     * ```
     */
    update: () => import('./commands/update').then(r => r.default),

    /**
     * Get information about your project.
     *
     * @example
     * ```bash
     * pnpm dlx @weme-ui/weme-ui info
     * ```
     */
    info: () => import('./commands/info').then(r => r.default),

    /**
     * Build a registry.
     *
     * @example
     * ```bash
     * pnpm dlx @weme-ui/weme-ui build
     * ```
     */
    build: () => import('./commands/build').then(r => r.default),

    /**
     * Initialize a registry or project.
     *
     * @example
     * ```bash
     * pnpm dlx @weme-ui/weme-ui init
     * ```
     */
    init: () => import('./commands/init').then(r => r.default),
  },
})
