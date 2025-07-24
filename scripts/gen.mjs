#!/usr/bin/env node
import { defineCommand, runMain } from 'citty'

const main = defineCommand({
  meta: {
    description: 'Weme UI Skeleton Generator',
  },
  subCommands: {
    registry: () => import('./generators/registry/index.mjs').then(r => r.default),
    component: () => import('./generators/component/index.mjs').then(r => r.default),
    theme: () => import('./generators/theme/index.mjs').then(r => r.default),
  },
})

runMain(main)
