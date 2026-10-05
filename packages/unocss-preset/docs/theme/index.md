# Theme overview

用 Theme 改变 UI 的整体观感：设计令牌表供 Rules / Variants 解析命名值，并在 `preflights.theme` 开启时输出为 CSS 变量。

入口：`theme(options)`，颜色部分会合并 `options.colors` 生成的额外色板。

## Anatomy

Theme 定义应用的整体视觉基线。可通过少量配置定制外观；未传 `themes` 时会注入默认 `default` 主题。

常用挂载属性：

```html
<html class="light" data-theme="default" data-scaling="100%" data-radius="md">
  …
</html>
```

- `data-theme`：切换颜色别名 / 语义 Tokens / 主题内 CssVars
- `data-scaling`：统一缩放间距与圆角（见 [Spacing](./spacing.md)、[Radius](./radius.md)）
- `data-radius`：圆角因子（见 [Radius](./radius.md)）
- `.light` / `.dark`：亮暗外观（见 [Dark mode](./dark-mode.md)）

## Preflight 行为

`preflights.theme`：

| 模式                  | 行为                            |
| --------------------- | ------------------------------- |
| `'on-demand'`（默认） | 仅输出本次构建跟踪到的 theme 键 |
| `true`                | 全量输出（排除大对象键，见下）  |
| `false`               | 不生成 theme 变量（不推荐）     |

**不会直接整表展平的键：** `colors`、`spacing`、`breakpoint`、`verticalBreakpoint`、`shadow`、`insetShadow`、`dropShadow`、`textShadow`、`animation`、`property`、`aria`、`media`、`supports`、`containers`

颜色走独立亮/暗/P3 块；spacing 始终至少输出 `--spacing` 基线。

```css
:root,
:host {
  --spacing: calc(0.25rem * var(--scaling));
  /* 其他 on-demand deps */
}
```

可用 `process` 钩子改写每条 CSS Entry。

## Breakpoint / Container

**breakpoint / verticalBreakpoint：**

| 键        | 值       |
| --------- | -------- |
| `mobile`  | `520px`  |
| `tablet`  | `768px`  |
| `laptop`  | `1024px` |
| `desktop` | `1280px` |
| `wide`    | `1640px` |

**container：**

| 键            | 值                |
| ------------- | ----------------- |
| `3xs` … `7xl` | `16rem` … `80rem` |
| `prose`       | `65ch`            |

中间档：`2xs` 18rem、`xs` 20rem、`sm` 24rem、`md` 28rem、`lg` 32rem、`xl` 36rem、`2xl` 42rem、`3xl` 48rem、`4xl` 56rem、`5xl` 64rem、`6xl` 72rem。

## Transition

**ease：**

| 键                   | 值                             |
| -------------------- | ------------------------------ |
| `linear`             | `linear`                       |
| `in`                 | `cubic-bezier(0.4, 0, 1, 1)`   |
| `out`                | `cubic-bezier(0, 0, 0.2, 1)`   |
| `in-out` / `DEFAULT` | `cubic-bezier(0.4, 0, 0.2, 1)` |

**property：** `none`、`all`、`colors`、`opacity`、`shadow`、`transform`、`DEFAULT`（colors + opacity + shadow + transform + filter/backdrop）

**default.transition：** duration `150ms`，timingFunction 同 ease DEFAULT。

## Animation

Theme 存完整 `@keyframes` 字符串与 Enter / Exit 用的 `un-enter` / `un-exit`。两套模型边界、工具类 API 与内置名称见 [Animation](../utilities/animate.md)。

## Aria / Media / Supports（供 Variants）

**aria：** `busy`、`checked`、`disabled`、`expanded`、`hidden`、`pressed`、`readonly`、`required`、`selected` → `attr="true"`

**media：** `portrait`、`landscape`、`os_dark`、`os_light`、`motion_ok`、`motion_not_ok`、`high_contrast`、`low_contrast`、`opacity_ok`、`opacity_not_ok`、`use_data_ok`、`use_data_not_ok`、`touch`、`stylus`、`pointer`、`mouse`、`hd_color`

**supports：** `grid` → `(display: grid)`

## Theme 函数（Variants）

任意值中可用 `theme(...)` 引用主题：

```html
<div class="m-[theme(spacing.md)]">...</div>
```

```text
margin: calc(0.75rem * var(--scaling))
```

## Tokens

Tokens 提供对主题值的直接访问，便于自建组件并与主题保持一致。

- [Color](./color.md) — 色板、刻度与工具类颜色解析
- [Dark mode](./dark-mode.md) — 亮暗切换与推荐实践
- [Tokens](./tokens.md) — 颜色别名、语义 Tokens、CssVars
- [Typography](./typography.md) — 字族、字重、字号与字距
- [Spacing](./spacing.md) — 间距刻度与 `data-scaling`
- [Radius](./radius.md) — 圆角刻度与 `data-radius`
- [Shadows](./shadows.md) — Shadow、Blur、Perspective
- [Animation](../utilities/animate.md) — 完整 keyframe 与组合 Enter / Exit
