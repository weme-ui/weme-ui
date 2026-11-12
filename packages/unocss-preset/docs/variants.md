# 用 Variants 写暗色、断点与状态

变体写在类名前面，用 `:` 和后面的工具类分开。它们不发明新的颜色或间距，只改变「这条工具类在什么条件下生效」。暗色色板本身由 `.dark` 里的 CSS 变量完成；`dark:` 是在那个条件里换一条工具类。

`variants()` 的注册顺序在 `src/variants/default.ts`。断点名来自 `theme.breakpoint`，不是一套 `sm` / `md` / `lg`。

## 使用场景

- 同一组件在 `.dark` 下改背景阶，而不是指望 `dark:` 去切换已经写好的色板变量。
- 按 `tablet`、`laptop` 改排版，窄屏用 `max-tablet:`。
- 按钮跟 `aria-disabled`、`aria-expanded`、`data-open` 联动。
- 在打印、减动效、粗指针和容器宽度下改样式。

## 暗色和亮色

`dark` 选项为 `'class'`（默认）或对象时：

```html
<html class="dark">
  <div class="bg-slate-2 text-slate-12 dark:bg-slate-3 light:bg-slate-1">
    色板变量已经是暗色；dark: 再把底改成 3 阶。
  </div>
</html>
```

默认选择器是祖先类，不是自身类：

```css
.dark .dark\:bg-slate-3 { background-color: var(--slate-3); }
.light .light\:bg-slate-1 { background-color: var(--slate-1); }
```

元素自己不需要同时写 `dark` 和 `dark:`。`dark` 放在 `html` 或任意祖先上。

不随选项变化的另一组：

```html
<div class=".dark:bg-accent-4 @dark:bg-accent-4 not-dark:bg-accent">
  固定类名、固定媒体查询、以及「不是暗色偏好」
</div>
```

`.dark:` 生成 `.dark` 祖先。`@dark:` 生成 `@media (prefers-color-scheme: dark)`。`@light:` 是亮色偏好。`not-dark:` 是 `@media not (prefers-color-scheme: dark)`。`dark: 'media'` 时，不带点、不带 `@` 的 `dark:` / `light:` 也会变成这两条媒体查询，默认类名 `.light` 和 `.dark` 不再参与。

Sources: `packages/unocss/src/variants/dark.ts`, `packages/unocss/src/index.ts`

## 断点

| 前缀 | 宽度 |
| --- | --- |
| `mobile:` | `min-width: 520px` |
| `tablet:` | `min-width: 768px` |
| `laptop:` | `min-width: 1024px` |
| `desktop:` | `min-width: 1280px` |
| `wide:` | `min-width: 1640px` |

`max-tablet:` 是 `max-width: 767.9px`。竖向断点和横向用同一组数值，类名仍是这些名字；`h-screen-tablet` 读 `verticalBreakpoint`。

```html
<nav class="flex flex-col gap-sm p-sm tablet:flex-row tablet:items-center tablet:px-lg laptop:px-xl max-tablet:hidden">
  <a class="text-highlighted" href="/">首页</a>
  <a class="text-subtle" href="/settings">设置</a>
</nav>
```

宽屏导航在平板以下用 `max-tablet:hidden` 整个藏起时，记得另给一块窄屏导航，否则小屏没有入口。

Sources: `packages/unocss/src/variants/breakpoints.ts`, `packages/unocss/src/theme/size.ts`

## 状态、aria 和 data

悬停、焦点来自伪类变体。生成器能得到：

```css
.hover\:bg-accent-10:hover { background-color: var(--accent-10); }
.focus\:ring-accent:focus { --un-ring-color: var(--accent-9); }
.group:hover .group-hover\:bg-accent { background-color: var(--accent-9); }
.peer:focus ~ .peer-focus\:text-highlighted { color: var(--text-highlighted); }
```

`group` 和 `peer` 是写在祖先或前一个兄弟上的类，再配合 `group-hover:`、`peer-focus:`。

