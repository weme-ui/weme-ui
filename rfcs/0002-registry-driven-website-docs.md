# RFC 0002：Registry 驱动的 Astro 文档站

- **状态**：草案
- **相关目录**：`packages/website`、`registry`、`docs`
- **相关 schema**：`registry.schema.json`

## 摘要

约定以 `registry` 作为组件源码、组件文档、示例和组件元数据的唯一维护入口，`packages/website` 只作为 Astro 文档站的路由层、布局层和展示层。文档站通过 alias 直接读取 `registry` 中的源码形态文件，不把组件库作为独立依赖安装到 website 中。

Astro 的构建产物输出到仓库根目录 `docs`，用于 GitHub Pages 等静态托管目标。

## 动机

1. 组件实现、文档和示例应就近维护，避免组件开发与文档维护分散在不同项目或目录。
2. 不同 registry 面向的问题域可能不同，因此组件库介绍、指南、主题等 docs 不能由 website 统一硬编码。
3. 文档站应服务于 registry，而不是反向要求 registry 适配一个独立文档项目。
4. 首期目标是跑通 registry-based 组件开发流：只维护 registry，就能完成组件开发、示例预览、文档展示和基础校验。

## 目录约定

```text
weme-ui
├── packages
│   └── website          # Astro source，只负责路由、页面骨架和展示逻辑
├── registry
│   ├── slim             # 一个组件库 registry
│   └── std              # 未来可增加的组件库 registry
└── docs                 # Astro dist，静态部署目标
```

组件库内部采用源码、文档、示例共存：

```text
registry/slim
├── docs                 # 当前组件库自己的介绍、指南、主题等文档
├── registry.json        # 当前组件库的 item catalog
└── src
    ├── components
    │   └── button
    │       ├── README.md
    │       ├── button.vue
    │       ├── button.props.ts
    │       ├── button.style.ts
    │       ├── button.test.ts
    │       └── examples
    │           └── button-1.vue
    └── composables
        └── use-form
            ├── README.md
            ├── use-form.ts
            ├── use-form.test.ts
            └── examples
                └── use-form-1.vue
```

## Website 职责

`packages/website` 是展示层和路由层，不拥有组件内容本身。

它负责：

1. Astro 路由与静态构建。
2. 三栏 docs 布局：左侧导航、中间正文、右侧锚点目录。
3. 从 registry 读取 docs、组件 README、示例和 registry metadata。
4. 渲染 registry 中的 Vue 示例组件。
5. 使用 UnoCSS 生成 website 与 registry 示例组件共同需要的 CSS。

它不负责：

1. 维护组件实现。
2. 复制组件文档。
3. 把 registry 组件库当作 npm dependency 安装。
4. 在 website 中硬编码某个组件库的介绍信息。

## 左侧栏数据来源

设计稿中的左侧栏分成两块。

### 顶部文档导航

顶部导航来自每个组件库自己的 `docs` 目录：

```text
registry/<library>/docs/**/*.{md,mdx}
```

例如：

```text
registry/slim/docs/index.md
registry/slim/docs/guide.md
registry/slim/docs/theme.md
```

这样 `slim`、`std` 等 registry 可以拥有完全不同的介绍路径和信息架构。

`registry/docs` 第一版不要求 `order`、`title` 等 frontmatter：

1. 导航标题优先读取 Markdown 第一个 `h1`。
2. 没有 `h1` 时从文件名推导标题。
3. 导航顺序按文件路径稳定排序。
4. `index.md` 作为当前目录默认页。

对应路由：

```text
/<library>/docs/[...slug]
```

### 底部组件树

底部组件树来自：

```text
registry/<library>/registry.json
```

组件树读取 `items`，并使用 item-level `meta` 中的 docs 命名空间字段做展示分组。

分类结构来自设计稿中的左侧组件树：

1. 第一层：`section`，由 `item.type` 映射，例如 `component` -> Components，`composable` -> Composables。
2. 第二层：`category`，由 `item.meta["docs.category"]` 提供稳定 id，例如 `actions`、`form`、`overlay`。
3. 第三层：`item`，来自 `registry.json.items[]`。

第一版内置组件分类：

- `actions`
- `data-display`
- `feedback`
- `form`
- `layout`
- `navigation`
- `overlay`
- `typography`
- `utilities`

缺少 `docs.category` 时，按 `item.type` 放入默认分组。

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

`type` 继续表示安装语义，例如 `component`、`composable`、`util`。`kind` 表示文件角色，例如 `file`、`doc`、`example`、`test`。`meta["docs.category"]` 只用于文档站展示分组，不改变安装行为。

