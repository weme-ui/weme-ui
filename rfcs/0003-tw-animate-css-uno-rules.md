# RFC 0003：将 tw-animate-css 整理为 UnoCSS rules

- **状态**：草案
- **相关目录**：`packages/unocss-preset`
- **参考实现**：[`tw-animate-css`](https://github.com/Wombosvideo/tw-animate-css)、[`unocss-preset-animations`](https://github.com/unpreset/unocss-preset-animations)

## 摘要

把 [`tw-animate-css`](https://github.com/Wombosvideo/tw-animate-css) 的 enter / exit 组合动画模型，落到 `@weme-ui/unocss-preset` 的 **shortcuts（base）+ rules（modifiers）+ theme keyframes + `@property`**，而不是整文件 CSS preflight 引入。

核心用法保持与 Tailwind 生态一致：

```html
<div class="animate-in fade-in zoom-in slide-in-from-top-8 duration-500">
  <div class="animate-out fade-out slide-out-to-top-8"></div>
</div>
```

现有 Animate.css 风格的 `animate-fade-in`、`animate-spin` 等 **完整 keyframe 动画继续保留**，与本 RFC 的组合模型并存。

## 动机

1. Registry / 组件层需要 shadcn 风格的 **可组合 enter / exit**（`animate-in` + `fade-in` + `slide-in-from-*`），而不是只能用固定 keyframe 名。
2. 现有 `theme/animation.ts` 已覆盖大量 Animate.css 预设，但缺少「一个 base animation + 多个 CSS 变量修饰符」的组合面。
3. `tw-animate-css` 是纯 CSS（Tailwind v4 `@utility`），可按需 tree-shake；迁移到 Uno 后应继续按需生成，而不是全量灌入。
4. preset 已有 `defineProperty`、`theme.animation`、`rules/animation.ts` 参数类，具备落地该模型的基础设施；空文件 `rules/animate.ts` 适合作为落点。

## 背景：两套动画范式

| 范式              | 代表                                     | 用法                                   | 现状       |
| ----------------- | ---------------------------------------- | -------------------------------------- | ---------- |
| 完整 keyframe     | Animate.css / 现有 `theme/animation.ts`  | `animate-fade-in`、`animate-spin`      | 已实现     |
| 组合 enter / exit | `tw-animate-css` / `tailwindcss-animate` | `animate-in fade-in slide-in-from-top` | **本 RFC** |

两套类名空间基本不撞：

- 完整动画：`animate-{name}`（name 来自 theme keyframes）
- 组合修饰符：`fade-in`、`zoom-in-50`、`slide-in-from-top-8`（**无** `animate-` 前缀）
- 组合 base：`animate-in` / `animate-out`（特殊的 base class）

文档与 playground 需明确区分，避免把 `fade-in`（设变量）和 `animate-fade-in`（完整动画）混为一谈。

## 设计

### 总体映射

| tw-animate-css                                            | Uno 落点                                              | 形态                                        |
| --------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------- |
| `@property --tw-enter-*` 等                               | `defineProperty('--un-enter-*')` 等                   | Rule / Shortcut 附带输出                    |
| `@keyframes enter` / `exit`                               | `theme.animation.keyframes`（`un-enter` / `un-exit`） | Theme                                       |
| `animate-in` / `animate-out`                              | `rules/animate.ts`（经 shortcuts 注册）               | **Shortcut**（规避 catch-all）              |
| `fade-*` / `zoom-*` / `spin-*` / `blur-*` / `slide-*`     | `rules/animate.ts`                                    | **Rule**（只写 CSS 变量）                   |
| duration / delay / ease / fill / direction / count / play | 现有 `rules/animation.ts` + 必要增强                  | Rule（可双写变量；**不改** catch-all 逻辑） |
| `accordion-*` / `collapsible-*` / `caret-blink`           | `theme.animation` + 现有 `animate-*`                  | Theme                                       |

**分工：**

- **Base（`animate-in` / `animate-out`）用 Shortcut**：Uno 对每个 token **先 `expandShortcut`，再 `parseUtil`（rules）**。Shortcut 命中后根本不会进入 `/^animate-(.+)$/`，从而 **完全规避被吞**，且 **不必改动** `rules/animation.ts`。
- **Modifiers 用 Rule**：只输出 CSS 变量，不是展开成其他 class。
- Phase 3 可选的 DX 组合 shortcut（如 `fade-slide-in` → `animate-in fade-in …`）另议，不纳入第一版必做。

Keyframe 注入复用现有 `keyframes-*` rule（`animation.ts` 已有、只读 theme）：shortcut 展开出 `keyframes-un-enter` / `keyframes-un-exit` 字符串即可按需生成 `@keyframes`，同样无需改 `animation.ts`。

### CSS 变量约定

沿用 preset 的 `--un-` 前缀（经 `variablePrefix` / postprocess 可替换），对应 tw 的 `--tw-`：

**Enter / exit 变换变量：**

| 变量                           | 默认     | 用途             |
| ------------------------------ | -------- | ---------------- |
| `--un-enter-opacity`           | `1`      | enter 起点透明度 |
| `--un-enter-scale`             | `1`      | enter 起点缩放   |
| `--un-enter-rotate`            | `0`      | enter 起点旋转   |
| `--un-enter-translate-x` / `y` | `0`      | enter 起点位移   |
| `--un-enter-blur`              | `0`      | enter 起点模糊   |
| `--un-exit-*`                  | 同上对称 | exit 终点        |

**Animation 参数变量（供 shorthand 读取）：**

| 变量                             | 默认                                            | 用途      |
| -------------------------------- | ----------------------------------------------- | --------- |
| `--un-animation-duration`        | （无 initial，回退到 duration theme / `150ms`） | 时长      |
| `--un-animation-delay`           | `0s`                                            | 延迟      |
| `--un-animation-direction`       | `normal`                                        | 方向      |
| `--un-animation-fill-mode`       | `none`                                          | fill-mode |
| `--un-animation-iteration-count` | `1`                                             | 次数      |

`@property` 一律 `inherits: false`，与 tw-animate-css 一致，避免父级动画变量污染子树。

### Keyframes

```css
@keyframes un-enter {
  from {
    opacity: var(--un-enter-opacity, 1);
    transform: translate3d(var(--un-enter-translate-x, 0), var(--un-enter-translate-y, 0), 0)
      scale3d(var(--un-enter-scale, 1), var(--un-enter-scale, 1), var(--un-enter-scale, 1))
      rotate(var(--un-enter-rotate, 0));
    filter: blur(var(--un-enter-blur, 0));
  }
}

@keyframes un-exit {
  to {
    opacity: var(--un-exit-opacity, 1);
    transform: translate3d(var(--un-exit-translate-x, 0), var(--un-exit-translate-y, 0), 0)
      scale3d(var(--un-exit-scale, 1), var(--un-exit-scale, 1), var(--un-exit-scale, 1))
      rotate(var(--un-exit-rotate, 0));
    filter: blur(var(--un-exit-blur, 0));
  }
}
```

Theme 侧以压缩字符串写入 `theme.animation.keyframes`（与现有 keyframe 存储方式一致）。名称使用带前缀的 **`un-enter` / `un-exit`**，降低与用户自定义 `@keyframes enter` 冲突的风险。工具类仍为 `animate-in` / `animate-out`（对外 API 与 tw 对齐，仅内部 animation-name 带前缀）。

### Base shortcuts：`animate-in` / `animate-out`

用 **Shortcut**（非 Rule），示意：

```ts
[
  /^animate-in$/,
  () => [
    'keyframes-un-enter',
    {
      'animation-name': 'un-enter',
      'animation-duration': 'var(--un-animation-duration, 150ms)',
      'animation-timing-function': 'var(--un-animation-ease, ease)',
      'animation-delay': 'var(--un-animation-delay, 0s)',
      'animation-iteration-count': 'var(--un-animation-iteration-count, 1)',
      'animation-direction': 'var(--un-animation-direction, normal)',
      'animation-fill-mode': 'var(--un-animation-fill-mode, none)',
      // 附带 defineProperty(...)
    },
  ],
]
```

`animate-out` 对称，使用 `keyframes-un-exit` / `un-exit`。

**不回退**到 transition 用的 `--un-duration` / `--un-ease`；动画参数只读 `--un-animation-*`。

**为何能完全规避吞掉、且不改 `animation.ts`：**

1. Generator 路径是 `expandShortcut` → 若命中则 `stringifyShortcuts`；**只有 shortcut 未命中才** `parseUtil`（rules / catch-all）。
2. 因此用户写的 `animate-in` **永远不会**进入 `/^animate-(.+)$/`。
3. `@keyframes` 通过展开 `keyframes-un-enter` 触发现有只读 theme 的 rule，**零改动** catch-all。

对照被否决的方案：数组顺序脆；static rule 的 body 只能是 CSSObject、不便按需注入 keyframes；改 catch-all 会动到现有 `animation.ts`。

### Modifier rules

全部放在 `rules/animate.ts`，只设置 CSS 变量：

| 工具类                                           | Phase | 行为                                                     |
| ------------------------------------------------ | ----- | -------------------------------------------------------- |
| `fade-in` / `fade-in-*`                          | 1     | `--un-enter-opacity`（默认 `0`；`*` 为百分比或 bracket） |
| `fade-out` / `fade-out-*`                        | 1     | `--un-exit-opacity`                                      |
| `zoom-in` / `zoom-in-*`                          | 1     | `--un-enter-scale`（默认 `0`）                           |
| `zoom-out` / `zoom-out-*`                        | 1     | `--un-exit-scale`                                        |
| `spin-in` / `spin-in-*`                          | 1     | `--un-enter-rotate`（默认 `30deg`）                      |
| `spin-out` / `spin-out-*`                        | 1     | `--un-exit-rotate`                                       |
| `slide-in-from-{top\|bottom\|left\|right}`[`-*`] | 1     | `--un-enter-translate-*`                                 |
| `slide-out-to-{top\|bottom\|left\|right}`[`-*`]  | 1     | `--un-exit-translate-*`                                  |
| `blur-in` / `blur-in-*`                          | 2     | `--un-enter-blur`（默认 `20px`）                         |
| `blur-out` / `blur-out-*`                        | 2     | `--un-exit-blur`                                         |
| `slide-*-{start\|end}`[`-*`]                     | 2     | RTL 方向位移                                             |

数值解析复用现有 `h` helpers（`percent`、`degree`、`fraction`、`bracket`、`cssvar`、spacing theme）。

**不支持** `-zoom-in-*`、`-spin-in-*` 等负号工具类；需要负值时用 bracket，例如 `spin-in-[-30deg]`。

### 参数类增强

现有 `rules/animation.ts` 已提供：

- `animate-duration-*`
- `animate-delay-*`
- `animate-ease-*`
- `animate-fill-*` / `animate-direction-*` / `animate-count-*` / `animate-paused` 等

为了与 `animate-in` 的 **变量驱动** 组合正确，参数类应 **双写**：既设置对应 CSS property，也设置专用的 `--un-animation-*`（**不**写入 transition 的 `--un-duration` / `--un-ease`）。

第一版可选策略：

1. **最小改动**：仅让 `animate-duration-*` / `animate-delay-*` / `animate-ease-*` 双写；其余参数类保持现状。
2. **完整对齐**：所有 animation 参数类双写。

推荐第一版走策略 1；完整对齐列入后续。

文档写明：组合动画请用 `animate-duration-*` / `animate-delay-*` / `animate-ease-*`，不要指望普通 `duration-*`（transition）影响 `animate-in`。

### Ready-made 动画

以下作为 theme keyframes 增量，**归入 Phase 2**（不提前到 Phase 1）：

| 名称                                  | 说明                                            |
| ------------------------------------- | ----------------------------------------------- |
| `accordion-down` / `accordion-up`     | height `0` ↔ 多库 content-height CSS 变量回退链 |
| `collapsible-down` / `collapsible-up` | 同上，collapsible 变量                          |
| `caret-blink`                         | 光标闪烁，`1.25s ease-out infinite`             |

Accordion / collapsible 的 height 变量回退链对齐 tw-animate-css（Radix / Bits UI / Reka / Kongponents / Angular primitives 等），便于 Vue / 多 headless 库共用。

使用方式仍是现有：`animate-accordion-down`。

### 文件结构

```text
packages/unocss-preset/src
├── rules
│   ├── animate.ts      # 本 RFC：modifier rules + animate-in/out shortcuts 定义
│   ├── animation.ts    # 现有：参数类 + theme keyframe catch-all（catch-all 不改）
│   └── default.ts      # 注册 modifier rules
├── shortcuts
│   └── default.ts      # 挂上 animate-in / animate-out shortcuts
├── theme
│   └── animation.ts    # 增量：un-enter / un-exit（+ Phase 2 accordion 等）
└── test
    └── rules
        └── animate.test.ts
```

不新增独立 preset 包；能力内置于 `@weme-ui/unocss-preset`。

### 与 `unocss-preset-animations` 的关系

`unocss-preset-animations` 已是同一模型的社区 port（前缀 `--una-`）。本 RFC **不依赖**该包，原因：

1. 需要与本 preset 的 `variablePrefix`、`defineProperty`、theme、双写参数类一体。
2. 社区包缺少 blur、RTL start/end、accordion / collapsible / caret、`@property`。
3. 避免再挂一层外部 preset 选项与 layer 协调成本。

实现时可对照其 rules / shortcuts 结构，但代码落在本仓。

## 分阶段交付

### Phase 1（必做）

1. Theme：`un-enter` / `un-exit` keyframes（含 blur 变量槽位）。
2. Shortcuts：`animate-in` / `animate-out`（展开 `keyframes-un-enter` / `keyframes-un-exit` + 动画属性 + `@property`）。
3. Rules：`fade-*`、`zoom-*`、`spin-*`、`slide-in-from-{t,b,l,r}-*`、`slide-out-to-{t,b,l,r}-*`（不含负号工具类、不含 start/end）。
4. 参数双写：至少 `animate-duration-*`、`animate-delay-*`、`animate-ease-*` → `--un-animation-*`（不共享 transition 变量；**不改** catch-all）。
5. 单元测试：`animate-in` 走 shortcut、不被 catch-all 吞掉；典型组合输出正确。
6. 文档：`docs/utilities/rules.md` 增加 Enter/Exit 一节，并与现有 Animation keyframes 区分说明。

### Phase 2（增强）

1. `blur-in` / `blur-out`。
2. `slide-*-start` / `slide-*-end`（RTL）。
3. Theme：`accordion-*`、`collapsible-*`、`caret-blink`。
4. 其余 animation 参数类完整双写。

### Phase 3（可选）

1. DX shortcuts（高频组合）。
2. Playground / website 示例页。

## 非目标

1. 不整文件 `@import` / preflight 引入 `tw-animate.css`。
2. 不删除或迁移现有 Animate.css 风格 theme keyframes。
3. 不把本能力拆成独立 npm 包。
4. 不追求与 Tailwind `duration-*`（无 `animate-` 前缀）在类名层面 100% 同构。
5. 第一版不要求实现 DX 组合 shortcut 层（`fade-slide-in` 之类）；**base 的 `animate-in` / `animate-out` shortcut 除外**。

## 已决议

1. **落点**：内置进 `@weme-ui/unocss-preset`；modifiers 在 `rules/animate.ts`，base shortcuts 同文件定义并挂到 `shortcuts/default.ts`。
2. **形态**：modifiers 用 Rule；**`animate-in` / `animate-out` 用 Shortcut**；DX 组合 Shortcuts 非必做。
3. **与现有动画并存**：保留 `animate-fade-in` 等完整 keyframe API。
4. **变量前缀**：`--un-*`，走现有 prefix / postprocess。
5. **`@property`**：通过现有 `defineProperty` 输出，不另起全局 preflight 清单。
6. **不依赖** `unocss-preset-animations` 运行时包。
7. **Keyframe 命名**：内部使用 `un-enter` / `un-exit`；对外工具类仍为 `animate-in` / `animate-out`。
8. **不与 transition 共享 duration/ease**：`animate-in` 只读 `--un-animation-*`；组合动画用 `animate-duration-*` 等，不用普通 `duration-*`。
9. **Ready-made 不进 Phase 1**：`accordion-*` / `collapsible-*` / `caret-blink` 归 Phase 2。
10. **不支持负号工具类**：不实现 `-zoom-in-*` / `-spin-in-*`；负值走 bracket。
11. **规避 catch-all**：`animate-in` / `animate-out` 走 Shortcut，利用「先 shortcut 后 rules」**完全避开** `/^animate-(.+)$/`；**不修改** `rules/animation.ts` 的 catch-all。Keyframe 按需注入靠现有 `keyframes-*` rule + theme。

## 开放问题（待定）

暂无。

## 参考

- 社区 Uno port：`unocss-preset-animations`（base 亦用 shortcut + `keyframes-*`）
- 现有规则：`packages/unocss-preset/src/rules/animation.ts`
- 现有主题：`packages/unocss-preset/src/theme/animation.ts`
- `@property` 工具：`packages/unocss-preset/src/utils/utilities.ts`（`defineProperty`）
- 空落点：`packages/unocss-preset/src/rules/animate.ts`
- Uno 匹配顺序：`expandShortcut` →（未命中才）`parseUtil`
