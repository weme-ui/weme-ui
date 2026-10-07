# Rules

Rules 是具体工具类到 CSS 声明的映射。下列写法按源码模块分组；颜色相关规则同时消费 [Color](../theme/color.md)、[Tokens](../theme/tokens.md)。

约定：

- **方向缩写**：`t`/`r`/`b`/`l`、`x`/`y`、`s`/`e`、`block`/`inline`、`bs`/`be`/`is`/`ie`
- **数字间距**：`p-4` → `calc(var(--spacing) * 4)`；命名间距：`p-md` → theme.spacing.md
- **负值**：`-m-4` 等由 [Variants](./variants.md) 的负值变体处理
- **全局关键字**：多数静态规则支持 `-inherit` / `-initial` / `-unset` 等

---

## Quick reference

### Spacing — `margins` / `paddings` / `spaces`

| 示例                                | CSS                                 |
| ----------------------------------- | ----------------------------------- |
| `p-4` / `pa-4`                      | `padding: calc(var(--spacing) * 4)` |
| `px-md` / `py-2`                    | 水平 / 垂直 padding                 |
| `pt-1` `pr-2` `pb-3` `pl-4`         | 单边                                |
| `ps-2` `pe-2`                       | padding-inline-start/end            |
| `p-block-2` `p-inline-4`            | 逻辑属性                            |
| `p-bs-2` `p-be-2` `p-is-2` `p-ie-2` | block/inline start/end              |
| `p-xy`                              | 全方向 shorthand                    |
| `m-*` / `ma-*`                      | 同 padding，属性为 margin           |
| `space-x-4` / `space-y-md`          | 子元素间距（`:not(:last-child)`）   |
| `space-x-reverse`                   | 翻转 space 方向                     |
| `p-card` / `m-card`                 | CssVars 尺寸模糊匹配                |

### Color — `opacity` / `bgColors` / `colorScheme`

| 示例                                                       | CSS                               |
| ---------------------------------------------------------- | --------------------------------- |
| `op-50` / `opacity-50`                                     | `opacity`                         |
| `bg-blue-9`                                                | `background-color: var(--blue-9)` |
| `bg-accent` / `bg-background-base` / `bg-elevated`         | 别名 / Token（同源可简写）        |
| `bg-card`                                                  | CssVars → `--card-bg` 等          |
| `bg-blue-9/10`                                             | color-mix 透明度                  |
| `bg-op-50`                                                 | `--un-bg-opacity`                 |
| `bg-[url(...)]`                                            | `background-image`                |
| `bg-[length:…]` / `bg-[position:…]`                        | size / position                   |
| `bg-[linear-gradient(…)]`                                  | 任意渐变 / 图片                   |
| `scheme-light` / `scheme-dark` / `color-scheme-light dark` | `color-scheme`                    |

### Typography — `fonts` / `tabSizes` / `textIndents` / `textStrokes` / `textShadows` / `fontVariantNumeric`

| 示例                                                                 | CSS                                                    |
| -------------------------------------------------------------------- | ------------------------------------------------------ |
| `text-sm` / `text-2xl`                                               | theme.text 的 font-size + line-height + letter-spacing |
| `text-base/tight`                                                    | font-size + 自定义 leading                             |
| `text-blue-9` / `text-foreground` / `c-highlighted` / `color-accent` | `color`（`text-foreground` ≡ `text-foreground-base`）  |
| `text-op-80`                                                         | `--un-text-opacity`                                    |
| `font-sans` / `font-mono`                                            | `font-family`                                          |
| `fw-medium` / `font-bold`                                            | `font-weight`                                          |
| `leading-tight` / `lh-6`                                             | `line-height`                                          |
| `tracking-wide`                                                      | `letter-spacing`                                       |
| `font-stretch-expanded`                                              | `font-stretch`                                         |
| `tab-4` / `tab-size-4`                                               | `tab-size`                                             |
| `indent-4`                                                           | `text-indent`                                          |
| `text-stroke` / `text-stroke-sm`                                     | `-webkit-text-stroke-width`                            |
| `text-stroke-blue-9`                                                 | stroke color                                           |
| `text-shadow-md`                                                     | theme textShadow                                       |
| `ordinal` `lining-nums` `tabular-nums` `slashed-zero` …              | `font-variant-numeric`                                 |

