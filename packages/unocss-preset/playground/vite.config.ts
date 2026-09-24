import { fileURLToPath } from 'node:url'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import { VueRouterAutoImports } from 'vue-router/unplugin'
import VueRouter from 'vue-router/vite'

export default defineConfig({
  plugins: [
    // https://github.com/vuejs/router
    VueRouter({
      dts: 'src/typed-router.d.ts',
      routesFolder: ['src/pages'],
    }),

    // https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue
    Vue({
      features: {
        propsDestructure: true,
        optionsAPI: false,
      },
    }),

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
      dirs: ['src/composables'],
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

    // https://github.com/unocss/unocss
    UnoCSS(),
  ],

  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
