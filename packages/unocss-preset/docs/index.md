# Getting started

安装 `@weme-ui/unocss-preset`（`presetWemeUI`），几分钟内接入颜色刻度、语义 Tokens、Theme 变量、工具类 Rules 与 Variants。

## Installation

### 1. 配置 UnoCSS

```ts
import { presetWemeUI } from '@weme-ui/unocss-preset'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetWemeUI({
      // dark: 'class' | 'media' | { light: '.light', dark: '.dark' }
      // variablePrefix: 'un-'
      // themes: [{ name: 'default', colors: { primary: 'blue' }, tokens: {...}, cssVars: {...} }]
      // cssVars: { card: { bg: 'neutral.2', padding: '1rem' } }
      // colors: { accent: { brand: '#3366ff' } }
    }),
  ],
})
```

### 2. 在页面上挂载主题

```html
<div
  data-theme="default"
  data-scaling="100%"
  data-radius="md"
  class="bg-background-base text-foreground-base p-4 rounded-md"
>
  <button class="bg-primary text-white hover:bg-primary-10">Primary</button>
</div>
```

## Customizing your theme

配置通过 `presetWemeUI(options)` 管理与应用。

### 配置项摘要

| 选项                  | 默认          | 说明                                       |
| --------------------- | ------------- | ------------------------------------------ |
| `dark`                | `'class'`     | 暗色模式：`class` / `media` / 自定义选择器 |
| `variablePrefix`      | `'un-'`       | 内部 CSS 变量前缀                          |
| `prefix`              | `undefined`   | 工具类前缀                                 |
| `arbitraryVariants`   | `true`        | 任意变体 extractor                         |
| `important`           | `false`       | 全局 `!important` 或作用域选择器           |
| `preflights.reset`    | `true`        | Tailwind 风格 reset + Weme 扩展            |
| `preflights.theme`    | `'on-demand'` | Theme CSS 变量生成策略                     |
| `preflights.property` | 启用          | `@property` preflight                      |
| `colors`              | `{}`          | 额外 accent / neutral 单色                 |
| `themes`              | `[]`          | 空则注入默认 `default` 主题                |
| `cssVars`             | `{}`          | 全局自定义 CSS 变量                        |

### Layer 顺序

| Layer        | 优先级 | 内容                            |
| ------------ | ------ | ------------------------------- |
| `properties` | -200   | `@property` 声明                |
| `theme`      | -150   | 颜色 / Theme / Tokens / CssVars |
| `base`       | -100   | CSS Reset                       |

## Take it further

继续了解主题与工具类能力：

- [Theme overview](./theme/index.md) — Theme 解剖结构、Preflight 与断点等主题值
- [Color](./theme/color.md) — 色板、刻度、亮暗色与 P3、工具类颜色解析
- [Dark mode](./theme/dark-mode.md) — class / media 切换、色板覆盖、Variants、推荐实践
- [Tokens](./theme/tokens.md) — 颜色别名、语义 Tokens、自定义 CssVars、模糊匹配
- [Rules](./utilities/rules.md) — 全部工具类规则速查
- [Variants](./utilities/variants.md) — 断点、暗色、伪类、ARIA、容器查询等变体
