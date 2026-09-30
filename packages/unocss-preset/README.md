![Weme UI](https://raw.githubusercontent.com/moujinet/assets/main/weme-ui/png/circle-128.png)

# Weme UI UnoCSS Preset

![npm version](https://img.shields.io/npm/v/@weme-ui/weme-ui?style=flat&colorA=1d2129&colorB=4CBBA5)
![License](https://img.shields.io/github/license/weme-ui/weme-ui.svg?style=flat&colorA=1d2129&colorB=4CBBA5)
![code style](https://antfu.me/badge-code-style.svg)

Re-usable UI components with Reka UI and UnoCSS.

⚠️ Do not use in production. This project is still in early development.

## 文档

完整能力说明见 [`docs/`](./docs/)：

- [Colors](./docs/colors.md) — 色板、刻度、亮暗色与 P3
- [Dark Mode](./docs/dark-mode.md) — class / media 切换与推荐实践
- [Theme](./docs/theme.md) — Spacing、Radius、Breakpoint、Typography 等
- [Tokens & CssVars](./docs/tokens.md) — 颜色别名、语义 Tokens、自定义变量
- [Rules](./docs/rules.md) — 全部工具类规则速查
- [Variants](./docs/variants.md) — 断点、暗色、伪类、ARIA 等变体

## 生成颜色 CSS 变量

```css
/* layer: theme */
:root,
.light {
  --amber-1: oklch(99.425% 0.00285 84.559);
}

.dark {
  --amber-1: oklch(18.496% 0.01336 77.796);
}

@supports (color: color(display-p3 1 1 1)) {
  @media (color-gamut: p3) {
    :root,
    .light {
      --amber-1: color(display-p3 0.995 0.992 0.985);
    }

    .dark {
      --amber-1: color(display-p3 0.082 0.07 0.05);
    }
  }
}

:where([data-theme='default']) {
  --primary-1: var(--amber-1);
}

.dark:where([data-theme='default']) {
  --primary-1: var(--amber-1);
}

:where([data-theme='default']) {
  --text-color-highlighted: var(--neutral-12);
  --text-color: var(--neutral-11);
  --text-color-subtle: var(--neutral-6);
  --text-color-muted: var(--neutral-4);
  --text-color-inverted: var(--neutral-1);
}

/* layer: default */
.bg-amber-1 {
  background-color: var(--amber-1);
}
.bg-amber-1\/10 {
  background-color: color-mix(in srgb, var(--amber-1) var(--un-bg-opacity), transparent);
}
@supports (color: color-mix(in lab, red, red)) {
  .bg-amber-1\/10 {
    background-color: color-mix(in oklab, var(--amber-1) var(--un-bg-opacity), transparent);
  }
}
```

## 规则调整清单

- [x] background
- [x] behaviors
- [x] border
- [x] color
- [x] decoration
- [x] divide
- [x] placeholder
- [x] svg
- [x] typography
- [x] ~~filters~~
- [x] ~~gap~~
- [x] ~~mask~~
- [x] ~~ring~~
- [x] ~~shadow~~

## 许可证

[MIT](https://github.com/weme-ui/weme-ui/blob/main/LICENSE) License © 2025 [weme-ui](https://github.com/weme-ui/weme-ui)