### Align — `textAligns` / `verticalAligns`

| 示例                                                                          | CSS              |
| ----------------------------------------------------------------------------- | ---------------- |
| `text-left` `text-center` `text-right` `text-justify` `text-start` `text-end` | `text-align`     |
| `align-middle` / `v-top` / `vertical-middle`                                  | `vertical-align` |

### Border — `borders`

| 示例                                                       | CSS                                |
| ---------------------------------------------------------- | ---------------------------------- |
| `border` / `b` / `border-2`                                | `border-width`（默认 style solid） |
| `border-t` `border-x` `border-s` …                         | 方向宽度                           |
| `border-blue-9` / `border-border-base` / `border-elevated` | `border-*-color`（同源可简写）     |
| `border-op-50`                                             | opacity 变量                       |
| `rounded` / `rounded-md` / `rd-lg`                         | `border-radius`                    |
| `rounded-t-md` / `rd-tl-lg`                                | 单角 / 方向圆角                    |
| `rounded-full`                                             | `calc(infinity * 1px)`             |
| `border-dashed` `border-solid` `border-none`               | `border-style`                     |

### Size — `sizes` / `aspectRatio`

| 示例                                               | CSS                  |
| -------------------------------------------------- | -------------------- |
| `w-4` / `w-md` / `w-full` / `w-screen`             | `width`              |
| `h-4` / `h-svh` / `min-h-screen`                   | `height` / min / max |
| `size-4` / `size-full`                             | width + height       |
| `w-screen-tablet`                                  | 对应 breakpoint 宽度 |
| `w-card` / `h-card`                                | CssVars 尺寸匹配     |
| `max-w-prose` / `max-w-7xl`                        | theme.container      |
| `aspect-video` / `aspect-square` / `aspect-[16/9]` | `aspect-ratio`       |

### Position — `positions` / `justifies` / `alignments` / `placements` / `insets` / `floats` / `zIndexes` / `boxSizing` / `orders`

| 示例                                            | CSS                            |
| ----------------------------------------------- | ------------------------------ |
| `relative` `absolute` `fixed` `sticky` `static` | `position`                     |
| `pos-fixed`                                     | 同 `fixed`                     |
| `inset-0` `inset-x-4` `top-0` `start-2`         | inset / 边偏移                 |
| `justify-center` `justify-between` …            | `justify-content`              |
| `items-center` `items-stretch` …                | `align-items`                  |
| `content-center` `self-end`                     | `align-content` / `align-self` |
| `place-content-center` `place-items-start`      | place-*                        |
| `flex-justify-center` `grid-items-center`       | 带前缀副本                     |
| `float-left` `float-right` `clear-both`         | float / clear                  |
| `z-10` `z-auto`                                 | `z-index`                      |
| `box-border` `box-content`                      | `box-sizing`                   |
| `order-1` `order-first` `order-last`            | `order`                        |

### Flex — `flex`

| 示例                                          | CSS              |
| --------------------------------------------- | ---------------- |
| `flex` `inline-flex`                          | `display`        |
| `flex-1` `flex-auto` `flex-none`              | `flex` 简写      |
| `flex-row` `flex-col` `flex-row-reverse`      | `flex-direction` |
| `flex-wrap` `flex-nowrap` `flex-wrap-reverse` | `flex-wrap`      |
| `grow` `grow-0`                               | `flex-grow`      |
| `shrink` `shrink-0`                           | `flex-shrink`    |
| `basis-4` `basis-full`                        | `flex-basis`     |

### Grid — `grids`

| 示例                                  | CSS                                 |
| ------------------------------------- | ----------------------------------- |
| `grid` `inline-grid`                  | `display`                           |
| `grid-cols-3` `grid-rows-2`           | `grid-template-*`                   |
| `col-span-2` `row-span-full`          | span                                |
| `col-start-1` `row-end-3`             | line                                |
| `grid-flow-col` `grid-flow-row-dense` | `grid-auto-flow`                    |
| `auto-cols-fr` `auto-rows-min`        | `grid-auto-*`                       |
| `grid-area-header` / `grid-areas-[…]` | `grid-area` / `grid-template-areas` |

