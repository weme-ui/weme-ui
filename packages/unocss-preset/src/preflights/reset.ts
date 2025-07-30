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
}

::-webkit-scrollbar {
  width: 0.25rem;
}

::-webkit-scrollbar:horizontal {
  height: 0.25rem;
}

::-webkit-scrollbar-track {
  border-radius: 3px;
  background: var(--ui-bg);
}

::-webkit-scrollbar-thumb {
  background: color-mix(in oklch, var(--ui-neutral-6) 50%, transparent);;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--ui-neutral-6);
}

::-moz-selection {
  background: color-mix(in oklch, var(--ui-accent-9) 20%, transparent);
}

::selection {
  background: color-mix(in oklch, var(--ui-accent-9) 20%, transparent);
}
`

export function preflightReset(prefix: string): Preflight {
  return {
    getCSS() {
      return minifyCss(resetCSS.replace(/ui-/g, prefix))
    },
    layer: 'preflight',
  }
}
