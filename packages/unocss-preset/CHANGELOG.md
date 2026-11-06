# @weme-ui/unocss-preset

## 0.3.1

### Patch Changes

- [`a316e5b`](https://github.com/weme-ui/weme-ui/commit/a316e5b353ff2d8555b3694146f73e4bc55adabb) Thanks [@moujinet](https://github.com/moujinet)! - 自定义 CSS 变量遇到尺寸值时原样输出，不再包成颜色别名变量。

## 0.3.0

### Minor Changes

- [`a67ecc7`](https://github.com/weme-ui/weme-ui/commit/a67ecc75490cd06527048e15b7f5642915d85bcd) Thanks [@moujinet](https://github.com/moujinet)! - 移除 `animate-carousel` 动画。

## 0.2.3

### Patch Changes

- [`898b2a9`](https://github.com/weme-ui/weme-ui/commit/898b2a980ca26fd2142dd078ac6a20446acf2f0c) Thanks [@moujinet](https://github.com/moujinet)! - 新增 `animate-carousel` 动画，并为 `stroke-dashoffset` 补上带单位的 CSS 属性解析。

## 0.2.2

### Patch Changes

- [`8b371c1`](https://github.com/weme-ui/weme-ui/commit/8b371c1f2ca05f85c66afea405e2d69074798c0f) Thanks [@moujinet](https://github.com/moujinet)! - 解析 `accent-9` 等颜色别名时追踪实际色板，并在仅有颜色变量时仍生成 theme CSS。

## 0.2.1

### Patch Changes

- 发布到 npm 时把 `catalog:` 依赖解析成真实版本，修复安装失败。

## 0.2.0

### Minor Changes

- 在 weme-ui monorepo 中重写并独立发版。运行时依赖会随包装入，不再只靠 peer 解析 `colorjs.io` / `bezier-easing` 等包。
