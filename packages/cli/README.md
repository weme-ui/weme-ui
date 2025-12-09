<p align="center">
  <img align="center" src="https://raw.githubusercontent.com/moujinet/assets/main/weme-ui/png/circle-128.png" height="128" />
  <h1 align="center">
    Weme UI <sup style="color: #4CBBA5">CLI</sup>
  </h1>
</p>

[![npm version][npm-version-src]][npm-version-href]
[![License][license-src]][license-href]

<p align="center">
  Re-usable UI components with Reka UI and UnoCSS.
</p>

---

## 如何使用

```bash
pnpm dlx @weme-ui/weme-ui <command> [options]
```

**命令列表**

- `init` - 初始化项目或注册表
- `add` - 添加组件到项目
- `info` - 获取项目或注册表信息
- `build` - 构建注册表
- `verify` - 验证注册表
- `update` - 更新项目中的组件

---

## `init` 初始化项目或注册表

```bash
pnpm dlx @weme-ui/weme-ui init --repo <repo>
```

- `repo` - 仓库地址, 默认为 `https://github.com/weme-ui/weme-ui`

### 参数列表

- `--repo` - 仓库
- `--cwd` - 工作目录
- `--registry`, `-r` - 生成注册表骨架
- `--component`, `-c` - 生成组件骨架

### 示例

**生成项目骨架**

```bash
pnpm dlx @weme-ui/weme-ui init
```

**生成项目骨架并指定默认注册表**

```bash
pnpm dlx @weme-ui/weme-ui init --repo https://github.com/weme-ui/weme-ui
```

**生成注册表骨架**

```bash
pnpm dlx @weme-ui/weme-ui init --registry
```

**生成组件骨架**

```bash
pnpm dlx @weme-ui/weme-ui init --component
```

---

## `add` 添加组件到项目

```bash
pnpm dlx @weme-ui/weme-ui add <item>,<registry>/<item>...
```

- `item` - 组件名称，多个组件用 `,` 分隔
- `registry` - 注册表名称 `<repo>/<scope>`
- `item` - 指定组件名称，多个组件用 `,` 分隔

### 参数列表

- `--cwd` - 工作目录
- `--repo` - 注册表仓库

### 示例

**添加组件到项目**

```bash
pnpm dlx @weme-ui/weme-ui add button
```

**添加组件到项目并指定注册表**

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/plus/calendar
```

> `registry` 必须通过 `add --registry` 添加到项目中。

**添加多个组件到项目**

```bash
pnpm dlx @weme-ui/weme-ui add button,modal
```

**添加多个组件到项目并指定注册表**

```bash
pnpm dlx @weme-ui/weme-ui add button,weme-ui/plus/calendar
```

**从多个注册表添加组件到项目**

```bash
pnpm dlx @weme-ui/weme-ui add your-repo/acme/foobar --repo https://github.com/owner/your-repo
```

- 默认情况下，是不需要指定 `--repo` 的，因为 `weme-ui` 会自动从 `weme.config.json` 中读取注册表信息。
- 但是，如果该注册表还未添加到项目中，那么你就需要通过 `--repo` 指定仓库地址，该注册表就会被自动添加到项目中。
- 或者，如果注册表存在重名的情况，那么你就需要通过 `--repo` 指定仓库地址。

---

## 鸣谢

- [UnoCSS][unocss-href]
- [Reka UI][reka-href]
- [Radix UI][radix-href]
- [shadcn/ui][shadcn-href]

## 许可证

[MIT][license-href] License © 2025 [weme-ui][github-href]

[npm-version-src]: https://img.shields.io/npm/v/@weme-ui/weme-ui?style=flat&colorA=1d2129&colorB=4CBBA5
[npm-version-href]: https://npmjs.com/package/@weme-ui/weme-ui
[license-src]: https://img.shields.io/github/license/weme-ui/weme-ui.svg?style=flat&colorA=1d2129&colorB=4CBBA5
[license-href]: https://github.com/weme-ui/weme-ui/blob/main/LICENSE
[github-href]: https://github.com/weme-ui/weme-ui
[unocss-href]: https://unocss.dev
[reka-href]: https://reka-ui.com
[radix-href]: https://www.radix-ui.com
[shadcn-href]: https://ui.shadcn.com
