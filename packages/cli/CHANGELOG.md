# @weme-ui/weme-ui

6.0.0 起与仓库其余公开包使用同一个版本。新的变更记录见仓库根目录 [CHANGELOG.md](../../CHANGELOG.md)，并同步到本文件顶部。

## v6.0.0

[compare changes](https://github.com/weme-ui/weme-ui/compare/@weme-ui/unocss-preset@0.8.2...v6.0.0)

### 🩹 Fixes

- **cli:** Trim whitespace in writtenContent function ([1fe62b53](https://github.com/weme-ui/weme-ui/commit/1fe62b53))
- **unocss-preset:** Handle undefined cssVars in size rule parsing ([9565e4a8](https://github.com/weme-ui/weme-ui/commit/9565e4a8))
- **utilities:** Add check for empty data in isCustomCssVariable function ([ff3e6660](https://github.com/weme-ui/weme-ui/commit/ff3e6660))

### ❤️ Contributors

- Yubai ([@xiaoshop](https://github.com/xiaoshop))

## 0.2.15

### Patch Changes

- Updated dependencies []:
  - @weme-ui/unocss-preset@0.8.2

## 0.2.14

### Patch Changes

- Updated dependencies []:
  - @weme-ui/unocss-preset@0.8.1

## 0.2.13

### Patch Changes

- Updated dependencies []:
  - @weme-ui/unocss-preset@0.8.0

## 0.2.12

### Patch Changes

- Updated dependencies []:
  - @weme-ui/unocss-preset@0.7.1

## 0.2.11

### Patch Changes

- Updated dependencies []:
  - @weme-ui/unocss-preset@0.7.0

## 0.2.10

### Patch Changes

- Updated dependencies []:
  - @weme-ui/unocss-preset@0.6.1

## 0.2.9

### Patch Changes

- Updated dependencies []:
  - @weme-ui/unocss-preset@0.6.0

## 0.2.8

### Patch Changes

- Updated dependencies []:
  - @weme-ui/unocss-preset@0.5.1

## 0.2.7

### Patch Changes

- Updated dependencies []:
  - @weme-ui/unocss-preset@0.5.0

## 0.2.6

### Patch Changes

- Updated dependencies []:
  - @weme-ui/unocss-preset@0.4.0

## 0.2.5

### Patch Changes

- [`3c83500`](https://github.com/weme-ui/weme-ui/commit/3c83500f06723b464c6afac2f9c0ea4baa46abd0) Thanks [@moujinet](https://github.com/moujinet)! - 用 oxfmt / oxlint 统一源码格式，不改变运行时行为。
- Updated dependencies [[`3c83500`](https://github.com/weme-ui/weme-ui/commit/3c83500f06723b464c6afac2f9c0ea4baa46abd0)]:
  - @weme-ui/schema@5.0.1
  - @weme-ui/unocss-preset@0.3.2

## 0.2.4

### Patch Changes

- Updated dependencies [[`a316e5b`](https://github.com/weme-ui/weme-ui/commit/a316e5b353ff2d8555b3694146f73e4bc55adabb)]:
  - @weme-ui/unocss-preset@0.3.1

## 0.2.3

### Patch Changes

- Updated dependencies [[`a67ecc7`](https://github.com/weme-ui/weme-ui/commit/a67ecc75490cd06527048e15b7f5642915d85bcd)]:
  - @weme-ui/unocss-preset@0.3.0

## 0.2.2

### Patch Changes

- Updated dependencies [[`898b2a9`](https://github.com/weme-ui/weme-ui/commit/898b2a980ca26fd2142dd078ac6a20446acf2f0c)]:
  - @weme-ui/unocss-preset@0.2.3

## 0.2.1

### Patch Changes

- 发布到 npm 时把 `workspace:*` 依赖解析成真实版本，修复安装失败。

## 0.2.0

### Minor Changes

- [`b64df64`](https://github.com/weme-ui/weme-ui/commit/b64df6466c7e51212ec15cff0728a117ec6c831a) Thanks [@moujinet](https://github.com/moujinet)! - 在 monorepo 中重写 CLI：`init` 初始化项目，`add` 从 registry 安装 item，并支持按 file / doc 等 kinds 过滤。
