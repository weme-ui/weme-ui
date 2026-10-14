---
name: weme-ui-docs
description: >-
  Generates or syncs Weme UI registry item docs: components use README.md +
  examples/*.vue and Props/Events/Slots/Accessibility/CSS Variables; composables
  use flat use-*.md (Reka utilities style, no examples). Use when the user names
  weme-ui-docs, points at registry/<library>/src/components/<name>/ or
  registry/<library>/src/composables/use-*.ts, prepares website preview, or asks
  to sync API documentation.
---

# Weme UI Docs

目录、路由与侧栏约定见 `packages/website/README.md`。

- **组件**：详情页风格对齐 [HeroUI Button docs](https://heroui.com/en/docs/react/components/button)；Accessibility / Keyboard Interactions 对齐 [Reka UI Checkbox](https://reka-ui.com/docs/components/checkbox)。
- **Composable**：文档风格对齐 [Reka UI useFilter](https://reka-ui.com/docs/utilities/use-filter)（Options / Usage / Types，Markdown 代码块，无 Live Preview）。

用户通常已手写空文件与 `registry.json` 基础条目，并完成约 80% 实现。本 skill 不 scaffold、不写组件实现、**不生成测试**、不安装包。测试请用 `weme-ui-tests`。

## 输入

组件目录：

```text
registry/slim/src/components/icon/
```

Composable 源码（扁平）：

```text
registry/slim/src/composables/use-form-context.ts
```

## 编写前必读

```text
packages/website/README.md
rfcs/0002-registry-driven-website-docs.md
registry/<library>/registry.json
registry/<library>/src/components/<name>/     # 组件
registry/<library>/src/composables/use-*.ts   # composable
```

文件不存在则跳过，标「待补充」。

## 文档类型判定

| 条件 | 文档类型 |
| --- | --- |
| 路径在 `src/composables/`，或指向单个 `use-*.ts` | **Composable**（见下方「Composable 模式」） |
| 路径在 `src/components/`（或 layout / block 等同目录 README 模型） | **组件**（下文 Mode A/B、README 模板、Examples） |

先判定文档类型，再判定 Mode A / B。

## 模式判定（组件）

| 条件 | 模式 |
| --- | --- |
| 无 README，或用户明确要求「生成 / 重新生成」 | **A：首次生成** |
| 已有 README，或用户要求「同步属性 / Props / Slots / Events / Accessibility」 | **B：API 同步** |

有 README 且未说「重新生成」→ 默认 **B**。用户话术优先。

## 模式 A：首次生成（组件）

1. 根据源码确认 Props、Events、Slots、Accessibility / Keyboard Interactions，以及值得单独演示的属性/状态；并读 `registry.json` 对应 item 的 `cssVars`（见「CSS Variables」）
2. 写入同目录 `README.md`（模板见下；**不要**写 Preview / Examples / Source）
3. 按属性/场景创建多个 `examples/<feature>.vue`（见下方 Examples 规则）
4. 在 `registry.json` 对应 item 的 `files` 中追加（已存在则跳过）：
   - `kind: "doc"` → `.../README.md`
   - 每个示例一条 `kind: "example"`（顺序 = 详情页展示顺序）
5. **不改**已有 `name` / `title` / `description` / `meta` / `dependencies` / `registryDependencies` / `when` / `cssVars` / 主源码 paths（除非文件已存在而 path 缺失）。依赖规则见下方「依赖判断」

## 模式 B：API 同步（组件）

以源码与 `registry.json` 为准更新 README 中的 API 章节：

- 始终同步 `## Props`
- 有可核对的 Events → 写入/更新 `## Events`；没有则**删除**该章节
- 有可核对的 Slots → 写入/更新 `## Slots`；没有则**删除**该章节
- 有可核对的 Accessibility → 写入/更新 `## Accessibility`；没有则**删除**该章节（含其下 `### Keyboard Interactions`）
- 有可核对的键盘交互 → 在 Accessibility 下写入/更新 `### Keyboard Interactions`；没有则**删除**该小节
- item 存在非空 `cssVars` → 写入/更新 `## CSS Variables`；没有或为空 → **删除**该章节
- **不要**写入 Preview / Examples / Source

**默认保留**：简介、`## Installation`、`## Usage`，以及已有 `examples/*.vue`。

仅当用户明确要求时，才改 Usage 或增删/重写 example 文件。API 变更导致示例明显失效时，可简短提示用户。

## README 模板（组件）

详情页最终顺序（website 注入 Examples / Files）：

`Installation` → `Usage` → **Examples** → `Props` → `Events` → `Slots` → `CSS Variables` → `Accessibility` → **Files**

```markdown
# <Title>

<Description>

## Installation

## Usage

## Props

## Events

## Slots

## CSS Variables

## Accessibility

### Keyboard Interactions
```

- README 按上表书写 API 章节顺序；**不要**写 `## Examples` / `## Files`（website 分别在 Usage 之后、文末自动插入）
- `## Events` / `## Slots` / `## CSS Variables` / `## Accessibility` 仅在有内容时输出
- `### Keyboard Interactions` 仅在有可核对的键盘交互时输出，且必须挂在 `## Accessibility` 下
- **不要**写 `## Preview`、`## Examples`、`## Source`

## Composable 模式

对齐 [Reka UI utilities（useFilter）](https://reka-ui.com/docs/utilities/use-filter)。`src/composables/` 为**扁平一级**目录，不能共用一个 `README.md`。

### 严格命名

| 文件 | 主导出函数 |
| --- | --- |
| `use-form-context.ts` | `useFormContext()` |
| `use-<kebab>.ts` | `use<Pascal>()`（kebab → PascalCase） |

- 文档 H1、简介、Usage 均以**主导出**为准；同文件其它导出函数优先级低于主导出。
- 文档文件与源码同名：`use-form-context.md`（**不是** `README.md`）。
- `registry.json` 的 `name` 与文件 slug 一致（如 `use-form-context`）；`kind: "doc"` → `src/composables/use-form-context.md`。

### 禁止 examples

- **不**创建 `examples/`
- **不**登记 `kind: "example"`
- 正文用 Markdown 代码块演示调用，不依赖 Live Preview

### Mode A / B（Composable）

| 条件 | 模式 |
| --- | --- |
| 无 `use-*.md`，或用户要求「生成 / 重新生成」 | **A** |
| 已有 `use-*.md`，或要求同步 Options / Returns / Types | **B** |

有文档且未说「重新生成」→ 默认 **B**。

**A**：读源码导出 → 写 `use-<kebab>.md` → 登记 `kind: "doc"`（跳过已存在条目）。不写 examples。

**B**：按源码同步主导出 Options / Usage / Returns，以及其它导出函数与 `## Types`；无对应内容则删除该章。不补 examples、不硬塞 Props。

### 导出覆盖

1. **主导出函数**：`## Options` / `## Usage` / `## Returns`（有则写）
2. **其它导出函数**：另起 `## otherFn` 或挂在 Usage 子节；须能从源码核对
3. **导出类型**（`type` / `interface`）：`## Types`（可再拆 `### FooOptions`）；表格或代码块；**勿编造**未导出符号

### 模板

```markdown
# useFormContext

<一句话简介>

## Installation

## Options

## Usage

## Returns

## Types
```

- `## Options` / `## Returns` / `## Types` 仅在有内容时输出
- **省略** Props / Events / Slots / CSS Variables / Accessibility（组件专用）
- **不要**写 `## Preview`、`## Examples`、`## Source`、`## Files`

## CSS Variables 规则

与 Props 相同：**以 `registry.json` 对应 item 的 `cssVars` 为唯一来源**；有非空对象则必须写 `## CSS Variables`，没有或为空则省略。不要编造。

**写用法，不写原理。** CLI 会把 `cssVars` 写入用户的 `uno.config.ts` / `weme.config.json`；文档只需告诉读者变量名、取值，以及在 `*.style.ts` / `class` 里怎么用。

`cssVars` 结构：`{ "<theme-key>": { "<name>": "<value>" } }` → 运行时 CSS 变量为 `--{theme-key}-{name}`（如 `--password-strength-too-weak-color`）。

### 章节结构

放在 `## Slots`（若有）之后、`## Accessibility`（若有）之前；详情页由 website 固定渲染为 Props… → CSS Variables → Accessibility。

```markdown
## CSS Variables

可在 `*.style.ts` 或 `class` 中使用，例如 `bg-password-strength-too-weak`。

| CSS Variable | Value |
| --- | --- |
| `--password-strength-too-weak-color` | `error.7` |
| `--password-strength-strong-color` | `success.9` |

`error.7` / `success.9` 等为语义色别名（色板阶），详见 [Tokens](/weme-ui/unocss-preset/docs/theme/tokens/)。
```

约定：

1. 标题固定 `## CSS Variables`。
2. 开篇 **1 句**用法示例即可（由 registry 条目推导真实 class，如 `bg-{theme}-{stem}`，stem 为去掉末尾 `-color` / `-bg` / `-background` 等 fuzzy suffix 后的名称）；不要展开 CLI / preflight / flatten 长说明。
3. 表格列名固定为 `CSS Variable` / `Value`：
   - `CSS Variable`：完整 `--{theme-key}-{name}`
   - `Value`：registry 原始字符串（如 `error.7`），不要展开成 `#hex` / `oklch(...)`
4. 按 theme-key、再按 name 稳定排序。
5. 表格**下方**用一两句说明 Value 里的别名含义（如 `error.7` = 语义色 `error` 的第 7 阶），并链接到 UnoCSS Preset Tokens 文档。站点 `base` 为 `/weme-ui`（见 `packages/website/astro.config.mjs`），Markdown 绝对链接须带此前缀：`/weme-ui/unocss-preset/docs/theme/tokens/`（勿写成 `/unocss-preset/...`）。勿在组件 README 复述 preset 全文。
6. Mode A / B：只同步 README；默认不改 `registry.json` 的 `cssVars`。清空或删除 `cssVars` → 删除整章。

## Accessibility 规则（对齐 [Reka UI Checkbox](https://reka-ui.com/docs/components/checkbox)）

与 Events / Slots / CSS Variables 相同：**存在则可写，无可核对内容则省略整章**，不要编造。

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

## Examples 规则（对齐 HeroUI，仅组件）

Composable 模式跳过本节（禁止 examples）。

- `examples/usage.vue`：**挂在文档 `## Usage` 标题下**（preview 在上、可折叠高亮源码在下，默认折叠），不进入 Examples 列表；README 的 `## Usage` 正文可留空（避免与面板重复）
- 其余 `examples/<feature>.vue`：详情页在 Usage 与 Props 之间插入 `## Examples`（整页顺序见「README 模板」），每个文件一个 `###` 小节 + preview/code 面板（代码默认折叠）

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

- 先判定组件 vs Composable；Composable 不走 Props/Examples 管线
- Props、Events、Slots、Accessibility / Keyboard Interactions 须能在源码或类型中核对；无法确认时写「待补充」（仅组件）
- Composable 的 Options / Returns / Types / 其它导出须能在源码中核对；主导出遵循 `use-<kebab>.ts` → `use<Pascal>()`
- `## CSS Variables` 须能在 `registry.json` item.`cssVars` 中核对；有则必写，无则省略（仅组件）
- 无自定义事件 / 插槽 / cssVars / 无障碍可述内容时省略对应章节
- Installation：`pnpm dlx @weme-ui/weme-ui add weme-ui/<library>/<name>`
- Usage 中 `~/...` 指向同一 library 的 `src` 根
- `files[].type`：`component | composable | ui | block | layout | page | util`
- `files[].kind`：`doc | example`（本 skill 不写 `test`；Composable **不**写 `example`）
- 依赖登记遵循上文「依赖判断」；**禁止**把已是全局的包装进 item，**禁止**随意加 `when: "on-init"`
- 说明用中文；Vue、TypeScript、UnoCSS、WAI-ARIA、Reka UI、CSS Variables 等专有名词保持英文

## 本地验证（用户侧）

```bash
bun --filter @weme-ui/website dev
```
