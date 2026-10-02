---
name: registry-docs-author
description: >-
  Authors and updates Weme UI registry component docs, README sections, examples,
  and registry.json file entries. Use when adding or changing a registry component,
  writing Props/Events/Slots docs, creating examples, or aligning item files metadata.
---

# Registry Docs Author

## When to use

- 新增或修改 `registry/<library>/src/**` 中的组件 / composable
- 编写或更新组件 `README.md`
- 补齐 Props、Events、Slots、Examples
- 同步 `registry.json` 的 `items[].files`

## Required reading first

在写任何文档前，必须先读并核对：

```text
registry/<library>/src/<section>/<name>/<name>.vue
registry/<library>/src/<section>/<name>/<name>.props.ts
registry/<library>/src/<section>/<name>/<name>.style.ts
registry/<library>/src/<section>/<name>/examples/*.vue
registry/<library>/registry.json
rfcs/0002-registry-driven-website-docs.md
```

## Output locations

- 文档：`README.md`（与源码同目录）
- 示例：`examples/*.vue`
- Catalog：`registry/<library>/registry.json`

## README template

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

## Rules

1. 不凭空编写 props、events、slots；必须从源码、类型或示例中确认。
2. 缺少信息时写空态或「待补充」，不伪造 API。
3. 示例优先落到 `examples/*.vue`，README 只引用或说明示例。
4. `registry.json.items[].files` 中：
   - `type` 只用 `component | composable | ui | block | layout | page | util`
   - `kind` 用于 `doc | example | test`（主源码可省略或为 `file`）
5. docs 分组使用：
   - `meta["docs.category"]`
   - `meta["docs.categoryLabel"]`
6. 中文说明；Vue、TypeScript、UnoCSS 等技术名词保持英文。
7. 不兼容旧版 `hash` 字段。
