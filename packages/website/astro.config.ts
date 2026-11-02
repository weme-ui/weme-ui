import { satteri } from '@astrojs/markdown-satteri'
import UnoCSS from '@unocss/astro'
import { defineConfig } from 'astro/config'
import { rewritePresetDocLinks } from './src/lib/rewrite-doc-links'
import { SITE_BASE } from './src/lib/site'

export default defineConfig({
  site: 'https://weme-ui.github.io',
  base: SITE_BASE,
  outDir: '../../docs',
  integrations: [
    UnoCSS({
      injectReset: false,
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'vitesse-black',
    },
    processor: satteri({
      mdastPlugins: [rewritePresetDocLinks()],
    }),
  },
})
