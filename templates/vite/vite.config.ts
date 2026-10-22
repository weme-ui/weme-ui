import type { PluginOption } from 'vite'
import path from 'node:path'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import MagicString from 'magic-string'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { defineConfig, loadEnv } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import Layouts from 'vite-plugin-vue-layouts'
import { VueRouterAutoImports } from 'vue-router/unplugin'
import VueRouter from 'vue-router/vite'
import { homepage, repository, version } from './package.json'

const plugins: PluginOption[] = [
  // https://github.com/vuejs/router
  VueRouter({
    dts: 'src/typed-router.d.ts',
  }),

  // https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue
  Vue({
    features: {
      propsDestructure: true,
      optionsAPI: false,
    },
  }),

  // https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue-jsx
  VueJsx(),

  // https://github.com/vue-macros/vue-macros/tree/main/packages/define-options
  DefineOptions(),

  // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
  Layouts(),

  // https://github.com/antfu/unplugin-auto-import
  AutoImport({
    dts: 'src/auto-imports.d.ts',
    include: [/\.[jt]sx?$/, /\.vue$/],
    imports: [
      'vue',
      VueRouterAutoImports,
      {
        'vue-router/auto': ['useLink'],
      },
    ],
    dirs: [
      'src/composables',
    ],
    vueTemplate: true,
    viteOptimizeDeps: true,
  }),

  // https://github.com/antfu/unplugin-vue-components
  Components({
    dirs: ['src/components'],
    extensions: ['vue'],
    include: [/\.vue$/, /\.vue\?vue/, /\.vue\.[tj]sx?\?vue/, /\.vue\?v=/],
    directoryAsNamespace: true,
    collapseSamePrefixes: true,
    dts: 'src/components.d.ts',
    types: [
      { from: 'vue-router', names: ['RouterLink', 'RouterView'] },
    ],
  }),
]

export default defineConfig(({ mode }) => {
  // eslint-disable-next-line node/prefer-global/process
  const root = process.cwd()

  const {
    VITE_URL,
    VITE_PORT,
  } = loadEnv(mode, root)

  return {
    base: VITE_URL,

    server: {
      host: true,
      port: Number(VITE_PORT),
    },

    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src'),
        '~~': path.resolve(__dirname, '.'),
      },
    },

    build: {
      target: 'esnext',
      cssCodeSplit: true,
      cssMinify: 'lightningcss',
      minify: 'oxc',
      sourcemap: false,
      reportCompressedSize: false,
      chunkSizeWarningLimit: 800,
      modulePreload: { polyfill: false },
      assetsInlineLimit: 4096,
      rolldownOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules'))
              return
            // eslint-disable-next-line regexp/no-unused-capturing-group
            if (/[\\/](vue|vue-router|pinia|@vueuse|@unhead)[\\/]/.test(id))
              return 'vue-vendor'
            if (id.includes('reka-ui'))
              return 'ui-vendor'
          },
        },
      },
    },

    oxc: {
      target: 'esnext',
      pure: mode === 'production' ? ['console.log', 'debugger'] : [],
    },

    define: {
      __VERSION__: JSON.stringify(version),
      __HOMEPAGE__: JSON.stringify(homepage),
      __REPOSITORY__: JSON.stringify(repository.url),
    },

    // https://github.com/vitest-dev/vitest
    test: {
      include: ['test/**/*.test.ts'],
      environment: 'jsdom',
    },

    plugins: [
      ...plugins,

      // https://github.com/vuejs/devtools
      mode === 'development' ? VueDevTools() : undefined,

      // Purge comments
      {
        name: 'purge-comments',
        enforce: 'pre',
        transform: (code, id) => {
          if (!id.endsWith('.vue') || !code.includes('<!--'))
            return

          const s = new MagicString(code)
          // eslint-disable-next-line regexp/no-useless-non-capturing-group, regexp/sort-flags
          s.replace(/<!--(?:.*?)-->/sg, '')

          if (s.hasChanged()) {
            return {
              code: s.toString(),
              map: s.generateMap({ source: id, includeContent: true }),
            }
          }
        },
      },
    ],
  }
})