`theme.aria` 提供这些名字：`busy`、`checked`、`disabled`、`expanded`、`hidden`、`pressed`、`readonly`、`required`、`selected`。它们展开成带 `"true"` 的属性。

```html
<button
  class="bg-accent text-inverted aria-disabled:op-50 aria-disabled:cursor-not-allowed aria-pressed:bg-accent-10"
  aria-pressed="true"
>
  已固定
</button>
```

```css
.aria-disabled\:op-50[aria-disabled="true"] { opacity: 50%; }
.aria-expanded\:bg-accent-4[aria-expanded="true"] { background-color: var(--accent-4); }
```

带范围的写法：`group-aria-checked:`、`peer-aria-disabled:`、`parent-aria-expanded:`、`previous-aria-pressed:`、`has-aria-selected:`、`in-aria-busy:`。`group-aria-checked:text-accent-11` 的选择器是 `:where(.group)[aria-checked="true"] *`。

`data-` 没有内置名字表。`theme()` 不写 `data` 字段。方括号形式可用：

```html
<div class="data-[open]:bg-muted not-data-[open]:hidden" data-open>
  打开时用抬升前的底色
</div>
```

```css
.data-\[open\]\:bg-muted[data-open] { background-color: var(--bg-muted); }
.not-data-\[open\]\:hidden:not([data-open]) { display: none; }
```

`data-open:` 这种不带方括号的名字 ⚠️ NOT FOUND IN SOURCE（默认主题没有 `data.open`）。同样的范围前缀有 `group-data-`、`peer-data-`、`parent-data-`、`previous-data-`、`has-data-`、`in-data-`，属性值仍然要写在方括号里，例如 `group-data-[open]:text-highlighted`。

Sources: `packages/unocss/src/variants/pseudo.ts`, `packages/unocss/src/variants/aria.ts`, `packages/unocss/src/variants/data.ts`, `packages/unocss/src/theme/aria.ts`, `packages/unocss/src/theme/default.ts`

## 媒体、容器、方向和 important

`theme.media` 的键用下划线，类名是 `media-` 加这个键：

```html
<div class="media-mouse:cursor-pointer media-touch:py-lg motion-reduce:animate-none">
  精细指针才用手指光标，系统要求减少动效时停掉动画
</div>
```

`motion-reduce:` 是独立变体，不要写成 `media-motion_reduce:`。媒体表里对应的键是 `motion_not_ok`，类名是 `media-motion_not_ok:`。

键包括 `portrait`、`landscape`、`os_dark`、`os_light`、`motion_ok`、`motion_not_ok`、`high_contrast`、`low_contrast`、`opacity_ok`、`opacity_not_ok`、`use_data_ok`、`use_data_not_ok`、`touch`、`stylus`、`pointer`、`mouse`、`hd_color`。

另外一组不查这张表、直接写媒体查询的前缀：`print:`、`contrast-more:`、`contrast-less:`、`motion-reduce:`、`motion-safe:`、`landscape:`、`portrait:`、`forced-colors:`、`noscript:`。脚本状态是 `script-none:`、`script-initial-only:`、`script-enabled:`，也可以写成 `scripting-`。

```html
<img class="motion-reduce:animate-none print:hidden portrait:w-full" alt="" />
```

`supports-grid:` 读 `theme.supports.grid`，即 `(display: grid)`，输出 `@supports (display: grid)`。

容器查询的名字来自 `theme.container`，不是断点。`@md:` 表示容器最小宽度 `28rem`（`container.md`）。`@container` 规则负责把元素标成容器。

```html
<div class="@container">
  <div class="@md:flex @md:gap-lg @prose:text-lg">容器达到 28rem 后横排</div>
</div>
```

`@prose:` 的最小宽度是 `65ch`。可用的容器名：`3xs`、`2xs`、`xs`、`sm`、`md`、`lg`、`xl`、`2xl`、`3xl`、`4xl`、`5xl`、`6xl`、`7xl`、`prose`。

