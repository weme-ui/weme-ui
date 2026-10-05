# Dark mode

用 appearance 管理并集成暗色模式。

## Overview

Weme 的暗色模式分三层：

1. **色板变量**：同一 `--blue-9` 在亮色 / 暗色下指向不同值（preflight）
2. **语义别名 / Tokens**：挂在 `[data-theme]` 上，暗色用 `.dark` 前缀再写一遍
3. **工具类 Variants**：`dark:` / `light:` / `@dark:` 等，按配置决定用 class 还是 media

默认 `options.dark = 'class'`，以 `.dark` / `.light` 切换。亮暗切换开箱即用，无需额外设计一套样式。

### color-scheme（Reset）

```css
:root,
.light {
  color-scheme: light;
}

.dark {
  color-scheme: dark;
}
```

也可用工具类：`scheme-light`、`scheme-dark`、`scheme-light dark`。

## Basic usage

### 配置

| `dark` 值         | `dark:` / `light:` 行为                                                           |
| ----------------- | --------------------------------------------------------------------------------- |
| `'class'`（默认） | `.dark $$ .x` / `.light $$ .x`                                                    |
| `'media'`         | `@media (prefers-color-scheme: dark/light)`                                       |
| `{ dark, light }` | 自定义选择器前缀，例如 `{ dark: '[data-mode=dark]', light: '[data-mode=light]' }` |

```ts
presetWemeUI({
  dark: 'class', // 或 'media'，或 { dark: '.dark', light: '.light' }
})
```

### Variants

| 写法         | 输出                                                                           | 是否受 `options.dark` 影响 |
| ------------ | ------------------------------------------------------------------------------ | -------------------------- |
| `dark:*`     | class 模式：`.dark $$ .x`；media 模式：`@media (prefers-color-scheme: dark)`   | 是                         |
| `light:*`    | class 模式：`.light $$ .x`；media 模式：`@media (prefers-color-scheme: light)` | 是                         |
| `.dark:*`    | 始终 `.dark $$ .x`                                                             | 否                         |
| `.light:*`   | 始终 `.light $$ .x`                                                            | 否                         |
| `@dark:*`    | 始终 `@media (prefers-color-scheme: dark)`                                     | 否                         |
| `@light:*`   | 始终 `@media (prefers-color-scheme: light)`                                    | 否                         |
| `not-dark:*` | `@media not (prefers-color-scheme: dark)`                                      | 否                         |

`$$` 表示 UnoCSS 的父级选择器拼接：`.dark .x`（暗色祖先下的当前元素）。

### Class 模式（推荐默认）

在根节点切换 `.dark` / `.light`：

```html
<html class="light">
  <body class="bg-background-base text-foreground-base">
    <button class="bg-accent text-white">Accent</button>
    <!-- 仅在暗色下额外覆盖时才用 dark: -->
    <div class="border-border-base dark:shadow-lg">…</div>
  </body>
</html>
```

```js
document.documentElement.classList.toggle('dark', isDark)
document.documentElement.classList.toggle('light', !isDark)
```

输出大致为：

```text
.dark .border-border-base { … }   /* 若写了 dark: 前缀 */
.dark { --blue-9: <dark value>; } /* 色板变量覆盖 */
```

### 颜色 CSS 变量（Theme preflight）

```css
:root,
.light {
  --amber-1: oklch(...); /* 亮色 OKLCH */
}

.dark {
  --amber-1: oklch(...); /* 暗色 OKLCH */
}

@supports (color: color(display-p3 1 1 1)) {
  @media (color-gamut: p3) {
    :root,
    .light {
      --amber-1: color(display-p3...);
    }

    .dark {
      --amber-1: color(display-p3...);
    }
  }
}
```

要点：

- 变量名不变（仍是 `--amber-1`），暗色通过 `.dark` 覆盖值
- 语义色如 `bg-blue-9`、`text-foreground-base` 在切换 class 后会自动跟新值，不必再写 `dark:bg-…`
- `on-demand` 模式下只生成用到的颜色变量

