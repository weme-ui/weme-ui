<p align="center">
  <img align="center" src="https://raw.githubusercontent.com/moujinet/assets/main/weme-ui/png/circle-128.png" height="128" />
  <h1 align="center">
    Weme UI <sup style="color: #4CBBA5">unocss</sup>
  </h1>
</p>

[![npm version][npm-version-src]][npm-version-href]
[![License][license-src]][license-href]

## 特性

- 🫟 [UnoCSS Wind4][unocss-href]
- 🧩 [Reka UI][reka-href] 简化 `data-*` 样式编写
- 🏖️ 自定义主题风格

## 如何开始

```shell
pnpm i -D @weme-ui/unocss-preset unocss
```

```ts
// uno.config.ts
import { presetWemeUI } from '@weme-ui/unocss-preset'
import { defineConfig, presetWind4 } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4({
      reset: true,
      arbitraryVariants: true,
    }),
    presetWemeUI(),
  ],
})
```

## 许可证

[MIT][license-href] License © 2025 [weme-ui][github-href]

[github-href]: https://github.com/weme-ui/weme-ui
[npm-version-src]: https://img.shields.io/npm/v/@weme-ui/unocss-preset?style=flat&colorA=1d2129&colorB=4CBBA5
[npm-version-href]: https://npmjs.com/package/@weme-ui/unocss-preset
[license-src]: https://img.shields.io/github/license/weme-ui/weme-ui.svg?style=flat&colorA=1d2129&colorB=4CBBA5
[license-href]: https://github.com/weme-ui/weme-ui/blob/main/LICENSE
[unocss-href]: https://unocss.dev
[reka-href]: https://reka-ui.com
