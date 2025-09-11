<p align="center">
  <img align="center" src="https://raw.githubusercontent.com/moujinet/assets/main/weme-ui/png/circle-128.png" height="128" />
  <h1 align="center">
    Weme UI <sup style="color: #4CBBA5">nuxt</sup>
  </h1>
</p>

[![npm version][npm-version-src]][npm-version-href]
[![License][license-src]][license-href]

<p align="center">
  Re-usable UI components with Reka UI and UnoCSS.
</p>

## 开始之前

模块仅为 `@weme-ui/weme-ui` 提供辅助能力，如：加载主题配置，生成 `@weme-ui/unocss-preset` 配置，注册图标及工具库等。

## 如何开始

### 安装

```bash
pnpm add -D @weme-ui/nuxt @weme-ui/unocss-preset @unocss/nuxt @nuxt/icon @vueuse/nuxt unocss
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxt/icon',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@weme-ui/nuxt',
  ],
})
```

### 配置

```ts
interface WemeNuxtOptions {
  /**
   * Prefix for css variables
   *
   * @default 'ui'
   */
  variablePrefix?: string

  /**
   * Custom accent colors
   */
  accentColors?: Record<string, string>

  /**
   * custom neutral colors
   */
  neutralColors?: Record<string, string>

  /**
   * Import themes from directories
   */
  imports?: {
    /**
     * Directories to import themes from
     */
    themes?: string[]
  }
}
```

## 许可证

[MIT][license-href] License © 2025 [weme-ui][github-href]

[npm-version-src]: https://img.shields.io/npm/v/@weme-ui/nuxt?style=flat&colorA=1d2129&colorB=4CBBA5
[npm-version-href]: https://npmjs.com/package/@weme-ui/nuxt
[license-src]: https://img.shields.io/github/license/weme-ui/weme-ui.svg?style=flat&colorA=1d2129&colorB=4CBBA5
[license-href]: https://github.com/weme-ui/weme-ui/blob/main/LICENSE
[github-href]: https://github.com/weme-ui/weme-ui
