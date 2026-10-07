---
name: weme-ui-docs
description: >-
  Generates or syncs Weme UI registry item docs from a given component path:
  README.md, feature-based examples/*.vue, and registry.json doc/example file
  entries; or syncs Props/Events/Slots/Accessibility after API changes. Use when
  the user names weme-ui-docs, points at registry/<library>/src/<section>/<name>/,
  prepares website preview, or asks to sync props/slots/events/accessibility
  documentation.
---

# Weme UI Docs

目录、路由与侧栏约定见 `packages/website/README.md`。详情页展示风格对齐 [HeroUI Button docs](https://heroui.com/en/docs/react/components/button)：标题 + 简介 + UI 依赖 badge，Examples 按属性/场景分块 Live Preview。Accessibility / Keyboard Interactions 格式对齐 [Reka UI Checkbox](https://reka-ui.com/docs/components/checkbox)。

用户通常已手写空文件与 `registry.json` 基础条目，并完成约 80% 组件实现。本 skill 不 scaffold、不写组件实现、**不生成测试**、不安装包。测试请用 `weme-ui-tests`。

## 输入

```text
registry/slim/src/components/icon/
```

## 编写前必读

```text
packages/website/README.md
rfcs/0002-registry-driven-website-docs.md
registry/<library>/registry.json
registry/<library>/src/<section>/<name>/
```

文件不存在则跳过，标「待补充」。

## 模式判定

| 条件 | 模式 |
| --- | --- |
| 无 README，或用户明确要求「生成 / 重新生成」 | **A：首次生成** |
| 已有 README，或用户要求「同步属性 / Props / Slots / Events / Accessibility」 | **B：API 同步** |

有 README 且未说「重新生成」→ 默认 **B**。用户话术优先。

## 模式 A：首次生成

1. 根据源码确认 Props、Events、Slots、Accessibility / Keyboard Interactions，以及值得单独演示的属性/状态
2. 写入同目录 `README.md`（模板见下；**不要**写 Preview / Examples / Source）
3. 按属性/场景创建多个 `examples/<feature>.vue`（见下方 Examples 规则）
4. 在 `registry.json` 对应 item 的 `files` 中追加（已存在则跳过）：
   - `kind: "doc"` → `.../README.md`
   - 每个示例一条 `kind: "example"`（顺序 = 详情页展示顺序）
5. **不改**已有 `name` / `title` / `description` / `meta` / `dependencies` / `registryDependencies` / `when` / 主源码 paths（除非文件已存在而 path 缺失）。依赖规则见下方「依赖判断」

## 模式 B：API 同步

以源码为准更新 README 中的 API 章节：

- 始终同步 `## Props`
- 有可核对的 Events → 写入/更新 `## Events`；没有则**删除**该章节
- 有可核对的 Slots → 写入/更新 `## Slots`；没有则**删除**该章节
- 有可核对的 Accessibility → 写入/更新 `## Accessibility`；没有则**删除**该章节（含其下 `### Keyboard Interactions`）
- 有可核对的键盘交互 → 在 Accessibility 下写入/更新 `### Keyboard Interactions`；没有则**删除**该小节
- **不要**写入 Preview / Examples / Source

**默认保留**：简介、`## Installation`、`## Usage`，以及已有 `examples/*.vue`。

仅当用户明确要求时，才改 Usage 或增删/重写 example 文件。API 变更导致示例明显失效时，可简短提示用户。

## README 模板

```markdown
# <Title>

<Description>

## Installation

## Usage

## Props

## Events

## Slots

## Accessibility

### Keyboard Interactions
```

- `## Events` / `## Slots` / `## Accessibility` 仅在有内容时输出
- `### Keyboard Interactions` 仅在有可核对的键盘交互时输出，且必须挂在 `## Accessibility` 下
- **不要**写 `## Preview`、`## Examples`、`## Source`（Examples 由 website 根据 `kind: "example"` 文件自动渲染）

## Accessibility 规则（对齐 [Reka UI Checkbox](https://reka-ui.com/docs/components/checkbox)）

与 Events / Slots 相同：**存在则可写，无可核对内容则省略整章**，不要编造。

### 何时写入

从源码、类型或所依赖的无障碍原语中能核对到至少一项时，才写 `## Accessibility`：

- `role` / `aria-*` / `data-state` 等无障碍相关属性
- 明确遵循的 WAI-ARIA design pattern（含基于 Reka UI 等原语间接获得的行为）
- 可文档化的键盘交互（见下）

仅有猜测或「理论上应支持」时写「待补充」，或直接省略。

### 章节结构

```markdown
## Accessibility

遵循 WAI-ARIA <Pattern> 设计模式。基于 Reka UI `<Primitive>`。

### Keyboard Interactions

| Key | Description |
| --- | --- |
| `Space` | 切换选中 / 未选中 |
```

约定：

1. `## Accessibility`：一两句说明所遵循的 pattern、关键 `aria-*` / `role`，或所依赖的无障碍原语（如 Reka UI `RovingFocusGroup`）。说明用中文；WAI-ARIA、Reka UI、role 名等专有名词保持英文。
2. `### Keyboard Interactions`：**仅**在有可核对的键盘行为时出现，作为 Accessibility 的子节（不要提升为 `##`）。
3. 键盘表列名固定为 `Key` / `Description`（对齐 Reka UI）。`Key` 用代码格式（`` `Space` ``、`` `Enter` ``、`` `ArrowLeft` `` / `` `ArrowRight` ``）；`Description` 用中文简述该键的作用。
4. 多键同一行为可写成 `` `ArrowUp` / `ArrowDown` ``，或分行各写一条。
5. 只有键盘表、没有总述时：仍保留 `## Accessibility`，可把总述缩成一句再接 `### Keyboard Interactions`；不要只写孤立的 `### Keyboard Interactions`。
6. 无 Accessibility 总述且无键盘交互 → **整章删除**（含 Mode B 同步时）。

## Examples 规则（对齐 HeroUI）

- `examples/usage.vue`：**挂在文档 `## Usage` 标题下**（preview 在上、可折叠高亮源码在下，默认折叠），不进入 Examples 列表；README 的 `## Usage` 正文可留空（避免与面板重复）
- 其余 `examples/<feature>.vue`：详情页在 Usage 与 Props 之间插入 `## Examples`，每个文件一个 `###` 小节 + preview/code 面板（代码默认折叠）

### 文件命名

使用 **feature slug**（kebab-case），不要用 `<name>-1.vue`：

```text
examples/
  usage.vue      # 跟随 ## Usage
  sizes.vue      # 进入 ## Examples
  with-icon.vue
  loading.vue
  disabled.vue
```

Examples 小节标题由文件名生成：`with-icon` → `With Icon`（`usage` 不再作为 Examples 子标题）。

### 拆分原则

根据组件 **可演示的 props / 状态** 拆文件，参考 HeroUI Button（Usage / Variants / Sizes / With Icons / Loading / Disabled…）：

| 典型 prop / 状态 | 建议文件 |
| --- | --- |
| 默认用法 | `usage.vue`（必有，跟随 Usage） |
| `size` | `sizes.vue` |
| `radius` / `variant` 等外观枚举 | `radius.vue` / `variants.vue` |
| `icon` / 图标相关 | `with-icon.vue` |
| `loading` / pending | `loading.vue` |
| `disabled` | `disabled.vue` |
| `color` / 色彩 | `color.vue` |

- 一个文件聚焦一个属性或紧密相关的一组状态
- 相对导入 sibling 组件：`import Button from '../button.vue'`
- 在 `registry.json` 按展示顺序登记每条 `kind: "example"`（建议 `usage.vue` 排第一）

### 依赖判断（`registry.json`）

写文档或登记依赖前，先读该 library 的 `registry.json` 顶层与目标 item。

| 位置 | 含义 | 安装时机 |
| --- | --- | --- |
| 顶层 `dependencies` / `devDependencies` | **全局依赖**，所有组件共用 | 项目 **初始化** 时首先安装 |
| `items[].when: "on-init"` | 初始化必装的 registry item（如 `utils`） | 与全局依赖同阶段，随 init 安装 |
| `items[].dependencies` / `devDependencies` | **仅该组件**额外需要的包 | 用户 `add` 该组件时安装 |
| `items[].registryDependencies` | 依赖的其他 registry item | 随该组件一并拉取 |

规则：

1. **先查顶层**：源码用到的包若已在顶层 `dependencies` / `devDependencies` 中，**不要**再写入 item 的 `dependencies`。
2. **`when: "on-init"` 不要随意增加**：只有真正「每个项目初始化都必须装」的共享项才用；误加会让无关文件在 init 时被安装。
3. **item 级依赖**：仅登记顶层没有、且该组件独有的包（例如 Icon 的 `@iconify/vue`）。
4. Mode A / B **默认不改**已有 `dependencies` / `registryDependencies` / `when`；确需增删时先对照顶层列表，避免重复或扩大 init 面。

### UI 依赖 badge

website 从 **item** 的 `dependencies` 识别 UI 类依赖并显示 badge（如 `@iconify/vue` → Iconify，`reka-ui` → Reka UI）。工具库（`clsx`、`defu`、`vue` 等）不会显示。

- 生成文档时**不要**为 badge 改 README。
- 仅当包**不在**顶层全局依赖、且应出现在该组件 badge 上时，才写入 item `dependencies`。
- 新增 UI 库白名单时同步 `packages/website/src/lib/ui-dependencies.ts`。

## 规则

- Props、Events、Slots、Accessibility / Keyboard Interactions 须能在源码或类型中核对；无法确认时写「待补充」
- 无自定义事件 / 插槽 / 无障碍可述内容时省略对应章节
- Installation：`pnpm dlx @weme-ui/weme-ui add weme-ui/<library>/<name>`
- Usage 中 `~/...` 指向同一 library 的 `src` 根
- `files[].type`：`component | composable | ui | block | layout | page | util`
- `files[].kind`：`doc | example`（本 skill 不写 `test`）
- 依赖登记遵循上文「依赖判断」；**禁止**把已是全局的包装进 item，**禁止**随意加 `when: "on-init"`
- 说明用中文；Vue、TypeScript、UnoCSS、WAI-ARIA、Reka UI 等专有名词保持英文

## 本地验证（用户侧）

```bash
bun --filter @weme-ui/website dev
```
