import type { UserConfig } from '@unocss/core'
import type { Theme } from '../theme'
import { containerShortcuts } from '../rules/container'
import { utilitiesShortcuts } from './utilities'

export const shortcuts = [
  containerShortcuts,
  utilitiesShortcuts,
].flat() satisfies UserConfig<Theme>['shortcuts']
