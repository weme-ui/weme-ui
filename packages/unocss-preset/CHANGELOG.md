# @weme-ui/unocss-preset

6.0.0 起与仓库其余公开包使用同一个版本。新的变更记录见仓库根目录 [CHANGELOG.md](../../CHANGELOG.md)，并同步到本文件顶部。

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

## 0.8.2

### Patch Changes

- Updated dependencies [[`24d564b`](https://github.com/weme-ui/weme-ui/commit/24d564b882818244f89a98a8ba0048451902d5ff)]:
  - @weme-ui/utilities@0.1.1

## 0.8.1

### Patch Changes

- Updated dependencies [[`d537c04`](https://github.com/weme-ui/weme-ui/commit/d537c041f6650c49fb38f04731c3e0c76596d584)]:
  - @weme-ui/utilities@0.1.0

## 0.8.0

### Minor Changes

- `defineUnoConfig` 改为异步，并接受扫描选项：默认扫描 `src` 下的 `*.uno.ts` 并合并进配置，`includeStyle` 控制是否纳入 `*.style.ts`。同时导出 `loadComponentUnoConfigs` 和 `loadCustomThemes`。

## 0.7.1

### Patch Changes

- 主题、属性和颜色别名的追踪改为按当前 theme 隔离。自定义 CSS 变量在没有更具体的映射时回退到 token 本身。`space-*` 的非末子选择器会保留 `peer` / `group` 等变体前缀。`weme.config.json` 改为同步读取并按 JSON 解析。

## 0.7.0

### Minor Changes

- 导出 `defineUnoConfig`，扫描内容时包含 `*.style.ts` 和 `*.uno.ts`。`presetWemeUI` 新增 `wemeConfig`，默认读取项目里的 `weme.config.json`，并把其中的 `unocss.colors` 与 `unocss.cssVars` 合并进预设。

### Patch Changes

- 修正 `isCustomCSSVar`：token 同时匹配同名变量和以该 token 加 `-` 开头的变量。

## 0.6.1

### Patch Changes

- 修正 `isCustomCSSVar`：不含 `-` 的 token 只匹配带连字符的前缀，避免把无效主题键当成自定义 CSS 变量。

## 0.6.0

### Minor Changes

- `themes` 改为接受 `DefineThemeOptions`，可部分覆盖默认主题；未传入主题时仍使用默认主题。同时导出 `DefineThemeOptions`。

### Patch Changes

- 修正主题 token 映射：`bg` 的档位由 `subtle` 改为 `elevated`，并按当前变量名解析作用域内的 token。

## 0.5.1

### Patch Changes

- 从包入口导出 `CustomThemeTokens`，以及 `isColorAlias`、`isRawColor`、`isCustomCSSVar`、`isThemeScopeToken`、`isThemeToken`。

## 0.5.0

### Minor Changes

- 从包入口导出 `defineTheme` 和 `CustomTheme` 等主题类型，并去掉 `Theme` 上仅供内部索引的 `custom` 字段。

## 0.4.0

### Minor Changes

- 将 preset 收成单一入口，去掉 `./types`、`./colors`、`./tokens` 子路径导出。颜色生成改由 `@weme-ui/colors` 提供。

## 0.3.2

### Patch Changes

- [`3c83500`](https://github.com/weme-ui/weme-ui/commit/3c83500f06723b464c6afac2f9c0ea4baa46abd0) Thanks [@moujinet](https://github.com/moujinet)! - 用 oxfmt / oxlint 统一源码格式，不改变运行时行为。

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