方向：`rtl:` 匹配 `[dir="rtl"]` 祖先，`ltr:` 匹配 `[dir="ltr"]`。

```html
<p class="text-start rtl:text-end" dir="rtl">方向随文档</p>
```

`important:` 或类名末尾的 `!` 给这条工具类的声明加上 `!important`。这和 preset 选项 `important` 不是一回事：选项作用于所有工具类，变体只作用于带前缀的那一条。

```html
<div class="important:bg-accent bg-accent!">两条都会带上 !important</div>
```

子组合器：`children:` 或 `*:` 是直接子元素，`**:` 是全部后代。`all:`、`next:`、`sibling:`（相邻）、`siblings:`（后续兄弟）可以再加方括号限定标签，不写时是 `*`。`svg:` 匹配后代 `svg`。`inert:` 匹配带 `inert` 的状态。`starting:` 把规则放进 `@starting-style`。

```html
<ul class="*:m-1 children:rounded-sm">
  <li>每项都有外边距</li>
</ul>
```

Sources: `packages/unocss/src/variants/media.ts`, `packages/unocss/src/variants/supports.ts`, `packages/unocss/src/variants/container.ts`, `packages/unocss/src/variants/directions.ts`, `packages/unocss/src/variants/important.ts`, `packages/unocss/src/variants/combinators.ts`, `packages/unocss/src/variants/children.ts`, `packages/unocss/src/variants/startingstyle.ts`, `packages/unocss/src/variants/inert.ts`, `packages/unocss/src/theme/media.ts`, `packages/unocss/src/theme/supports.ts`, `packages/unocss/src/theme/size.ts`, `packages/unocss/src/rules/container.ts`

## 叠在一起

变体可以连写。生成器对 `dark:hover:bg-accent-10` 的结果是：`.dark .dark\:hover\:bg-accent-10:hover`。

组合示例，基于源码导出构造：

```html
<html class="dark" dir="ltr">
  <section class="bg-muted p-lg tablet:p-xl" data-open>
    <div class="group flex items-center justify-between gap-md">
      <h2 class="text-highlighted group-hover:text-accent">同步设置</h2>
      <button
        class="ring ring-accent rounded-md bg-accent px-lg py-sm text-inverted transition-colors hover:bg-accent-10 focus:bg-accent-10 aria-disabled:op-50 data-[open]:shadow-md dark:bg-accent-4 dark:text-accent-12 max-tablet:w-full motion-reduce:transition-none rtl:mr-0"
        aria-disabled="false"
      >
        开始
      </button>
    </div>
  </section>
</html>
```

窄屏按钮拉满宽度，暗色下改用 4 阶底和 12 阶字，悬停与焦点升到 10 阶，减动效时去掉过渡。`data-open` 在区域上，按钮若要跟着变，应写成祖先形式；按钮自己的 `data-[open]:` 只看按钮上的属性。

Sources: `packages/unocss/src/variants/dark.ts`, `packages/unocss/src/variants/default.ts`

## 注意事项

- 断点前缀是 `tablet:` 不是 `md:`。`md` 用在间距、圆角、容器查询 `@md:`，三套键不要混。
- `dark:` 默认要求祖先有 `.dark`。只打开系统暗色、页面没有这个类时，`dark:` 不生效；这时改 `dark: 'media'` 或改用 `@dark:`。
- 色板变量始终挂在 `.dark` 选择器上，即使 `dark: 'media'`。系统暗色但没有 `.dark` 类时，变量仍是亮色值。
- `data-open:` 不能用，写成 `data-[open]:`。
- `focus:ring-accent` 只改环的颜色变量。环的宽度仍要有 `ring` 或 `ring-2`。
- 变体组 `hover:(bg-accent text-inverted)` 在当前 transformer 里不会展开。写成两个类。

## 相关页面

- 安装 preset 并写出第一个类名
- 配置 Preset 与定制主题
- 按场景选用 Rules 类名
- 理解 Preflights 与 Postprocess
