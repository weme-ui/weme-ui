---
name: weme-ui-docs
description: >-
  Generates or syncs Weme UI registry item docs from a given component path:
  README.md, the first examples/*.vue, and registry.json doc/example file entries;
  or syncs Props/Events/Slots after API changes. Use when the user names
  weme-ui-docs, points at registry/<library>/src/<section>/<name>/, prepares
  website preview, or asks to sync props/slots/events documentation.
---

# Weme UI Docs

本 skill **替换**已移除的 `registry-docs-author`。目录、路由与侧栏约定见 `packages/website/README.md`。

用户通常已手写空文件与 `registry.json` 基础条目，并完成约 80% 组件实现。本 skill 不 scaffold、不写组件实现、不生成测试、不安装包。

## 输入

用户指定 item 目录，例如：

```text
registry/slim/src/components/icon/
```

## 编写前必读

先读再写，不要猜测 API：

```text
packages/website/README.md
rfcs/0002-registry-driven-website-docs.md
registry/<library>/registry.json
registry/<library>/src/<section>/<name>/   # *.vue、*.props.ts、*.style.ts（若有）、现有 README、examples
```

文件不存在则跳过，标「待补充」。

## 模式判定

| 条件 | 模式 |
| --- | --- |
| 无 README，或用户明确要求「生成 / 重新生成」 | **A：首次生成** |
| 已有 README，或用户要求「同步属性 / Props / Slots / Events」 | **B：API 同步** |

有 README 且未说「重新生成」→ 默认 **B**。用户话术优先。

## 模式 A：首次生成

1. 根据源码确认 Props、Events、Slots
2. 写入同目录 `README.md`（模板见下；无 Events/Slots 则省略对应章节）
3. 若无 `examples/<name>-1.vue`，创建首个可运行示例（相对导入 sibling 组件；对齐同 library 已有 `examples/*-1.vue`）
4. 在 `registry.json` 对应 item 的 `files` 中追加（已存在则跳过）：
   - `kind: "doc"` → `.../README.md`
   - `kind: "example"` → `.../examples/<name>-1.vue`
5. **不改**已有 `name` / `title` / `description` / `meta` / `dependencies` / `registryDependencies` / 主源码 paths（除非文件已存在而 path 缺失）

## 模式 B：API 同步

以源码为准更新 README 中的 API 章节：

- 始终同步 `## Props`
- 有可核对的 Events → 写入/更新 `## Events`；没有则**删除**该章节（不要写「无」）
- 有可核对的 Slots → 写入/更新 `## Slots`；没有则**删除**该章节（不要写「无」）
- **不要**写入或保留 `## Source`

**默认保留**：简介、`## Preview`、`## Installation`、`## Usage`、`## Examples`，以及已有 `examples/*.vue`。

仅当用户明确要求时，才改 Preview / Usage / Examples 或示例文件。API 变更导致示例明显失效时，可简短提示用户，不擅自大改。

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
```

`## Events` / `## Slots` 仅在有内容时输出。不要写 `## Source`。

## 规则

- Props、Events、Slots 须能在源码或类型中核对；无法确认时写「待补充」
- 无自定义事件 / 插槽时省略对应章节，不要用「无」占位
- Installation：`pnpm dlx @weme-ui/weme-ui add weme-ui/<library>/<name>`
- Usage 中 `~/...` 指向同一 library 的 `src` 根
- 可运行示例放在 `examples/`；README 引用说明即可
- `files[].type`：`component | composable | ui | block | layout | page | util`
- `files[].kind`：文档与示例用 `doc | example`（本 skill 不写 `test`）
- 分组字段由用户维护：`meta["docs.category"]`、`meta["docs.categoryLabel"]`
- 说明用中文；Vue、TypeScript、UnoCSS 等专有名词保持英文

## 本地验证（用户侧）

```bash
bun --filter @weme-ui/website dev
```