## Schema 调整

当前 `meta` 存在于 registry 顶层；为了支持组件树分组，需要在 `RegistryItemSchema` 上增加 item-level metadata：

```ts
meta: z.record(NonEmptyTrimmedString, NonEmptyTrimmedString).optional()
```

第一版约定 docs 相关字段使用 `docs.*` 命名空间，避免和安装语义混用：

```text
meta["docs.category"]       # 稳定分类 id，例如 actions
meta["docs.categoryLabel"]  # 展示名称，例如 Actions
```

未来若需要 badge、deprecated 等展示字段，也继续放在 `docs.*` 命名空间中。第一版不引入 `docs.order`；组件树顺序以 `registry.json.items` 中的出现顺序为准。

## Registry 读取层

`packages/website/src/lib/registry.ts` 负责把 registry 文件系统结构转换为文档站模型。

读取来源：

```text
@registry/*/registry.json
@registry/*/README.md
@registry/*/docs/**/*.{md,mdx}
@registry/*/src/**/README.md
@registry/*/src/**/examples/*.vue
```

输出模型至少包含：

```text
library      # slim
section      # components | composables
category     # actions | form | overlay
categoryLabel
name         # button | use-form
title
description
files
examples
docs
dependencies
registryDependencies
cssVars
```

`registry.json` 是组件树和组件详情页的权威 catalog；目录扫描只用于连接 README、examples、docs 等实际展示文件。

## Alias 与源码解析

website 通过 alias 直接读取 registry：

```text
@registry -> ../../registry
```

registry 源码允许使用 source-root alias，例如旧版 button 中的：

```ts
import { cn } from '~/utils/styles'
```

为支持多个组件库共存，website 不应把 `~` 固定到某一个库。应提供 registry-aware resolver：

1. 当 importer 位于 `registry/<library>/src/**` 内部；
2. 且 import id 形如 `~/*`；
3. 则解析到同一个组件库的 `registry/<library>/src/*`。

这样 `slim`、`std` 等 registry 都可以维护自己的源码根别名。

## UnoCSS

website 必须使用 UnoCSS，因为 registry 组件库是 UnoCSS-based。

约定：

1. `packages/website` 接入 UnoCSS Astro 集成。
2. `packages/website/uno.config.ts` 使用 `presetWemeUI` from `@weme-ui/unocss-preset`。
3. UnoCSS 扫描范围覆盖 `packages/website/src` 与 `registry/**/src`。
4. 组件 token、CSS variables 和规则优先复用 preset 或 registry metadata，不在 website 中复制独立样式体系。

## 包依赖归属

website 专用依赖放在 `packages/website/package.json`，例如：

```text
astro
@astrojs/vue
Markdown/MDX 渲染相关依赖
```

与 dev/build 共用的依赖继续复用根 `catalogs`，例如：

```text
unocss
vite
vue
typescript
```

根 `package.json` 不直接增加 website 专用依赖，除非该依赖确实需要成为全仓共享工具。

`@weme-ui/unocss-preset` 作为 workspace dependency 被 website 引用，用于保持文档站与组件库样式一致。

## 路由

第一版路由：

```text
/                                   # registry 总览
/<library>/                         # 单个 registry 首页
/<library>/docs/[...slug]           # 当前 registry 自己的 docs
/<library>/<section>/<name>         # 组件或 composable 详情页
```

示例：

```text
/slim/
/slim/docs/theme/
/slim/components/button/
/slim/composables/use-form/
```

组件详情页区块：

1. Overview
2. Preview
3. Installation
4. Usage
5. Examples
6. Props
7. Events
8. Slots
9. Source

缺少结构化数据时显示空态，不阻塞文档页生成。

## API 文档编写流

Props、Events、Slots 第一版不做自动 TypeScript AST 解析，也不要求在 frontmatter 中手写结构化数据。它们由 AI 基于组件源码辅助编写到就近 README 中。

建议创建项目级 skill：

```text
.cursor/skills/registry-docs-author/SKILL.md
```

触发场景：

1. 新增或修改 registry 组件。
2. 需要生成组件 README。
3. 需要补齐 Props、Events、Slots、Examples。
4. 需要让 `registry.json.items[].files` 和实际文件保持一致。

Skill 应要求 AI 读取并核对：

```text
registry/<library>/src/<section>/<name>/<name>.vue
registry/<library>/src/<section>/<name>/<name>.props.ts
registry/<library>/src/<section>/<name>/<name>.style.ts
registry/<library>/src/<section>/<name>/examples/*.vue
registry/<library>/registry.json
```

README 建议模板：

