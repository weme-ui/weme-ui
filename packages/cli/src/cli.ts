import { defineCommand } from 'citty'
import { description, version } from '../package.json'

export const cli = defineCommand({
  meta: {
    name: 'weme-ui',
    version,
    description,
  },

  subCommands: {
    add: () => import('./commands/add').then(r => r.default),
    init: () => import('./commands/init').then(r => r.default),
    info: () => import('./commands/info').then(r => r.default),
    build: () => import('./commands/build').then(r => r.default),
  },
})
