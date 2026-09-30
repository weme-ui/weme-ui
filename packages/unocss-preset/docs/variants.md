# Variants

> 返回 [文档索引](./README.md)

Variants 用来描述一个工具类在什么条件下生效。它可以改 selector，也可以把规则放进 `@media`、`@supports`、`@container`、`@layer` 这类父级规则里。

这份文档的结构参考 Tailwind CSS 文档的写法：先给你一个快速索引，再给常见场景的例子。为了避免编造 UnoCSS 最终转义后的 class 名，下面统一用 `.x` 表示“当前工具类最终生成的选择器”。真实 CSS 中，`.x` 会替换成 UnoCSS 生成的 selector；声明部分由具体工具类决定。

```html
<button class="dark:mobile:hover:bg-blue-9">Button</button>
```

大致可以理解为：

```text
@media (min-width: 520px) {
  .dark .x:hover { ... }
}
```

## Quick reference

### ARIA

- `aria-busy:*` -> `.x[aria-busy="true"]`
- `aria-pressed:*` -> `.x[aria-pressed="true"]`
- `aria-[expanded=false]:*` -> `.x[aria-expanded=false]`
- `group-aria-busy:*` -> `&:is(:where(.group)[aria-busy="true"] *)`
- `peer-aria-busy:*` -> `&:is(:where(.peer)[aria-busy="true"] ~ *)`
- `parent-aria-busy:*` -> `:where(*[aria-busy="true"] > &)`
- `previous-aria-hidden:*` -> `:where(*[aria-hidden="true"] + &)`
- `has-aria-checked:*` -> `&:has(*[aria-checked="true"])`
- `in-aria-disabled:*` -> `:where(*[aria-disabled="true"]) &`

内置 ARIA 短名：`busy`、`checked`、`disabled`、`expanded`、`hidden`、`pressed`、`readonly`、`required`、`selected`。

### Data 属性

- `data-[state=open]:*` -> `.x[data-state=open]`
- `data-checked:*` -> `.x[data-state=checked]`（需要主题里定义 `data.checked`）
- `group-data-[state=open]:*` -> `&:is(:where(.group)[data-state=open] *)`
- `peer-data-[invalid=true]:*` -> `&:is(:where(.peer)[data-invalid=true] ~ *)`
- `parent-data-[loading=true]:*` -> `:where(*[data-loading=true] > &)`
- `previous-data-[active]:*` -> `:where(*[data-active] + &)`
- `has-data-[state=open]:*` -> `&:has(*[data-state=open])`
- `in-data-[disabled]:*` -> `:where(*[data-disabled]) &`

### 颜色模式

完整说明见 [Dark Mode](./dark-mode.md)。

- `dark:*` -> `.dark $$ .x`，或 `@media (prefers-color-scheme: dark)`，取决于 `dark` 配置
- `light:*` -> `.light $$ .x`，或 `@media (prefers-color-scheme: light)`，取决于 `dark` 配置
- `.dark:*` -> `.dark $$ .x`
- `.light:*` -> `.light $$ .x`
- `@dark:*` -> `@media (prefers-color-scheme: dark)`
- `@light:*` -> `@media (prefers-color-scheme: light)`
- `not-dark:*` -> `@media not (prefers-color-scheme: dark)`

### 断点

默认断点来自主题：`mobile`、`tablet`、`laptop`、`desktop`、`wide`。

- `mobile:*` -> `@media (min-width: 520px)`
- `tablet:*` -> `@media (min-width: 768px)`
- `laptop:*` -> `@media (min-width: 1024px)`
- `desktop:*` -> `@media (min-width: 1280px)`
- `wide:*` -> `@media (min-width: 1640px)`
- `lt-tablet:*` / `<tablet:*` / `max-tablet:*` -> `@media (max-width: 767.9px)`
- `at-tablet:*` / `~tablet:*` -> `@media (min-width: 768px) and (max-width: 1023.9px)`
- `min-[42rem]:*` -> `@media (min-width: 42rem)`
- `max-[960px]:*` -> `@media (max-width: 960px)`