### Gap — `gaps` / `gapRules`（experimental）

| 示例                                 | CSS                                                  |
| ------------------------------------ | ---------------------------------------------------- |
| `gap-4` `gap-md`                     | `gap`                                                |
| `gap-x-2` `gap-y-4`                  | `column-gap` / `row-gap`                             |
| `rule-x` `rule-y-2`                  | CSS `column-rule` / `row-rule` 宽度                  |
| `rule-x-blue-9`                      | rule color                                           |
| `rule-style-dashed` `rule-width-2` … | style / width / opacity / break / visibility / inset |

### Layout — `overflows`

| 示例                                          | CSS        |
| --------------------------------------------- | ---------- |
| `overflow-auto` `overflow-hidden` `of-scroll` | `overflow` |
| `overflow-x-auto` `of-y-hidden`               | 轴向       |

### Static — 显示与杂项

| 示例                                                  | CSS                             |
| ----------------------------------------------------- | ------------------------------- |
| `block` `inline` `inline-block` `hidden` `contents` … | `display`                       |
| `visible` `invisible` `backface-hidden`               | visibility / backface           |
| `cursor-pointer` `cursor-not-allowed` …               | `cursor`                        |
| `pointer-events-none`                                 | `pointer-events`                |
| `resize` `resize-none` `resize-x`                     | `resize`                        |
| `select-none` `select-all`                            | `user-select`                   |
| `whitespace-nowrap` `ws-pre`                          | `white-space`                   |
| `break-normal` `break-all` `break-keep`               | word-break / overflow-wrap      |
| `truncate` `text-ellipsis` `text-clip`                | 文本溢出                        |
| `text-wrap` `text-nowrap` `text-balance`              | `text-wrap`                     |
| `uppercase` `lowercase` `capitalize` `normal-case`    | `text-transform`                |
| `italic` `not-italic`                                 | `font-style`                    |
| `antialiased` `subpixel-antialiased`                  | font-smoothing                  |
| `sr-only` `not-sr-only`                               | 屏幕阅读器                      |
| `isolate` `isolation-auto`                            | `isolation`                     |
| `object-cover` `object-center`                        | object-fit / position           |
| `bg-blend-multiply` `mix-blend-overlay`               | blend-mode                      |
| `h-dvh` `min-h-svh` `max-h-lvh`                       | 动态视口高度                    |
| `contain-layout` `content-visibility-auto`            | contain / content-visibility    |
| `content-['']` / `content-none`                       | `content`                       |
| `hyphens-auto`                                        | `hyphens`                       |
| `write-vertical-right` / `write-orient-upright`       | writing-mode / text-orientation |
| `field-sizing-content`                                | `field-sizing`                  |
| `forced-color-adjust-none`                            | `forced-color-adjust`           |

### Behaviors — `outline` / `appearance` / `willChange` / `listStyle` / `accents` / `carets` / …

| 示例                                         | CSS                     |
| -------------------------------------------- | ----------------------- |
| `outline` `outline-2` `outline-none`         | outline-width           |
| `outline-blue-9` / `outline-op-50`           | outline-color / opacity |
| `outline-offset-2`                           | `outline-offset`        |
| `outline-dashed`                             | `outline-style`         |
| `appearance-none`                            | `appearance`            |
| `will-change-scroll` `will-change-transform` | `will-change`           |
| `list-disc` `list-decimal` `list-none`       | `list-style-type`       |
| `list-inside` `list-outside`                 | `list-style-position`   |
| `list-image-[url(…)]`                        | `list-style-image`      |
| `accent-info`                                | `accent-color`          |
| `caret-blue-9`                               | `caret-color`           |
| `image-render-pixel`                         | `image-rendering`       |
| `overscroll-contain` `overscroll-x-none`     | `overscroll-behavior`   |
| `scroll-auto` `scroll-smooth`                | `scroll-behavior`       |

