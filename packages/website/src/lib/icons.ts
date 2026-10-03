import type { IconifyIcon } from '@iconify/types'
import { icons as lucide } from '@iconify-json/lucide'
import { icons as simpleIcons } from '@iconify-json/simple-icons'

interface IconCollection {
  width?: number
  height?: number
  icons: Record<string, { body: string, width?: number, height?: number }>
}

function pick(collection: IconCollection, name: string): IconifyIcon {
  const icon = collection.icons[name]
  if (!icon) {
    throw new Error(`Icon not found: ${name}`)
  }

  return {
    body: icon.body,
    width: icon.width ?? collection.width ?? 24,
    height: icon.height ?? collection.height ?? 24,
  }
}

export const homeIcons = {
  arrowRight: pick(lucide, 'arrow-right'),
  arrowUpRight: pick(lucide, 'arrow-up-right'),
  bookOpen: pick(lucide, 'book-open'),
  check: pick(lucide, 'check'),
  chevronRight: pick(lucide, 'chevron-right'),
  component: pick(lucide, 'component'),
  copy: pick(lucide, 'copy'),
  externalLink: pick(lucide, 'external-link'),
  fileJson: pick(lucide, 'file-json'),
  files: pick(lucide, 'files'),
  folderTree: pick(lucide, 'folder-tree'),
  palette: pick(lucide, 'palette'),
  sparkles: pick(lucide, 'sparkles'),
  terminal: pick(lucide, 'terminal'),
  zap: pick(lucide, 'zap'),
  github: pick(simpleIcons, 'github'),
  vue: pick(simpleIcons, 'vuedotjs'),
  typescript: pick(simpleIcons, 'typescript'),
  unocss: pick(simpleIcons, 'unocss'),
} as const

export type HomeIconName = keyof typeof homeIcons
