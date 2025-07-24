import type { Preflight } from '../types'
import { minifyCss } from '../utils'

const resetCSS = `
html {
  font-size: 16px;
  scroll-behavior: smooth;
  overflow-wrap: break-word;
  text-size-adjust: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
`

export function preflightReset(): Preflight {
  return {
    getCSS() {
      return minifyCss(resetCSS)
    },
    layer: 'base',
  }
}
