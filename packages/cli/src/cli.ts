import { defineCommand } from 'citty'
import { description, version } from '../package.json'

export const cli = defineCommand({
  meta: {
    name: 'weme-ui',
    version,
    description,
  },

  subCommands: {
    init: () => import('./commands/init').then(r => r.default),
    add: () => import('./commands/add').then(r => r.default),
    info: () => import('./commands/info').then(r => r.default),
    update: () => import('./commands/update').then(r => r.default),
    registry: () => import('./commands/registry').then(r => r.default),
  },
})