### Decoration — `textDecorations`

| 示例                                                 | CSS                     |
| ---------------------------------------------------- | ----------------------- |
| `underline` `overline` `line-through` `no-underline` | `text-decoration-line`  |
| `decoration-solid` `decoration-wavy`                 | `text-decoration-style` |
| `underline-blue-9` / `decoration-red-5`              | color                   |
| `underline-2` / `decoration-4`                       | thickness               |
| `underline-offset-4`                                 | `text-underline-offset` |
| `decoration-op-50`                                   | opacity 变量            |

### Background — `backgroundStyles`

| 示例                                            | CSS                     |
| ----------------------------------------------- | ----------------------- |
| `bg-gradient-to-br`                             | linear-gradient + 方向  |
| `bg-linear-45`                                  | 任意角度 linear         |
| `from-blue-9` `via-purple-9` `to-transparent`   | 渐变色停                |
| `from-10%` `via-50%` `to-90%`                   | 停点位置                |
| `bg-cover` `bg-contain` `bg-auto`               | `background-size`       |
| `bg-fixed` `bg-local` `bg-scroll`               | `background-attachment` |
| `bg-center` `bg-top` …                          | `background-position`   |
| `bg-no-repeat` `bg-repeat-x`                    | `background-repeat`     |
| `bg-clip-text` `bg-clip-border`                 | `background-clip`       |
| `bg-origin-border`                              | `background-origin`     |
| `box-decoration-clone` / `box-decoration-slice` | `box-decoration-break`  |

### Shadow / Ring — `boxShadows` / `rings`

| 示例                                 | CSS                        |
| ------------------------------------ | -------------------------- |
| `shadow` `shadow-md` `shadow-none`   | `box-shadow`（theme 多层） |
| `shadow-blue-9` / `shadow-op-30`     | 着色 / 透明度              |
| `shadow-md/30`                       | 带透明度的 theme shadow    |
| `inset-shadow-sm`                    | inset box-shadow           |
| `ring` `ring-2` `ring-inset`         | ring 阴影链                |
| `ring-blue-9` `ring-op-50`           | ring 颜色                  |
| `ring-offset-2` `ring-offset-blue-1` | offset 宽 / 色             |

### Filters — `filters`

| 示例                                                                        | CSS               |
| --------------------------------------------------------------------------- | ----------------- |
| `blur` `blur-md`                                                            | `filter: blur(…)` |
| `brightness-110` `contrast-125` `grayscale` `invert` `sepia` `saturate-150` | filter 函数       |
| `hue-rotate-30` `-hue-rotate-30`                                            | 色相旋转          |
| `drop-shadow-lg` `drop-shadow-red-5`                                        | drop-shadow       |
| `filter-none`                                                               | 重置 filter       |
| `backdrop-blur-lg` `backdrop-brightness-50`                                 | `backdrop-filter` |
| `backdrop-op-80`                                                            | backdrop opacity  |

### Transform — `transforms`

| 示例                                             | CSS                  |
| ------------------------------------------------ | -------------------- |
| `translate-x-4` `translate-y-1/2`                | translate            |
| `rotate-45` `rotate-x-12`                        | rotate               |
| `scale-110` `scale-x-50`                         | scale                |
| `skew-x-3` `skew-y-6`                            | skew                 |
| `transform-gpu` `transform-cpu` `transform-none` | transform 合成策略   |
| `origin-center` `origin-top-left`                | `transform-origin`   |
| `perspective-dramatic`                           | `perspective`        |
| `perspective-origin-center`                      | `perspective-origin` |
| `zoom-50`                                        | `zoom`               |

### Transition — `transitions`

| 示例                                                            | CSS                          |
| --------------------------------------------------------------- | ---------------------------- |
| `transition`                                                    | 默认 property + 150ms + ease |
| `transition-colors` `transition-opacity` `transition-transform` | theme.property               |
| `transition-none`                                               | `transition-property: none`  |
| `duration-300` `duration-150`                                   | `transition-duration`        |
| `delay-100`                                                     | `transition-delay`           |
| `ease-out` `ease-linear`                                        | `transition-timing-function` |
| `transition-discrete`                                           | `transition-behavior`        |

