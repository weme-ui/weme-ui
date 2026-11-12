import type { Preflight } from '@unocss/core'
import type { Theme } from '../theme'
import { compressCSS } from '../utils'

const preflightCSS = `
/*
  Color Scheme
*/
:root, .light { color-scheme: light; }
.dark { color-scheme: dark; }

/*
  Scaling
*/
[data-scaling='90%'] { --scaling: 0.9; }
[data-scaling='95%'] { --scaling: 0.95; }
[data-scaling='100%'] { --scaling: 1; }
[data-scaling='105%'] { --scaling: 1.05; }
[data-scaling='110%'] { --scaling: 1.1; }

/*
  Radius
*/
[data-radius='none'] { --radius-factor: 0; }
[data-radius='xs'] { --radius-factor: 0.5; }
[data-radius='sm'] { --radius-factor: 0.75; }
[data-radius='md'] { --radius-factor: 1; }
[data-radius='lg'] { --radius-factor: 1.5; }
[data-radius='full'] { --radius-factor: 1.5; }
`

export function preflight(): Preflight<Theme> | undefined {
  return {
    getCSS: ({ generator }) => {
      return compressCSS(preflightCSS, generator.config.envMode === 'dev')
    },
    layer: 'base',
  }
}
