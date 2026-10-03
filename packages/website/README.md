<p align="center">
  <img align="center" src="https://raw.githubusercontent.com/moujinet/assets/main/weme-ui/png/circle-128.png" alt="Weme UI" height="128" />
  <h1 align="center">
    Weme UI <sup style="color: #4CBBA5">Website</sup>
  </h1>
</p>

[![npm version][npm-version-src]][npm-version-href]
[![License][license-src]][license-href]
[![code style][code-style-src]][code-style-href]

<p align="center">
  Registry 驱动的 Astro 文档站。组件源码、文档与示例维护在 <code>registry</code>，本包负责路由、布局与展示。
</p>

<p align="center">
  ⚠️ Do not use in production. This project is still in early development.
</p>

## 职责

`packages/website` 不维护组件实现，也不单独存放业务文档。组件、工具函数、组合式函数放在 `registry/<library>/`；部分 packages（如 `unocss-preset`）的说明文档放在各自的 `docs/`。文档站通过文件 glob 读取本地内容，不将组件库作为 npm 依赖安装。

不同 library 各自维护介绍文档与侧栏结构。构建产物输出到仓库根目录 `docs/`，用于 GitHub Pages 等静态托管。

目录与路由约定以本文为准。使用 AI 编写或更新 registry item 文档时，参见 [registry-docs-author](../../.cursor/skills/registry-docs-author/SKILL.md)。

## 目录结构

Registry 组件库：

```text
registry/<library>
├── docs/              # 库级文档，显示在侧栏顶部
├── registry.json      # item catalog，驱动侧栏组件树
└── src/
    ├── components/
    ├── composables/
    ├── layouts/
    ├── blocks/
    └── utils/
```

Package 文档（与 registry 的 `docs/` 约定相同，当前允许列表见 `src/lib/registry.ts` 中的 `PACKAGE_DOC_IDS`）：

```text
packages/unocss-preset
├── docs/              # 显示在侧栏顶部；README.md / index.md 为默认页
└── package.json       # 提供名称、描述、版本
```

单个 component / composable / layout / block 建议将源码、文档与示例放在同一目录：

```text
registry/slim/src/components/button
├── README.md
├── button.vue
├── button.props.ts
├── button.style.ts
├── button.test.ts
└── examples/
    └── button-1.vue
```

`util` 仍登记在 `registry.json`（安装语义），但不进入文档站侧栏与详情页。`component`、`composable`、`layout`、`block` 会加载同目录 README 与 examples。

## 侧栏与路由

侧栏上方来自：

- `registry/<library>/docs/**/*.{md,mdx}`
- 或 `packages/<id>/docs/**/*.{md,mdx}`（需在 `PACKAGE_DOC_IDS` 中登记）

规则：

- 导航标题优先取 Markdown 第一个 `h1`，否则由文件名推导
- 顺序按文件路径排序
- `index.md` 或 `README.md` 对应 `/<library>/docs/`
- 当前不要求用 frontmatter 控制顺序或标题

侧栏下方仅 registry 有：来自 `registry.json` 的 `items`，分为三层：

- `type` → 大类：`component` → Components，`composable` → Composables，`layout` → Layouts，`block` → Blocks（`util` 不进入侧栏）
- `meta["docs.category"]` / `meta["docs.categoryLabel"]` → 分类
- `items[]` 中的每一项 → 链接

推荐的 category id：`actions`、`data-display`、`feedback`、`form`、`layout`、`navigation`、`overlay`、`typography`、`utilities`。未设置 `docs.category` 时使用默认分组。侧栏顺序与 `items` 数组顺序一致，暂无 `docs.order`。

路由：

```text
/                              # 总览（registry + package docs）
/<library>/                    # 单个 library / package 首页
/<library>/docs/...            # 库级或 package 文档
/<library>/components/button/
/<library>/composables/use-form/
/<library>/layouts/...
/<library>/blocks/...
/unocss-preset/docs/           # package docs 示例
```

## 登记 item

`registry.json` 是组件树与详情页的权威 catalog。website 会扫描 README 与 examples 文件，但 item 是否出现、标题、分组以 `registry.json` 为准。

示例：

```json
{
  "name": "button",
  "type": "component",
  "title": "Button",
  "description": "Used to trigger an action or event.",
  "meta": {
    "docs.category": "actions",
    "docs.categoryLabel": "Actions"
  },
  "files": [
    { "type": "component", "path": "src/components/button/button.vue" },
    { "type": "component", "path": "src/components/button/button.props.ts" },
    { "type": "component", "path": "src/components/button/button.style.ts" },
    { "type": "component", "kind": "doc", "path": "src/components/button/README.md" },
    { "type": "component", "kind": "example", "path": "src/components/button/examples/button-1.vue" },
    { "type": "component", "kind": "test", "path": "src/components/button/button.test.ts" }
  ]
}
```

说明：

- `type` 同时影响安装语义与文档站大类
- 主源码的 `kind` 可省略或为 `file`；文档为 `doc`，示例为 `example`，测试为 `test`
- `files[].type` 仅使用：`component`、`composable`、`ui`、`block`、`layout`、`page`、`util`
- `meta["docs.*"]` 仅用于文档站展示；不要使用旧版 `hash` 字段

## 编写 README

在 item 同目录创建 `README.md`，并在 `files` 中声明 `kind: "doc"`。推荐结构：

```markdown
# Button

简要说明组件用途。

## Preview

## Installation

## Usage

## Examples

## Props

## Events

## Slots

## Source
```

Props、Events、Slots 须依据源码或类型填写；信息不足时标注「待补充」，不要编造。可运行示例放在 `examples/*.vue`，README 中说明或引用即可；详情页会渲染 Live Preview。说明使用中文，Vue、TypeScript、UnoCSS 等专有名词保持英文。详情页布局会渲染标题，并去除 README 顶部重复的 `h1`。

使用 AI 编写时，应先阅读源码与 `registry.json`，再更新 README、examples 与 catalog。具体流程见 [registry-docs-author](../../.cursor/skills/registry-docs-author/SKILL.md)。

示例中的 `~/...` 解析到同一 library 的 `src` 根路径，不支持跨 library。

## 本地验证

```bash
bun --filter @weme-ui/website dev
# http://localhost:4321/weme-ui/slim/components/button/
```

确认侧栏分组、示例预览与页面导航是否正确。

其它命令：

- `bun --filter @weme-ui/website build:docs` — 构建到根目录 `docs/`
- `bun --filter @weme-ui/website preview` — 预览构建产物
- `bun --filter @weme-ui/website typecheck` — Astro / TypeScript 检查

## 相关链接

- [registry-docs-author](../../.cursor/skills/registry-docs-author/SKILL.md)
- [RFC 0002](../../rfcs/0002-registry-driven-website-docs.md)
- [registry/README.md](../../registry/README.md)

## 许可证

[MIT][license-href] License © 2025 [weme-ui][github-href]

[npm-version-src]: https://img.shields.io/npm/v/@weme-ui/weme-ui?style=flat&colorA=1d2129&colorB=4CBBA5
[npm-version-href]: https://npmjs.com/package/@weme-ui/weme-ui
[license-src]: https://img.shields.io/github/license/weme-ui/weme-ui.svg?style=flat&colorA=1d2129&colorB=4CBBA5
[license-href]: https://github.com/weme-ui/weme-ui/blob/main/LICENSE
[github-href]: https://github.com/weme-ui/weme-ui
[code-style-src]: https://antfu.me/badge-code-style.svg
[code-style-href]: https://github.com/antfu/eslint-config