### Animation — `animations` / `animateModifiers` / `animateInOutShortcuts`

完整文档见 [Animation](./animate.md)（两套模型边界、Enter / Exit 修饰符、内置 keyframe 名称）。

| 示例                                             | CSS                               |
| ------------------------------------------------ | --------------------------------- |
| `animate-spin` `animate-fade-in`                 | 模型 A：完整 keyframe             |
| `animate-in fade-in zoom-in slide-in-from-top-8` | 模型 B：组合 Enter / Exit         |
| `animate-duration-500` `animate-ease-in`         | 参数类（双写 `--un-animation-*`） |

### Columns — `columns`

| 示例                                                          | CSS       |
| ------------------------------------------------------------- | --------- |
| `columns-3` `columns-md`                                      | `columns` |
| `break-before-auto` `break-inside-avoid` `break-after-column` | break-*   |

### Container — `container` / `containerParent`

| 示例                                | CSS                                            |
| ----------------------------------- | ---------------------------------------------- |
| `@container` / `@container/sidebar` | `container-type` / `container-name`            |
| `container` / `tablet:container`    | shortcut → 内部 `__container` + 断点 max-width |

### Divide — `divides`

| 示例                                   | CSS             |
| -------------------------------------- | --------------- |
| `divide-x` `divide-y` `divide-x-2`     | 子元素间 border |
| `divide-x-reverse`                     | 翻转方向        |
| `divide-blue-9` / `divide-border-base` | 颜色            |
| `divide-dashed` `divide-solid`         | style           |
| `divide-op-50`                         | opacity         |

### Scrolls — `scrolls`

| 示例                                           | CSS                 |
| ---------------------------------------------- | ------------------- |
| `scroll-m-4` `scroll-mt-2`                     | `scroll-margin*`    |
| `scroll-p-4` `scroll-px-2`                     | `scroll-padding*`   |
| `scroll-gutter-stable`                         | `scrollbar-gutter`  |
| `snap-x` `snap-y` `snap-both` `snap-mandatory` | scroll-snap         |
| `snap-start` `snap-center` `snap-align-none`   | `scroll-snap-align` |
| `snap-normal` `snap-always`                    | `scroll-snap-stop`  |

### Table — `tables`

| 示例                                  | CSS               |
| ------------------------------------- | ----------------- |
| `table` `table-row` `table-cell` …    | `display`         |
| `border-collapse` `border-separate`   | `border-collapse` |
| `border-spacing-2`                    | `border-spacing`  |
| `caption-top` `caption-bottom`        | `caption-side`    |
| `table-auto` `table-fixed`            | `table-layout`    |
| `empty-cells-show` `empty-cells-hide` | `empty-cells`     |

### Line clamp — `lineClamps`

| 示例              | CSS                                    |
| ----------------- | -------------------------------------- |
| `line-clamp-3`    | `-webkit-line-clamp: 3` + 相关 display |
| `line-clamp-none` | 恢复                                   |

### Touch — `touchActions`

| 示例                                         | CSS            |
| -------------------------------------------- | -------------- |
| `touch-auto` `touch-none`                    | `touch-action` |
| `touch-pan-x` `touch-pan-y` `touch-pan-up` … | 平移           |
| `touch-pinch-zoom` `touch-manipulation`      | 缩放 / 手势    |

### Mask — `masks`

| 示例                                                   | CSS                |
| ------------------------------------------------------ | ------------------ |
| `mask-none`                                            | `mask-image: none` |
| `mask-linear-to-t` / `mask-radial` / `mask-conic`      | 渐变 mask          |
| `mask-from-black` `mask-to-transparent`                | mask 色停          |
| `mask-clip-border` `mask-origin-content`               | clip / origin      |
| `mask-repeat` `mask-size-cover` `mask-position-center` | 几何               |
| `mask-alpha` `mask-luminance`                          | `mask-mode`        |
| `mask-add` `mask-subtract` …                           | `mask-composite`   |
| `mask-type-alpha`                                      | SVG `mask-type`    |

### SVG — `svgUtilities`

