---
name: registry-docs-author
description: >-
  Authors and updates Weme UI registry component docs, README sections, examples,
  and registry.json file entries. Use when adding or changing a registry component,
  writing Props/Events/Slots docs, creating examples, or aligning item files metadata.
---

# Registry Docs Author

目录、路由与侧栏约定见 `packages/website/README.md`。本 skill 说明编写或更新 item 文档时的操作步骤。

## 适用场景

- 新增或修改 `registry/<library>/src/**` 中的组件、composable 或 util
- 编写或更新 item 的 `README.md`
- 补充 Props、Events、Slots、Examples
- 同步 `registry.json` 中的 `items[].files` 与 `meta["docs.*"]`

## 编写前阅读

先阅读并核对以下内容，再编写文档。不要依据猜测填写 API：

```text
packages/website/README.md
rfcs/0002-registry-driven-website-docs.md
registry/<library>/registry.json
registry/<library>/src/<section>/<name>/   # vue、props、style、examples、现有 README
```

文件不存在时跳过，不要虚构对应 API。

## 输出位置

- 文档：同目录 `README.md`（`files[].kind: "doc"`）
- 示例：`examples/*.vue`（`files[].kind: "example"`）
- Catalog：`registry/<library>/registry.json`

## 步骤

1. 根据源码与类型确认 Props、Events、Slots
2. 按下方模板更新同目录 `README.md`
3. 将可运行示例放在 `examples/`；README 中说明或引用即可
4. 同步 `registry.json` 的 `type`、`title`、`description`、`meta["docs.category"]`、`meta["docs.categoryLabel"]`、`files`（含 `kind`）
5. 本地验证：

```bash
bun --filter @weme-ui/website dev
```

## README 模板

```markdown
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

## 规则

- Props、Events、Slots 须能在源码或类型中核对；无法确认时写「待补充」
- 可运行示例放在 `examples/`，不要仅以 Markdown 中的代码片段作为唯一来源
- `files[].type`：`component | composable | ui | block | layout | page | util`
- `files[].kind`：文档、示例、测试使用 `doc | example | test`；主源码可省略
- 分组使用 `meta["docs.category"]` 与 `meta["docs.categoryLabel"]`
- 说明使用中文；Vue、TypeScript、UnoCSS 等专有名词保持英文
