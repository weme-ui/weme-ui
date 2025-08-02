#!/usr/bin/env node
import { defineCommand, runMain } from 'citty'

const main = defineCommand({
  meta: {
    description: 'Weme UI Boilerplate Generator',
  },
  subCommands: {
    package: () => import('./commands/package/index.mjs').then(r => r.default),
    registry: () => import('./commands/registry/index.mjs').then(r => r.default),
    component: () => import('./commands/component/index.mjs').then(r => r.default),
    theme: () => import('./commands/theme/index.mjs').then(r => r.default),
  },
})

runMain(main)
