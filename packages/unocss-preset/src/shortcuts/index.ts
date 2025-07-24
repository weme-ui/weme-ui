import type { Shortcuts } from '../types'
import { cursor } from './cursor'
import { utils } from './utils'

export const shortcuts = [
  cursor,
  ...utils,
].filter(Boolean) as Shortcuts
