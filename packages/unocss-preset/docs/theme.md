# Theme

Theme 是 UnoCSS 预设的设计令牌表，供 Rules / Variants 解析命名值，并在 `preflights.theme` 开启时输出为 CSS 变量。

入口：`theme(options)`，颜色部分会合并 `options.colors` 生成的额外色板。

## Quick reference

### Spacing

全部带 `var(--scaling)`，数字类间距 `p-4` 使用基线 `--spacing`：

| 键               | 值                               |
| ---------------- | -------------------------------- |
| `DEFAULT` / `xs` | `calc(0.25rem * var(--scaling))` |
| `sm`             | `calc(0.5rem * var(--scaling))`  |
| `md`             | `calc(0.75rem * var(--scaling))` |
| `lg`             | `calc(1rem * var(--scaling))`    |
| `xl`             | `calc(1.5rem * var(--scaling))`  |
| `2xl`            | `calc(2rem * var(--scaling))`    |
| `3xl`            | `calc(2.5rem * var(--scaling))`  |
| `4xl`            | `calc(3rem * var(--scaling))`    |
| `5xl`            | `calc(4rem * var(--scaling))`    |

```html
<div class="p-4 m-md gap-sm">...</div>
```

```text
p-4  -> padding: calc(var(--spacing) * 4)
m-md -> margin: calc(0.75rem * var(--scaling))
```

### Radius

全部带 `var(--scaling) * var(--radius-factor)`（`none` 除外）：

| 键        | 值                                                      |
| --------- | ------------------------------------------------------- |
| `DEFAULT` | `calc(0.25rem * var(--scaling) * var(--radius-factor))` |
| `none`    | `0`                                                     |
| `xs`      | `calc(0.125rem * …)`                                    |
| `sm`      | `calc(0.25rem * …)`                                     |
| `md`      | `calc(0.375rem * …)`                                    |
| `lg`      | `calc(0.5rem * …)`                                      |
| `xl`      | `calc(0.75rem * …)`                                     |
| `2xl`     | `calc(1rem * …)`                                        |

### Breakpoint / Container

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

### Typography

**font：**

- `sans`：系统 UI 无衬线栈
- `serif`：Times 系
- `mono`：Menlo / Consolas 等宽栈

**fontWeight：** `light` 300、`regular` 400、`medium` 500、`semibold` 600、`bold` 700

**text：**

| 键     | fontSize    | lineHeight | letterSpacing |
| ------ | ----------- | ---------- | ------------- |
| `xs`   | `0.75rem`   | `1rem`     | `0.0025em`    |
| `sm`   | `0.875rem`  | `1.25rem`  | —             |
| `base` | `1rem`      | `1.5rem`   | —             |
| `lg`   | `1.125rem`  | `1.625rem` | `-0.0025em`   |
| `xl`   | `1.25rem`   | `1.75rem`  | `-0.005em`    |
| `2xl`  | `1.5rem`    | `1.875rem` | `-0.00625em`  |
| `3xl`  | `1.75rem`   | `2.25rem`  | `-0.0075em`   |
| `4xl`  | `2.1875rem` | `2.5rem`   | `-0.01em`     |
| `5xl`  | `3.75rem`   | `1`        | `-0.025em`    |

**leading：** `none` 1、`tight` 1.25、`snug` 1.375、`normal` 1.5、`relaxed` 1.625、`loose` 2

**tracking：** `tighter` -0.05em … `widest` 0.1em

**textStrokeWidth：** `DEFAULT` 1.5rem、`none` 0、`sm` thin、`md` medium、`lg` thick

### Shadow / Blur / Perspective

- **shadow：** `DEFAULT`、`xs`、`sm`、`md`、`lg`、`xl`、`inner`、`none`（多层 box-shadow）
- **insetShadow：** `2xs`、`xs`、`sm`、`none`
- **dropShadow：** `xs` … `2xl`
- **textShadow：** `none`、`2xs` … `lg`
- **blur：** `DEFAULT`/`sm` 8px、`xs` 4px、`md` 12px、`lg` 16px、`xl` 24px、`2xl` 40px、`3xl` 64px
- **perspective：** `dramatic` 100px、`near` 300px、`normal` 500px、`midrange` 800px、`distant` 1200px

