import type { Shortcuts } from '../types'
import { colors } from './colors'
import { cursor } from './cursor'
import { utils } from './utils'

export const shortcuts = [
  cursor,
  ...colors,
  ...utils,
].filter(Boolean) as Shortcuts