### 颜色别名（Custom theme preflight）

```css
:root,
:where([data-theme='default']) {
  --accent-9: var(--custom-accent-9, var(--clay-9));
}

.dark:where([data-theme='default']) {
  --accent-9: var(--custom-accent-9, var(--clay-9));
}
```

- 别名指向色名时：亮暗都映射到同一 `--{color}-{n}`，由色板 preflight 负责亮暗值
- 别名为 raw 颜色时：亮暗各自生成一套刻度回退值

语义 Tokens（`--foreground-base` 等）写在主题选择器上；它们引用的 `--neutral-11` 等会随 `.dark` 变，因此通常也不需要 `dark:text-…`。

## Inheriting system appearance

### Media 模式

跟随系统偏好，不必手动加 class：

```ts
presetWemeUI({ dark: 'media' })
```

```html
<div class="bg-white dark:bg-gray-1">…</div>
```

```text
@media (prefers-color-scheme: dark) {
  .x { background-color: var(--gray-1); }
}
```

注意：色板 preflight 仍写在 `.dark` / `.light` 选择器上。若只用 media、页面上没有 `.dark` class，**色板变量不会自动切到暗色值**。media 模式下若要让 `--blue-9` 等跟着系统变，仍需在根上同步 `.dark`，或改用显式 `dark:bg-blue-3` 这类覆盖，或自行写与 media 对齐的变量层。

更稳妥的做法：根节点用 JS / CSS 把 `prefers-color-scheme` 同步成 `.dark` class，Variants 继续用默认 `'class'`。

### 强制指定策略

不想被 `options.dark` 影响时：

```html
<!-- 永远按 class -->
<div class=".dark:bg-gray-2">…</div>

<!-- 永远按系统 media -->
<div class="@dark:bg-gray-2">…</div>

<!-- 非暗色系统偏好 -->
<div class="not-dark:shadow-sm">…</div>
```

### 自定义选择器

```ts
presetWemeUI({
  dark: {
    dark: '[data-mode="dark"]',
    light: '[data-mode="light"]',
  },
})
```

```html
<html data-mode="dark">
  <div class="dark:bg-background-elevated">…</div>
</html>
```

```text
dark:* -> [data-mode="dark"] $$ .x
```

色板 / Tokens preflight 仍使用硬编码的 `.dark` / `.light`。自定义选择器时，请保证页面上也带有 `.dark`，或自行同步变量作用域，否则 Variants 与色板可能脱节。

## 推荐实践

1. **优先用语义色 / Tokens**：`bg-background-base`、`text-foreground-base`、`border-border-base`、`bg-accent`。切换 `.dark` 后变量自动换值。
2. **`dark:` 留给结构差异**：例如暗色下加深阴影、换边框、显示不同装饰，而不是给每个颜色再写一套。
3. **根节点同时维护 class 与 `color-scheme`**：Reset 已在 `.dark` 上设置 `color-scheme: dark`，有利于原生控件与滚动条。
4. **与 `data-theme` 组合**：

```html
<html class="dark" data-theme="default" data-scaling="100%" data-radius="md">
  …
</html>
```

## 与 media Variants 的关系

Theme 里还有 `media.os_dark` / `media.os_light`，可用：

```html
<div class="media-os_dark:opacity-90">…</div>
```

这与 `@dark:` 同类，走 `@media (prefers-color-scheme: …)`，不依赖 `options.dark`。详见 [Variants](../utilities/variants.md)。

## 小结

| 目标         | 做法                                       |
| ------------ | ------------------------------------------ |
| 整站亮暗切换 | 根节点 `.light` / `.dark` + 语义 Tokens    |
| 局部暗色样式 | `dark:…`（随 `options.dark`）              |
| 强制 class   | `.dark:…`                                  |
| 强制系统偏好 | `@dark:…` / `not-dark:…`                   |
| 原生控件配色 | `.dark` 的 `color-scheme` 或 `scheme-dark` |