### Transition

**ease：**

| 键                   | 值                             |
| -------------------- | ------------------------------ |
| `linear`             | `linear`                       |
| `in`                 | `cubic-bezier(0.4, 0, 1, 1)`   |
| `out`                | `cubic-bezier(0, 0, 0.2, 1)`   |
| `in-out` / `DEFAULT` | `cubic-bezier(0.4, 0, 0.2, 1)` |

**property：** `none`、`all`、`colors`、`opacity`、`shadow`、`transform`、`DEFAULT`（colors + opacity + shadow + transform + filter/backdrop）

**default.transition：** duration `150ms`，timingFunction 同 ease DEFAULT。

### Animation keyframes

可用 `animate-{name}`，内置名称包括：

`pulse`、`bounce`、`spin`、`ping`、`bounce-alt`、`flash`、`pulse-alt`、`rubber-band`、`shake-x`、`shake-y`、`head-shake`、`swing`、`tada`、`wobble`、`jello`、`heart-beat`、`hinge`、`jack-in-the-box`、

`light-speed-in-left/right`、`light-speed-out-left/right`、

`flip`、`flip-in-x/y`、`flip-out-x/y`、

`rotate-in`、`rotate-in-down-left/right`、`rotate-in-up-left/right`、`rotate-out` 及对应 down/up 方向、

`roll-in/out`、

`zoom-in`、`zoom-in-down/left/right/up`、`zoom-out` 及对应方向、

`bounce-in`、`bounce-in-down/left/right/up`、`bounce-out` 及对应方向、

`slide-in-down/left/right/up`、`slide-out-down/left/right/up`、

`fade-in`、`fade-in-down/up/left/right`（含 `-big` 与对角）、`fade-out` 同系列、

`back-in-down/left/right/up`、`back-out-down/left/right/up`

完整 keyframes 字符串见 `src/theme/animation.ts`。

### Aria / Media / Supports（供 Variants）

**aria：** `busy`、`checked`、`disabled`、`expanded`、`hidden`、`pressed`、`readonly`、`required`、`selected` → `attr="true"`

**media：** `portrait`、`landscape`、`os_dark`、`os_light`、`motion_ok`、`motion_not_ok`、`high_contrast`、`low_contrast`、`opacity_ok`、`opacity_not_ok`、`use_data_ok`、`use_data_not_ok`、`touch`、`stylus`、`pointer`、`mouse`、`hd_color`

**supports：** `grid` → `(display: grid)`

### data-scaling / data-radius

Reset preflight 写入全局缩放与圆角因子：

| 属性                    | 值 → CSS 变量           |
| ----------------------- | ----------------------- |
| `[data-scaling='90%']`  | `--scaling: 0.9`        |
| `[data-scaling='95%']`  | `--scaling: 0.95`       |
| `[data-scaling='100%']` | `--scaling: 1`          |
| `[data-scaling='105%']` | `--scaling: 1.05`       |
| `[data-scaling='110%']` | `--scaling: 1.1`        |
| `[data-radius='none']`  | `--radius-factor: 0`    |
| `[data-radius='xs']`    | `--radius-factor: 0.5`  |
| `[data-radius='sm']`    | `--radius-factor: 0.75` |
| `[data-radius='md']`    | `--radius-factor: 1`    |
| `[data-radius='lg']`    | `--radius-factor: 1.5`  |
| `[data-radius='full']`  | `--radius-factor: 1.5`  |

同时设置 `color-scheme: light` / `dark`（随 `.light` / `.dark`）。

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

## Theme 函数（Variants）

任意值中可用 `theme(...)` 引用主题：

```html
<div class="m-[theme(spacing.md)]">...</div>
```

```text
margin: calc(0.75rem * var(--scaling))
```
