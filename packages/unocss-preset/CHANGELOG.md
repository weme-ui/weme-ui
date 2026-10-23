# @weme-ui/unocss-preset

## 0.2.2

### Patch Changes

- [`8b371c1`](https://github.com/weme-ui/weme-ui/commit/8b371c1f2ca05f85c66afea405e2d69074798c0f) Thanks [@moujinet](https://github.com/moujinet)! - 解析 `accent-9` 等颜色别名时追踪实际色板，并在仅有颜色变量时仍生成 theme CSS。

## 0.2.1

### Patch Changes

- 发布到 npm 时把 `catalog:` 依赖解析成真实版本，修复安装失败。

## 0.2.0

### Minor Changes

- 在 weme-ui monorepo 中重写并独立发版。运行时依赖会随包装入，不再只靠 peer 解析 `colorjs.io` / `bezier-easing` 等包。