`mobile:container` 不会被 breakpoint variant 消费，`container` 有自己的处理。

### 容器查询

- `@sm:*` -> `@container (min-width: 24rem)`
- `@lg:*` -> `@container (min-width: 32rem)`
- `@[40rem]:*` -> `@container (min-width: 40rem)`
- `@lg/sidebar:*` -> `@container sidebar (min-width: 32rem)`
- `@[40rem]/sidebar:*` -> `@container sidebar (min-width: 40rem)`

`@container` 本身不会被消费，它留给你声明容器。

### Supports

- `supports-grid:*` -> `@supports (display: grid)`
- `supports-subgrid:*` -> `@supports (grid-template-columns: var(--un))`
- `supports-[display:grid]:*` -> `@supports (display:grid)`
- `supports-[not(display:flex)]:*` -> `@supports not(display:flex)`

短名来自主题的 `supports`。如果短名的值只是属性名，会自动输出成 `(property: var(--un))`。

### Media

- `noscript:*` -> `@media (scripting: none)`
- `script-none:*` / `scripting-none:*` -> `@media (scripting: none)`
- `script-initial-only:*` -> `@media (scripting: initial-only)`
- `script-enabled:*` -> `@media (scripting: enabled)`
- `print:*` -> `@media print`
- `media-motion_not_ok:*` -> `@media (prefers-reduced-motion: reduce)`
- `media-[(width>=60rem)]:*` -> `@media (width>=60rem)`
- `contrast-more:*` -> `@media (prefers-contrast: more)`
- `contrast-less:*` -> `@media (prefers-contrast: less)`
- `motion-reduce:*` -> `@media (prefers-reduced-motion: reduce)`
- `motion-safe:*` -> `@media (prefers-reduced-motion: no-preference)`
- `landscape:*` -> `@media (orientation: landscape)`
- `portrait:*` -> `@media (orientation: portrait)`
- `forced-colors:*` -> `@media (forced-colors: active)`

### 子元素和组合选择器

- `*:*` -> `.x > *`
- `**:*` -> `.x *`
- `all:*` -> `.x *`
- `children:*` -> `.x>*`
- `children-[button]:*` -> `.x>button`
- `next:*` -> `.x+*`
- `sibling:*` -> `.x+*`
- `siblings:*` -> `.x~*`
- `siblings-[button]:*` -> `.x~button`
- `svg:*` -> `.x svg`

### 伪类和伪元素

普通伪类：

- `any-link:*` -> `.x:any-link`
- `link:*` -> `.x:link`
- `visited:*` -> `.x:visited`
- `target:*` -> `.x:target`
- `open:*` -> `.x:is([open],:popover-open,:open)`
- `default:*` -> `.x:default`
- `checked:*` -> `.x:checked`
- `indeterminate:*` -> `.x:indeterminate`
- `placeholder-shown:*` -> `.x:placeholder-shown`
- `autofill:*` -> `.x:autofill`
- `optional:*` -> `.x:optional`
- `required:*` -> `.x:required`
- `valid:*` -> `.x:valid`
- `invalid:*` -> `.x:invalid`
- `user-valid:*` -> `.x:user-valid`
- `user-invalid:*` -> `.x:user-invalid`
- `in-range:*` -> `.x:in-range`
- `out-of-range:*` -> `.x:out-of-range`
- `read-only:*` -> `.x:read-only`
- `read-write:*` -> `.x:read-write`
- `empty:*` -> `.x:empty`
- `focus-within:*` -> `.x:focus-within`
- `hover:*` -> `.x:hover`
- `focus:*` -> `.x:focus`
- `focus-visible:*` -> `.x:focus-visible`
- `active:*` -> `.x:active`
- `enabled:*` -> `.x:enabled`
- `disabled:*` -> `.x:disabled`
- `popover-open:*` -> `.x:popover-open`
- `root:*` -> `.x:root`
- `first:*` -> `.x:first-child`
- `last:*` -> `.x:last-child`
- `first-of-type:*` -> `.x:first-of-type`
- `last-of-type:*` -> `.x:last-of-type`
- `only-child:*` -> `.x:only-child`
- `only-of-type:*` -> `.x:only-of-type`
- `even:*` -> `.x:nth-child(even)`
- `odd:*` -> `.x:nth-child(odd)`
- `even-of-type:*` -> `.x:nth-of-type(even)`
- `odd-of-type:*` -> `.x:nth-of-type(odd)`

