import { defineCommand } from 'citty'
import { CLI_DESCRIPTION, CLI_NAME, CLI_VERSION } from './constants'

export const cli = defineCommand({
  meta: {
    name: CLI_NAME,
    version: CLI_VERSION,
    description: CLI_DESCRIPTION,
  },

  subCommands: {
    add: () => import('./commands/add').then(r => r.default),
    init: () => import('./commands/init').then(r => r.default),
    info: () => import('./commands/info').then(r => r.default),
    build: () => import('./commands/build').then(r => r.default),
    verify: () => import('./commands/verify').then(r => r.default),
  },
})
