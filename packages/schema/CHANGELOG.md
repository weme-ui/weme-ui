# @weme-ui/schema

6.0.0 起与仓库其余公开包使用同一个版本。新的变更记录见仓库根目录 [CHANGELOG.md](../../CHANGELOG.md)，并同步到本文件顶部。

## v6.1.1

[compare changes](https://github.com/weme-ui/weme-ui/compare/v6.1.0...v6.1.1)

### 🚀 Enhancements

- **utilities:** Add color parsing functions for theme and neutral colors ([4f9673fb](https://github.com/weme-ui/weme-ui/commit/4f9673fb))

### ❤️ Contributors

- Yubai ([@xiaoshop](https://github.com/xiaoshop))

## v6.1.0

[compare changes](https://github.com/weme-ui/weme-ui/compare/v6.0.1...v6.1.0)

### 🚀 Enhancements

- **unocss-preset:** Update UnoCSS configuration to include content pipeline ([18bd46e9](https://github.com/weme-ui/weme-ui/commit/18bd46e9))
- **unocss:** Add UnoCSS core dependency and extend configuration types ([6df33305](https://github.com/weme-ui/weme-ui/commit/6df33305))
- **unocss-preset:** Enhance theme and configuration loading with user-defined extensions ([71a94696](https://github.com/weme-ui/weme-ui/commit/71a94696))

### 🩹 Fixes

- **cli:** Update cache path to include 'cache' directory ([e360adaf](https://github.com/weme-ui/weme-ui/commit/e360adaf))

### ❤️ Contributors

- Yubai ([@xiaoshop](https://github.com/xiaoshop))

## v6.0.1

[compare changes](https://github.com/weme-ui/weme-ui/compare/v6.0.0...v6.0.1)

### 🚀 Enhancements

- **unocss-preset:** Integrate Weme UI configuration loading for weme.config.json ([0c6d30a3](https://github.com/weme-ui/weme-ui/commit/0c6d30a3))

### 🩹 Fixes

- **unocss-preset:** Enhance Weme UI configuration loading with defu for merging options ([8d4f3e16](https://github.com/weme-ui/weme-ui/commit/8d4f3e16))
- **unocss-preset:** Ensure themes are properly defined when loading Weme UI configuration ([298c880d](https://github.com/weme-ui/weme-ui/commit/298c880d))

### ❤️ Contributors

- Yubai ([@xiaoshop](https://github.com/xiaoshop))

## v6.0.0

[compare changes](https://github.com/weme-ui/weme-ui/compare/@weme-ui/unocss-preset@0.8.2...v6.0.0)

### 🩹 Fixes

- **cli:** Trim whitespace in writtenContent function ([1fe62b53](https://github.com/weme-ui/weme-ui/commit/1fe62b53))
- **unocss-preset:** Handle undefined cssVars in size rule parsing ([9565e4a8](https://github.com/weme-ui/weme-ui/commit/9565e4a8))
- **utilities:** Add check for empty data in isCustomCssVariable function ([ff3e6660](https://github.com/weme-ui/weme-ui/commit/ff3e6660))

### ❤️ Contributors

- Yubai ([@xiaoshop](https://github.com/xiaoshop))

## 5.0.1

### Patch Changes

- [`3c83500`](https://github.com/weme-ui/weme-ui/commit/3c83500f06723b464c6afac2f9c0ea4baa46abd0) Thanks [@moujinet](https://github.com/moujinet)! - 用 oxfmt / oxlint 统一源码格式，不改变运行时行为。

## 5.0.0

### Major Changes

- [`b519185`](https://github.com/weme-ui/weme-ui/commit/b5191852fb0ddd0b24153495b55f998b2c3ae4f1) Thanks [@moujinet](https://github.com/moujinet)! - 项目配置将 `cssVars` 收进 `unocss`，颜色改为 `unocss.colors.accent` / `unocss.colors.neutral`；路径别名从 `*` 改为 `~`。省略的 registry item `type` 默认改为 `component`，锁定文件已安装 item 增加可选 `type`。

## 4.1.0

### Minor Changes

- [`7d26ebe`](https://github.com/weme-ui/weme-ui/commit/7d26ebe84817dde9cd1595b60ac5562b516be38f) Thanks [@moujinet](https://github.com/moujinet)! - 锁定文件为已安装 item 增加必填 `name`，并为已安装文件增加可选 `kind`（file / doc / example / test）。

## 4.0.0

### Major Changes

- 从独立仓库迁入 weme-ui monorepo，校验库从 Zod 换成 Valibot。这是破坏性更新，不再兼容 3.x 的 Zod schema 导出。