带参数的结构伪类：

- `nth-3:*` -> `.x:nth-child(3)`
- `nth-[2n+1]:*` -> `.x:nth-child(2n+1)`
- `nth-last-2:*` -> `.x:nth-last-child(2)`
- `nth-last-[2n]:*` -> `.x:nth-last-child(2n)`
- `nth-of-type-3:*` -> `.x:nth-of-type(3)`
- `nth-of-type-[2n+1]:*` -> `.x:nth-of-type(2n+1)`
- `nth-last-of-type-2:*` -> `.x:nth-last-of-type(2)`

伪元素：

- `first-letter:*` -> `.x::first-letter`
- `first-line:*` -> `.x::first-line`
- `backdrop-element:*` -> `.x::backdrop`
- `backdrop:*` -> `.x::backdrop`
- `placeholder:*` -> `.x::placeholder`
- `before:*` -> `.x::before`
- `after:*` -> `.x::after`
- `file:*` -> `.x::file-selector-button`
- `details-content:*` -> `.x::details-content`
- `selection:*` -> `.x::selection, .x *::selection`
- `marker:*` -> `.x::marker, .x *::marker`

函数式伪类：

- `not-hover:*` -> `.x:not(:hover)`
- `is-open:*` -> `.x:is(:is([open],:popover-open,:open))`
- `where-disabled:*` -> `.x:where(:disabled)`
- `has-checked:*` -> `.x:has(:checked)`
- `not-[.active]:*` -> `.x:not(.active)`
- `is-[button]:*` -> `.x:is(button)`
- `where-[data-x]:*` -> `.x:where(data-x)`
- `has-[img]:*` -> `.x:has(img)`

Tagged pseudo：

- `group-hover:*` -> `.group:hover .x`
- `peer-focus:*` -> `.peer:focus ~ .x`
- `parent-disabled:*` -> `.parent:disabled > .x`
- `previous-checked:*` -> `.previous:checked + .x`
- `group-hover/card:*` -> `.group\/card:hover .x`
- `peer-not-[.active]:*` -> `.peer:not(.active) ~ .x`

如果开启 `attributifyPseudo`，上下文从 `.group` / `.peer` 这类 class 改成 `[group=""]` / `[peer=""]` 这类 attribute。

### Part 选择器

- `part-[tab]:*` -> `.x::part(tab)`
- `part-[panel]:*` -> `.x::part(panel)`

### Placeholder 改写

- `placeholder-blue-9` -> `placeholder-$ placeholder-blue-9`
- `placeholder-opacity-50` -> `placeholder-$ placeholder-opacity-50`

这个 modifier 只改写 placeholder 颜色和透明度工具类，不会处理普通字符串。

### 负值

- `-m-4` -> `margin: -1rem`
- `-left-[10px]` -> `left: -10px`
- `-left-[calc(100%-1rem)]` -> `left: calc(calc(100% - 1rem) * -1)`
- `-hue-rotate-30` -> `hue-rotate(-30deg)` 一类函数体取反

它会跳过颜色、透明度、`filter`、`backdrop-filter`、`transform`、`mask-image` 等不适合简单取反的属性，也会尊重内部的 `CONTROL_NO_NEGATIVE` 标记。

### Important

- `!m-0` -> `margin: 0 !important`
- `m-0!` -> `margin: 0 !important`
- `important:bg-blue-9` -> `background-color: ... !important`

### 选择器、作用域和层

