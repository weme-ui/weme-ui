import type { Preflight } from '../types'
import { minifyCss } from '../utils'

const resetCSS = `
html,
:host {
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
  width: 0.4rem;
}

::-webkit-scrollbar:horizontal {
  height: 0.4rem;
}

::-webkit-scrollbar-track {
  background: var(--ui-bg);
}

::-webkit-scrollbar-thumb {
  background:var(--ui-border);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--neutral-8);
}

::-moz-selection {
  background: color-mix(in oklch, var(--accent-9) 20%, transparent);
}

::selection {
  background: color-mix(in oklch, var(--accent-9) 20%, transparent);
}
`

export function preflightReset(prefix: string): Preflight {
  return {
    layer: 'preflight',
    getCSS() {
      return minifyCss(resetCSS.replace(/ui/g, prefix))
    },
  }
}