```text
# <Title>

<Description>

## Preview

## Installation

## Usage

## Examples

## Props

## Events

## Slots

## Source
```

约束：

1. 不凭空编写 props、events、slots；必须从源码、类型或示例中确认。
2. 缺少信息时写空态或待补充说明，不伪造 API。
3. 示例优先落到 `examples/*.vue`，README 只引用或说明示例。
4. 同步检查 `registry.json.items[].files`，确保 doc、example、test 使用 `kind` 字段。
5. 生成内容保持中文说明，Vue、TypeScript、UnoCSS 等技术名词保持英文。

这类 skill 应放在项目级 `.cursor/skills` 中，随仓库共享；不放入 Cursor 内置 skills 目录。

## 首期纵切：Button

首期可以参考旧版 button 的组件实现思路，但不迁移旧版 registry metadata 格式：

```text
/Users/xinxuan/workspace/private/@weme-ui/weme-ui/registry/slim/components/button
```

目标落点是当前仓库：

```text
registry/slim/src/components/button
```

需要跑通：

1. `button.vue`：组件实现。
2. `button.props.ts`：props 类型和 API 表格来源。
3. `button.style.ts`：UnoCSS variants 和 slots。
4. `README.md`：组件正文文档。
5. `examples/button-1.vue`：文档站预览示例。
6. `button.test.ts`：组件基础测试。
7. `registry.json`：登记 files、registryDependencies、cssVars、docs category metadata。

旧版 button 依赖 `~/utils/props`、`~/utils/styles` 和 `icon`。首期需要同步补齐最小 shared files 或通过 `registryDependencies` 表达依赖，不能只迁移单个 `.vue` 文件。

所有 registry metadata 必须对齐当前 `@weme-ui/schema`：

1. `files[].type` 只使用 `component`、`composable`、`ui`、`block`、`layout`、`page`、`util`。
2. `files[].kind` 用于区分 `file`、`doc`、`example`、`test`。
3. 不保留旧版 registry item 中的 `hash` 字段。
4. 不为了兼容旧版 registry.json 增加转换层。

首期成功标准：

1. 只维护 `registry/slim/src/components/button/**` 与 `registry/slim/registry.json`。
2. 文档站自动生成左侧组件树和 `/slim/components/button/`。
3. button 示例能在 Astro 页面中渲染。
4. UnoCSS 能正确生成 website 与 button 示例所需样式。
5. `bun lint`、`bun lint:fix`、`bun typecheck` 通过。

## 构建输出

`packages/website/astro.config.mjs` 设置：

```ts
outDir: '../../docs'
```

根目录 `docs` 是静态部署目标。当前 `.gitignore` 忽略 `dist`，不忽略 `docs`，适合 GitHub Pages 使用。

`packages/website` 提供：

```text
dev
build:docs
preview
typecheck
```

根 `turbo.json` 已有 `build:docs` 任务，可接入 website 的 `build:docs` script。

## 非目标

1. 不在本 RFC 中设计完整视觉系统，只要求第一版贴近当前设计稿。
2. 不要求一次性迁移所有旧版 slim 组件。
3. 不要求第一版完成 CLI 自动生成 registry catalog。
4. 不要求 website 支持远程 registry，只读取当前仓库内的本地 registry。

## 已决议

1. 组件源码、文档、示例共存于 `registry`。
2. website 直接通过 alias 读取 registry 源码，不安装 registry 包。
3. 左侧顶部导航来自 `registry/<library>/docs`。
4. 左侧底部组件树来自 `registry.json.items`。
5. 组件树分组使用 `item.meta["docs.category"]` 和 `item.meta["docs.categoryLabel"]`。
6. website 使用 UnoCSS，并复用 `@weme-ui/unocss-preset`。
7. website 专用依赖放在 `packages/website/package.json`。
8. Astro 构建产物输出到根目录 `docs`。
9. Props、Events、Slots 第一版由 AI 基于源码辅助编写到就近 README，不做自动 AST 解析。
10. 建议创建项目级 `registry-docs-author` skill 固化 AI 文档编写流程。
11. `registry/docs` 第一版不要求 `order`、`title` 等 frontmatter。
12. registry metadata 完全对齐当前 `@weme-ui/schema`，不兼容旧版 `hash` 字段。

## 开放问题（待定）

暂无。

## 参考

- RFC：`rfcs/0001-cli-and-registry-discovery.md`
- Schema 源码：`packages/schema/src/registry/item.ts`
- Schema 源码：`packages/schema/src/registry/schema.ts`
- Website 目标目录：`packages/website`
- Registry 目标目录：`registry/slim`
- Astro 输出目录：`docs`
