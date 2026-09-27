<p align="center">
  <img align="center" src="https://raw.githubusercontent.com/moujinet/assets/main/weme-ui/png/circle-128.png" alt="Weme UI" height="128" />
  <h1 align="center">
    Weme UI <sup style="color: #4CBBA5">UnoCSS Preset</sup>
  </h1>
</p>

[![npm version][npm-version-src]][npm-version-href]
[![License][license-src]][license-href]
[![code style][code-style-src]][code-style-href]

<p align="center">
  Re-usable UI components with Reka UI and UnoCSS.
</p>

<p align="center">
  ⚠️ Do not use in production. This project is still in early development.
</p>

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

## 许可证

[MIT][license-href] License © 2025 [weme-ui][github-href]

[npm-version-src]: https://img.shields.io/npm/v/@weme-ui/weme-ui?style=flat&colorA=1d2129&colorB=4CBBA5
[npm-version-href]: https://npmjs.com/package/@weme-ui/weme-ui
[license-src]: https://img.shields.io/github/license/weme-ui/weme-ui.svg?style=flat&colorA=1d2129&colorB=4CBBA5
[license-href]: https://github.com/weme-ui/weme-ui/blob/main/LICENSE
[github-href]: https://github.com/weme-ui/weme-ui
[code-style-src]: https://antfu.me/badge-code-style.svg
[code-style-href]: https://github.com/antfu/eslint-config
