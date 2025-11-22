import type { Preflight, WemePresetResolvedOptions } from '../types'
import { minifyCss } from '../utils'

const resetCSS = `
html {
  text-size-adjust: 100%;
  scroll-behavior: smooth;
  overflow-wrap: break-word;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
}

body {
  color: var(--ui-fg);
  background: var(--ui-bg);
}

::-webkit-scrollbar {
  width: 0.5rem;
}

::-webkit-scrollbar:horizontal {
  height: 0.5rem;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--ui-border);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--neutral-8);
}

::-moz-selection {
  background: color-mix(in oklch, var(--primary-9) 20%, transparent);
}

::selection {
  background: color-mix(in oklch, var(--primary-9) 20%, transparent);
}
`

export function reset(options: WemePresetResolvedOptions): Preflight {
  return {
    layer: 'base',
    getCSS({ generator }) {
      return minifyCss(
        resetCSS.replace(/ui/g, options.variablePrefix),
        generator.config.envMode === 'dev',
      )
    },
  }
}