| 示例                                      | CSS                  |
| ----------------------------------------- | -------------------- |
| `fill-blue-9` / `fill-none` / `fill-card` | `fill`（含 CssVars） |
| `stroke-red-9` / `stroke-none`            | `stroke`             |
| `stroke-2` / `stroke-width-2`             | `stroke-width`       |
| `stroke-dash-4`                           | `stroke-dasharray`   |
| `stroke-offset-2`                         | `stroke-dashoffset`  |
| `stroke-cap-round` `stroke-join-miter`    | linecap / linejoin   |

### Placeholder — `placeholders`

由 `placeholder:` variant 改写后消费内部规则：

| 示例                     | 行为                 |
| ------------------------ | -------------------- |
| `placeholder-blue-9`     | `::placeholder` 颜色 |
| `placeholder-opacity-50` | placeholder 透明度   |

### Variables — `cssVariables` / `cssProperty`

| 示例                            | CSS                        |
| ------------------------------- | -------------------------- |
| `fw-$weight` 等缩写             | 映射属性 + `var(--weight)` |
| `[margin:1rem]` / `[color:red]` | 任意单属性（非 URL）       |

### View Transition — `viewTransition`

| 示例                   | CSS                          |
| ---------------------- | ---------------------------- |
| `view-transition-hero` | `view-transition-name: hero` |
| `view-transition-none` | `none`                       |

### Debug — `questionMark`

| 示例          | 行为                     |
| ------------- | ------------------------ |
| `?` / `where` | **仅 dev**：调试描边动画 |

---

## 颜色类规则对照

下列规则支持 Theme 色 / Alias / Token / CssVars（具体能力因规则而异）：

| 规则前缀                     | 主属性             | CssVars 模糊键     |
| ---------------------------- | ------------------ | ------------------ |
| `text-*` / `c-*` / `color-*` | `color`            | `color`            |
| `bg-*`                       | `background-color` | `background-color` |
| `border-*`                   | `border-*-color`   | `border-color`     |
| `fill-*`                     | `fill`             | `fill`             |
| `stroke-*`                   | `stroke`           | —                  |
| `outline-*`                  | `outline-color`    | —                  |
| `accent-*`                   | `accent-color`     | —                  |
| `caret-*`                    | `caret-color`      | —                  |
| `from-*` / `via-*` / `to-*`  | 渐变色停           | —                  |
| `shadow-*` / `ring-*`        | 阴影着色           | —                  |
| `divide-*`                   | 分割线颜色         | —                  |
| `placeholder-*`              | placeholder 颜色   | —                  |

尺寸类可走 CssVars：`p-*`、`m-*`、`w-*`、`h-*`、`size-*`、`border-*-{width}`。

---

## Shortcuts

| Shortcut         | 展开                                               |
| ---------------- | -------------------------------------------------- |
| `container`      | `__container` + 各 breakpoint 前缀的 `__container` |
| `{bp}:container` | 从该断点起累积 container 宽度                      |

Autocomplete shorthands：`position`（relative/absolute/…）、`globalKeyword`（inherit/initial/…）。

---

## 使用示例

### 语义化布局块

```html
<article
  data-theme="default"
  class="bg-background-base text-foreground-base border border-border-base rounded-md p-4 shadow-sm"
>
  <h2 class="text-lg fw-semibold text-foreground-highlighted">Title</h2>
  <p class="text-sm text-foreground-subtle mt-2">Supporting text</p>
  <button class="mt-4 bg-accent text-white px-3 py-1.5 rounded-sm hover:bg-accent-10">Action</button>
</article>
```

### CssVars 驱动组件

```ts
presetWemeUI({
  cssVars: {
    card: { bg: 'neutral.2', text: 'neutral.12', padding: '1rem', border: 'neutral.6' },
  },
})
```

```html
<div class="bg-card text-card border-card p-card rounded-md">…</div>
```

### 响应式 + 暗色

```html
<div class="p-2 tablet:p-4 desktop:p-6 bg-background-base dark:bg-background-elevated">…</div>
```

更多条件选择器见 [Variants](./variants.md)。
