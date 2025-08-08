import { defineCommand } from 'citty'

export default defineCommand({
  meta: {
    name: 'registry',
    description: 'Manage your local registries.',
  },

  subCommands: {
    init: () => import('./init').then(r => r.default),
    add: () => import('./add').then(r => r.default),
  },
})