- `selector-[.prose_h1]:*` -> `.prose h1`
- `scope-[.admin]:*` -> `.admin $$ .x`
- `layer-components:*` -> `@layer components`
- `uno-layer-theme:*` -> UnoCSS layer: `theme`

### 任意选择器和 at-rule

- `[@media_(min-width:60rem)]:*` -> `@media (min-width:60rem)`
- `[&>svg]:*` -> `.x>svg`

### Theme 函数

- `m-[theme(spacing.md)]` -> `margin: calc(0.75rem * var(--scaling))`

### Starting Style

- `starting:*` -> `@starting-style`

### Inert

- `inert:*` -> `&:is([inert],[inert] *)`

### 书写方向

- `rtl:*` -> `[dir="rtl"] $$ .x`
- `ltr:*` -> `[dir="ltr"] $$ .x`

### 隐式分组

- `in-[.dialog]:*` -> `:where(*:is(.dialog)) &`
- `in-card:*` -> `:where(*:is(card)) &`

### 安全 hover

- `@hover:*` -> `@media (hover: hover) and (pointer: fine)` + `.x:hover`

## 使用示例

### 用状态驱动组件样式

当状态已经体现在 DOM 上时，优先使用 ARIA 或 data variants。这样样式会跟可访问性状态和组件状态保持在同一个位置。

```html
<button aria-expanded="true" class="aria-expanded:bg-blue-9 aria-expanded:text-white">Menu</button>

<div class="group" data-state="open">
  <div class="group-data-[state=open]:block hidden">Panel</div>
</div>
```

输出结果：

```text
.x[aria-expanded="true"] { ... }
&:is(:where(.group)[data-state=open] *) { ... }
```

### 响应式布局

根据视口宽度变化时用断点 variants；组件需要根据自身容器变化时，用容器查询 variants。

```html
<section class="mobile:grid tablet:grid-cols-2 desktop:grid-cols-4">...</section>

<article class="@sm:p-4 @lg:grid @lg:grid-cols-2">...</article>
```

输出结果：

```text
@media (min-width: 520px) { .x { ... } }
@container (min-width: 24rem) { .x { ... } }
```

### 暗色模式

希望跟随 preset 的 `dark` 配置时，用 `dark:`。想明确指定 class 或 media 行为时，用 `.dark:` 或 `@dark:`。

```html
<div class="bg-white dark:bg-gray-1 @dark:border-gray-7">...</div>
```

输出结果：

```text
dark:*  -> .dark $$ .x, or @media (prefers-color-scheme: dark)
@dark:* -> @media (prefers-color-scheme: dark)
```

### 触屏设备上的安全 hover

只有在设备真的支持 hover 且指针足够精细时才应用 hover 样式，就用 `@hover:`。

```html
<button class="@hover:bg-blue-9 @hover:text-white">Save</button>
```

输出结果：

```text
@media (hover: hover) and (pointer: fine) {
  .x:hover { ... }
}
```

### 作用域和任意选择器

样式只想在某个已知根节点下生效时，用 `scope-*`。需要描述组件内部结构关系时，用任意选择器 variants。

```html
<button class="scope-[.admin]:bg-red-9 [&>svg]:size-4">
  <svg />
  Delete
</button>
```

输出结果：

```text
.admin $$ .x { ... }
.x>svg { ... }
```

### Placeholder 样式

`placeholder-*` 对颜色和透明度工具类有专门的改写逻辑。

```html
<input class="placeholder-blue-9 placeholder-opacity-50" />
```

输出结果：

```text
placeholder-blue-9 -> placeholder-$ placeholder-blue-9
```

### Starting Style

进入动画或 transition 初始状态可以用 `starting:`。

```html
<div class="transition-opacity starting:opacity-0 opacity-100">Fade in</div>
```

输出结果：

```text
@starting-style { .x { ... } }
```

### 什么时候使用 `!`

`!` 适合做最后的覆盖手段，但不应该一开始就依赖它。

```html
<div class="!m-0 text-red-9! important:bg-blue-9">...</div>
```

输出结果：

```text
margin: 0 !important
color: ... !important
```
